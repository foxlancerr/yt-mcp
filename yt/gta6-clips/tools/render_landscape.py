"""Landscape (1920x1080) reaction long-form renderer. usage: python render_landscape.py <key> [--cta]
Config lives in niko_clips.py (CLIPS[key]). Steps: 1) ordered cut of the pieces (speed ramps, freeze frames) -> clips/<key>/raw/ordered.mp4
2) one filter graph: game crop + zoom/shake/whip/flash/blur + face-cam picture-in-picture (or full takeover) + captions, pops, hook, mutes
3) Runner reactions (reaction_kit) 4) call-to-action cards (cta_kit frames) with sound effects.
Stream layout (IShowSpeed, 1920x1080): game 16:9 cutscene letterboxed y 60-1020, face cam (2,462)-(388,702) over the left, chat top right, brand logo top centre,
counters bottom right, the game's own subtitles at y ~950-1000. The crop below keeps none of those."""
import json, subprocess, sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(HERE))
FB, FI = "C\\:/Windows/Fonts/arialbd.ttf", "C\\:/Windows/Fonts/impact.ttf"
W, H = 1920, 1080


CTA_ONLY = "--cta-only" in sys.argv      # redo only the call-to-action step on top of edit/with_reactions.mp4


def run(cmd, what, cwd=None):
    if CTA_ONLY and what in ("main render", "sfx"):
        return None
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", cwd=cwd)
    if r.returncode:
        raise RuntimeError(f"{what} failed:\n{r.stderr[-2500:]}")
    return r


def wrap(s, n=46):
    out, line = [], ""
    for w in s.split():
        if len(line) + len(w) + 1 > n and line:
            out.append(line); line = w
        else:
            line = (line + " " + w).strip()
    out.append(line)
    return "\n".join(out)


def build_ordered(c, d):
    """cut the pieces from the source windows in output order, with speed ramps and freeze frames"""
    srcs = c["srcs"]; keys = list(srcs); ins = []
    for k in keys:
        ins += ["-i", str(srcs[k])]
    fc, labels = [], []
    for i, (sk, s, e, *o) in enumerate(c["pieces"]):
        op = o[0] if o else {}; sp = op.get("speed") or 1; fr = op.get("freeze") or 0; n = keys.index(sk)
        v = f"[{n}:v]trim=start={s}:end={e},setpts=PTS-STARTPTS,fps=30,scale={W}:{H}"
        a = f"[{n}:a]atrim=start={s}:end={e},asetpts=PTS-STARTPTS,aformat=sample_rates=48000:channel_layouts=stereo"
        if sp != 1:
            v += f",setpts=PTS/{sp}"; a += f",atempo={sp}"
        if fr:
            v += f",tpad=stop_mode=clone:stop_duration={fr}"; a += f",apad=pad_dur={fr}"
        fc.append(f"{v}[v{i}]"); fc.append(f"{a}[a{i}]"); labels.append(f"[v{i}][a{i}]")
    fc.append("".join(labels) + f"concat=n={len(labels)}:v=1:a=1[v][a]")
    out = d / "raw" / "ordered.mp4"; out.parent.mkdir(parents=True, exist_ok=True)
    if out.exists() and out.stat().st_size > 5_000_000 and "--rebuild" not in sys.argv:
        return out      # reuse the ordered cut (delete it or pass --rebuild after changing pieces)
    run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fc), "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-preset", "veryfast", "-crf", "16", "-c:a", "aac", "-b:a", "192k", str(out)], "ordered cut")
    return out


def zoom_terms(moves, base_w=W, base_h=H):
    """moves in OUTPUT time: (a, b, kind, amt). kinds: push, pull, punch, impact (a only), track (zoom,fx0,fy0,fx1,fy1), shift (px per second drift)."""
    z, px, py = "0", "0", "0"
    for mv in moves:
        a, b, kind, amt = mv
        w = f"between(t,{a:.3f},{b:.3f})"; p = f"min(1,max(0,(t-{a:.3f})/{max(b - a, 0.01):.3f}))"
        if kind == "push":
            z += f"+{w}*{amt}*{p}"
        elif kind == "pull":
            z += f"+{w}*{amt}*(1-{p})"
        elif kind == "punch":
            z += f"+{w}*{amt}*min(1,(t-{a:.3f})/0.12)*min(1,({b:.3f}-t)/0.22)"
        elif kind == "track":
            zm, fx0, fy0, fx1, fy1 = amt; e = f"min(1,(t-{a:.3f})/0.25)*min(1,({b:.3f}-t)/0.3)"
            z += f"+{w}*{zm}*{e}"; px += f"+{w}*{e}*({fx0}+({fx1}-{fx0})*{p})*{base_w / 2 * zm:.1f}"; py += f"+{w}*{e}*({fy0}+({fy1}-{fy0})*{p})*{base_h / 2 * zm:.1f}"
        elif kind == "impact":
            ex = f"max(0,t-{a:.3f})"; z += f"+{w.replace(f'{b:.3f}', f'{a + 0.6:.3f}')}*0.05*exp(-{ex}*7)"
            px += f"+between(t,{a:.3f},{a + 0.6:.3f})*{amt}*exp(-{ex}*9)*sin(t*70)"; py += f"+between(t,{a:.3f},{a + 0.6:.3f})*{amt}*0.8*exp(-{ex}*9)*sin(t*53+1)"
        elif kind == "whip":      # sideways slide that settles, hidden under a motion blur
            ex = f"max(0,t-{a:.3f})"; z += f"+between(t,{a:.3f},{a + 0.35:.3f})*0.06"
            px += f"+between(t,{a:.3f},{a + 0.35:.3f})*{amt}*exp(-{ex}*14)"
    return z, px, py


def render(key, cta=True):
    from niko_clips import CLIPS
    import reaction_kit, cta_kit
    c = CLIPS[key]; d = ROOT / "clips" / key; E = d / "edit"; E.mkdir(parents=True, exist_ok=True)
    ordered = build_ordered(c, d)
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(ordered)], capture_output=True, text=True).stdout.strip() or 0) if False else c["_total"]
    gx, gy, gw, gh = c["game"]; cx, cy, cw, ch = c["cam"]
    z, px, py = zoom_terms(c["moves"])
    g = [f"[0:v]split=2[g0][c0]",
         f"[g0]crop={gw}:{gh}:{gx}:{gy},scale={W}:{H}:flags=lanczos,"
         f"scale=w='{W}*(1+{z})':h='{H}*(1+{z})':eval=frame:flags=bilinear,"
         f"crop={W}:{H}:x='(iw-{W})/2+({px})':y='(ih-{H})/2+({py})'"]
    for a, b in c.get("blur", []):
        g[-1] += f",boxblur=luma_radius=36:luma_power=3:chroma_radius=18:chroma_power=2:enable='between(t,{a},{b})'"
    for t in c.get("whips", []):
        g[-1] += f",avgblur=sizeX=71:sizeY=1:enable='between(t,{t:.3f},{t + 0.17:.3f})'"
    for t in c.get("flash", []):
        g[-1] += f",drawbox=x=0:y=0:w=iw:h=ih:color=white@0.55:t=fill:enable='between(t,{t:.3f},{t + 0.07:.3f})'"
    for a, b in c.get("camfull", []):          # the game is dimmed behind the big face cam
        g[-1] += f",drawbox=x=0:y=0:w=iw:h=ih:color=black@0.62:t=fill:enable='between(t,{a},{b})'"
    g[-1] += "[gv]"
    pw, ph = c.get("pip", (480, 296)); bw, bh = c.get("big", (1040, 641))
    g.append(f"[c0]crop={cw}:{ch}:{cx}:{cy},split=2[cs][cb]")
    g.append(f"[cs]scale={pw}:{ph}:flags=lanczos,pad={pw + 10}:{ph + 10}:5:5:color=0xF5F5DC[pip]")
    g.append(f"[cb]scale={bw}:{bh}:flags=lanczos,unsharp=5:5:0.8,pad={bw + 12}:{bh + 12}:6:6:color=0xF5F5DC[big]")
    nofull = "+".join(f"between(t,{a},{b})" for a, b in c.get("camfull", [])) or "0"
    g.append(f"[gv][pip]overlay=x=30:y=30:enable='not({nofull})'[v1]")
    last = "[v1]"
    if c.get("camfull"):
        g.append(f"{last}[big]overlay=x=({W}-{bw + 12})/2:y=({H}-{bh + 12})/2-20:enable='{nofull}'[v2]"); last = "[v2]"
    chain = []
    def dt(f, font, col, size, x, y, en, extra=""):
        return f"drawtext=fontfile='{font}':textfile={f}:fontcolor={col}:fontsize={size}:x={x}:y={y}:enable='between(t,{en[0]},{en[1]})'{extra}"
    hy = c.get("hook_y", (520, 640)); hs = c.get("hook_size", 104)
    for i, (txt, col, yy) in enumerate(((c["hook"][0], "0xF5F5DC", hy[0]), (c["hook"][1], "0xFF0000", hy[1]))):
        f = E / f"hook{i}.txt"; f.write_text(txt, encoding="utf-8")
        chain.append(dt(f.name, FI, col, hs, "(w-text_w)/2", yy, c["hook_window"], ":borderw=8:bordercolor=black"))
    for i, (a, b, t) in enumerate(c["caps"]):
        f = E / f"cap{i}.txt"; f.write_text(wrap(t), encoding="utf-8")
        chain.append(dt(f.name, FB, "0xF5F5DC", 50, "(w-text_w)/2", "960-text_h", (a, b), ":borderw=6:bordercolor=black:line_spacing=8"))
    for i, (a, b, t) in enumerate(c["pops"]):
        f = E / f"pop{i}.txt"; f.write_text(t, encoding="utf-8")
        chain.append(dt(f.name, FI, "0xFF0000", f"'104+36*max(0,1-(t-{a})*5)'", "w-text_w-60", 70, (a, b), ":borderw=8:bordercolor=black"))
    for i, (a, b, t) in enumerate(c.get("chapters", [])):      # small label that names each part of the story
        f = E / f"chap{i}.txt"; f.write_text(t, encoding="utf-8")
        chain.append(dt(f.name, FB, "0xF5F5DC", 34, "w-text_w-50", "h-90", (a, b), ":borderw=4:bordercolor=black"))
    tag = E / "tag.txt"; tag.write_text("THE UNTOLD EXIT", encoding="utf-8")
    chain.append(f"drawtext=fontfile='{FB}':textfile={tag.name}:fontcolor=0xF5F5DC@0.8:fontsize=26:x=36:y=h-52:borderw=3:bordercolor=black")
    g.append(f"{last}" + ",".join(chain) + "[vt]")
    mut = c.get("mute", [])
    af = "[0:a]" + (",".join(f"volume=0:enable='between(t,{a},{b})'" for a, b in mut) + "," if mut else "") + "alimiter=limit=0.95[am]"
    g.append(af)
    base = E / "base.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(ordered), "-filter_complex", ";".join(g), "-map", "[vt]", "-map", "[am]", "-c:v", "libx264", "-preset", "medium", "-crf", "19",
         "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", str(base)], "main render", cwd=str(E))
    print("base ok", flush=True)
    # sound hits
    cur = base
    if c.get("sfx"):
        sd = HERE.parents[2] / ".agents" / "skills" / "gta6-clipper" / "sounds"; ins = ["-i", str(cur)]; fc = []; k = 0
        for t, n, v in c["sfx"]:
            p = sd / f"{n}.wav"
            if not p.exists():
                continue
            ins += ["-i", str(p)]; k += 1; ms = int(t * 1000); fc.append(f"[{k}:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay={ms}|{ms},volume={v}[s{k}]")
        if k:
            fc.append("[0:a]aformat=sample_rates=48000:channel_layouts=stereo[a0];[a0]" + "".join(f"[s{j}]" for j in range(1, k + 1)) + f"amix=inputs={k + 1}:normalize=0:duration=first[ao]")
            out = E / "with_sfx.mp4"
            run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fc), "-map", "0:v", "-map", "[ao]", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", str(out)], "sfx"); cur = out
    # Runner reactions (bottom right), stop before the end CTA
    out = E / "with_reactions.mp4"
    stop = dur - (c["ctas"][-1][0] if False else 0)
    if not CTA_ONLY:
        reaction_kit.overlay(str(cur), c["events"], str(out), corner="br", height_frac=0.2)
    if out.exists() and out.stat().st_size > 10000:
        cur = out
    print("reactions ok", flush=True)
    # call-to-action cards (cta_kit frames are 1080 wide x 430 tall; centred at the bottom)
    final = d / "final_landscape.mp4"
    if cta and c.get("ctas"):
        ins = ["-i", str(cur)]; fc = []; last = "[0:v]"; sfxins = []; sf = []
        sd = HERE.parents[2] / ".agents" / "skills" / "gta6-clipper" / "sounds"; sfxlist = []
        for j, cs in enumerate(c["ctas"]):
            st = cs["t"]; sel = dict(text=cs["text"], preset=cs.get("preset", "subscribe")); sel["sfx"] = cta_kit.PRESETS[sel["preset"]]["sfx"]
            wd = E / f"cta{j}"; cta_kit.build_frames(sel, wd, cs.get("dur", cta_kit.DUR), 430, cs.get("loop"))
            ins += ["-framerate", str(cta_kit.FPS), "-i", str(wd / "c%03d.png")]; ni = j + 1
            fc.append(f"[{ni}:v]format=rgba,setpts=PTS-STARTPTS+{st}/TB[c{j}]"); fc.append(f"{last}[c{j}]overlay=x=({W}-1080)/2+{cs.get('dx', 380)}:y={H - 430 - 10}:eof_action=pass:enable='gte(t,{st})'[o{j}]"); last = f"[o{j}]"
            for t, nm, v in sel["sfx"]:
                if (sd / f"{nm}.wav").exists():
                    sfxlist.append((sd / f"{nm}.wav", int((st + t) * 1000), v))
        n = len(c["ctas"]) + 1
        for pth, ms, v in sfxlist:
            sfxins += ["-i", str(pth)]; sf.append((n, ms, v)); n += 1
        # audio: sound effects mixed over the programme
        ins += sfxins
        fa = "[0:a]aformat=sample_rates=48000:channel_layouts=stereo[a0]"
        if sf:
            parts = []
            for idx, (ni, ms, v) in enumerate(sf):
                fa += f";[{ni}:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay={ms}|{ms},volume={v}[x{idx}]"; parts.append(f"[x{idx}]")
            fa += f";[a0]{''.join(parts)}amix=inputs={len(sf) + 1}:normalize=0:duration=first[ao]"
        else:
            fa += ";[a0]anull[ao]"
        run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fc) + ";" + fa, "-map", last, "-map", "[ao]", "-c:v", "libx264", "-preset", "medium", "-crf", "19",
             "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-t", str(dur), str(final)], "cta")
    else:
        final.write_bytes(Path(cur).read_bytes())
    print(key, "ok", json.dumps(dict(duration=dur, file=str(final))), flush=True)


if __name__ == "__main__":
    render(sys.argv[1], cta="--no-cta" not in sys.argv)

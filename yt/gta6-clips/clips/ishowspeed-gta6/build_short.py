"""IShowSpeed GTA 6 promo -> 27s Short: original scene intact + The Runner overlay + own commentary.
Source cuts: A = src 0.0-3.4 (his first line, original audio) + B = src 9.5-31.0 (muted, our narration).
Skips src 3.4-9.5 (PS5 menu + Rockstar key art) and 31+ (name banner, end card)."""
import asyncio, json, subprocess
from pathlib import Path
import edge_tts

D = Path(__file__).parent; E = D / "edit"; E.mkdir(exist_ok=True)
SRC = D / "raw" / "source.mp4"
OVERLAY = Path(__file__).resolve().parents[4] / "public" / "images" / "character-walk-overlay.mp4"
FONT = "C\:/Windows/Fonts/arialbd.ttf"
CREAM, RED = "0xF5F5DC", "0xFF0000"
A_END, B_START, B_END = 3.4, 9.5, 31.0
TOTAL = A_END + (B_END - B_START)          # 24.9
VOICE = "en-US-GuyNeural"
NARR = [  # (out start s, text)
 (4.0,  "A real couch, a real controller, a real street."),
 (9.0,  "Now the street has a GTA minimap in the corner."),
 (14.2, "Back on the couch. He is the player."),
 (18.0, "Wanted stars, top right."),
 (20.8, "Live action, dressed as GTA 6."),
]
# on-screen text: (start, end, text, kind) kind: cap = caption under video, bub = Runner speech bubble
TXT = [
 (0.2, 3.3, "Oh man, it's finally our GTA 6", "cap"),
 (4.0, 8.4, "A real couch, controller, street", "cap"),
 (9.0, 12.4, "A GTA minimap in the corner", "cap"),
 (14.2, 17.6, "Back on the couch: he's the player", "cap"),
 (18.0, 20.6, "Wanted stars, top right", "cap"),
 (20.8, 24.9, "Live action, dressed as GTA 6", "cap"),
 (0.3, 3.0, "FINALLY!", "bub"), (5.8, 8.5, "WAIT...", "bub"), (9.0, 12.0, "A MINIMAP?!", "bub"),
 (14.2, 17.6, "HE'S PLAYING!", "bub"), (18.0, 20.6, "WANTED?!", "bub"), (21.0, 24.9, "REAL LIFE!", "bub"),
]

def dur(p):
    r = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","json",str(p)],capture_output=True,text=True)
    return float(json.loads(r.stdout)["format"]["duration"])

def dt(f, color, size, x, y, en, extra=""):
    return (f"drawtext=fontfile='{FONT}':textfile={f}:fontcolor={color}:fontsize={size}:x={x}:y={y}:"
            f"enable='between(t,{en[0]},{en[1]})'{extra}")

async def main():
    auds = []
    for i,(t0,txt) in enumerate(NARR):
        p = E / f"n{i}.mp3"
        await edge_tts.Communicate(txt, VOICE, rate="+10%").save(str(p)); auds.append((t0, p, dur(p)))
    for i,(t0,p,d) in enumerate(auds):
        nxt = auds[i+1][0] if i+1 < len(auds) else TOTAL
        print(f"narr{i}: {t0:.1f}-{t0+d:.1f}s {'OVERLAP' if t0+d > nxt else 'ok'}")
    chain = []
    hook = E / "hook1.txt"; hook.write_bytes("IT'S FINALLY\nHERE...".encode()); chain.append(dt(hook.name, CREAM, 76, "(w-text_w)/2", 70, (0,3.0), ":line_spacing=8"))
    h2 = E / "hook2.txt"; h2.write_bytes("REAL LIFE...\nOR GTA 6?".encode()); chain.append(dt(h2.name, RED, 76, "(w-text_w)/2", 70, (3.0,TOTAL), ":line_spacing=8"))
    tg = E / "tag.txt"; tg.write_bytes("THE UNTOLD EXIT  |  Look Beyond What Seems Obvious.".encode()); chain.append(dt(tg.name, "0xAAAA96", 28, "(w-text_w)/2", 1870, (0,TOTAL)))
    for i,(a,b,t,k) in enumerate(TXT):
        f = E / f"t{i}.txt"; f.write_bytes(t.encode())
        if k == "cap": chain.append(dt(f.name, CREAM, 54, "(w-text_w)/2", 885, (a,b), ":borderw=4:bordercolor=black"))
        else: chain.append(dt(f.name, "black", 56, "(w-text_w)/2+120", 975, (a,b), f":box=1:boxcolor={CREAM}:boxborderw=18"))
    fc = (f"[0:v]split=2[a0][b0];[a0]trim=0:{A_END},setpts=PTS-STARTPTS[a];[b0]trim={B_START}:{B_END},setpts=PTS-STARTPTS[b];"
          f"[a][b]concat=n=2:v=1:a=0,scale=1080:608,fps=30,setsar=1[vid];"
          f"color=c=black:s=1080x1920:r=30[bg];[bg][vid]overlay=0:240:shortest=1[base];"
          f"[1:v]scale=560:996,colorkey=0x000000:0.14:0.0,fps=30[ov];[base][ov]overlay=(W-w)/2:H-h-60:shortest=1,format=yuv420p," + ",".join(chain) + "[v];"
          f"[0:a]atrim=0:{A_END},asetpts=PTS-STARTPTS,afade=t=out:st={A_END-0.35}:d=0.35,aresample=44100,apad[oa];")
    ins = ["-i", str(SRC), "-stream_loop", "-1", "-i", str(OVERLAY)]
    labels = ["[oa]"]
    for i,(t0,p,d) in enumerate(auds):
        ins += ["-i", str(p)]; ms = int(t0*1000)
        fc += f"[{i+2}:a]aresample=44100,adelay={ms}|{ms},volume=1.6[n{i}];"; labels.append(f"[n{i}]")
    fc += "".join(labels) + f"amix=inputs={len(labels)}:normalize=0:duration=longest,atrim=0:{TOTAL}[a]"
    out = D / "final_runner.mp4"
    subprocess.run(["ffmpeg","-y",*ins,"-filter_complex",fc,"-map","[v]","-map","[a]","-t",f"{TOTAL:.2f}",
                    "-c:v","libx264","-pix_fmt","yuv420p","-r","30","-c:a","aac","-b:a","160k",str(out)],check=True,cwd=str(E),capture_output=True)
    print("ok", round(dur(out),1), "s")
asyncio.run(main())

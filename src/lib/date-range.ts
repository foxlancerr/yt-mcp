export interface DateRange {
  startDate: string;
  endDate: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function todayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function format(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function shiftDays(d: Date, days: number): Date {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

const PRESETS: Record<string, () => DateRange> = {
  last_7_days: () => {
    const end = todayUtc();
    return { startDate: format(shiftDays(end, -6)), endDate: format(end) };
  },
  last_14_days: () => {
    const end = todayUtc();
    return { startDate: format(shiftDays(end, -13)), endDate: format(end) };
  },
  last_28_days: () => {
    const end = todayUtc();
    return { startDate: format(shiftDays(end, -27)), endDate: format(end) };
  },
  last_30_days: () => {
    const end = todayUtc();
    return { startDate: format(shiftDays(end, -29)), endDate: format(end) };
  },
  last_90_days: () => {
    const end = todayUtc();
    return { startDate: format(shiftDays(end, -89)), endDate: format(end) };
  },
  last_365_days: () => {
    const end = todayUtc();
    return { startDate: format(shiftDays(end, -364)), endDate: format(end) };
  },
};

export function parseDateRange(input: string): DateRange {
  const preset = PRESETS[input];
  if (preset) return preset();
  const parts = input.split("..");
  if (parts.length === 2 && parts[0] && parts[1]) {
    const [start, end] = parts;
    if (ISO_DATE.test(start) && ISO_DATE.test(end)) {
      return { startDate: start, endDate: end };
    }
  }
  throw new Error(
    `Invalid date range "${input}". Use a preset (last_7_days, last_30_days, last_90_days, ...) or "YYYY-MM-DD..YYYY-MM-DD".`,
  );
}

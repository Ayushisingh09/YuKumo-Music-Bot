export function formatDuration(ms: number): string {
  if (!ms || ms === 0) return "Live Stream";
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${minutes}:${pad(seconds)}`;
}

export function createProgressBar(current: number, total: number, size = 15): string {
  if (!total || total === 0) return "[LIVE STREAM]";
  const progress = Math.min(Math.max(current / total, 0), 1);
  const filledLength = Math.round(size * progress);
  const emptyLength = size - filledLength;
  const filled = "=".repeat(Math.max(0, filledLength - 1));
  const head = filledLength > 0 ? ">" : "";
  const empty = "-".repeat(emptyLength);
  return `[${filled}${head}${empty}]`;
}

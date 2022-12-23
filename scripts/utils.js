export function formatDuration(sec) {
  const minutes = String(Math.floor(sec / 60)).padStart(2, '0');
  const seconds = String(Math.floor(sec - minutes * 60)).padStart(2, '0');

  return `${minutes}:${seconds}`
}
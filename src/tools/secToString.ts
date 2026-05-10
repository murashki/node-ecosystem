export function secToString(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let result = ``;
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (result || minutes > 0) {
    result += `${minutes}m `;
  }
  result += `${secs}s`;

  return result.trim();
}

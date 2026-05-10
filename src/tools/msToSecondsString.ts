export function msToSecondsString(ms: number) {
  const decimals = ms % 1000 === 0 ? 0 : 2;
  return (ms / 1000).toFixed(decimals) + `s`;
}

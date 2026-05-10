export function bytesToString(bytes: number) {
  if (bytes === 0) {
    return `0b`;
  }

  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const sizes = [`B`, `KB`, `MB`, `GB`, `TB`, `PB`, `EB`, `ZB`, `YB`];
  const value = (bytes / Math.pow(k, i)).toFixed(2);

  return `${value} ${sizes[i]}`;
}

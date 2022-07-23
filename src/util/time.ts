export function parseTimeToString(seconds: number, format: string) {
  const isMinus = seconds < 0;
  seconds = Math.abs(isMinus ? seconds - 1 : seconds);

  const devidedTime = {
    hours: Math.floor(seconds / (24 * 60)),
    minutes: Math.floor((seconds / 60) % 24),
    seconds: Math.floor(seconds % 60),
  };

  const stringTime = format
    .replace("HH", devidedTime.hours.toString())
    .replace("hh", devidedTime.hours.toString())
    .replace("mm", devidedTime.minutes.toString())
    .replace("SS", devidedTime.seconds.toString())
    .replace("ss", devidedTime.seconds.toString());

  return `${isMinus ? "-" : ""}${stringTime}`;
}

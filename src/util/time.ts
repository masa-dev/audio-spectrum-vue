export function parseTimeToString(seconds: number, format: string) {
  const isMinus = seconds < 0;
  seconds = Math.abs(isMinus ? seconds - 1 : seconds);

  const devidedTime = {
    hours: Math.floor(seconds / (24 * 60)),
    minutes: Math.floor((seconds / 60) % 24),
    seconds: Math.floor(seconds % 60),
  };

  const stringTime = format
    .replace("HH", toTwoDigit(devidedTime.hours))
    .replace("hh", toTwoDigit(devidedTime.hours))
    .replace("mm", toTwoDigit(devidedTime.minutes))
    .replace("SS", toTwoDigit(devidedTime.seconds))
    .replace("ss", toTwoDigit(devidedTime.seconds))
    .replace("H", devidedTime.hours.toString())
    .replace("h", devidedTime.hours.toString())
    .replace("m", devidedTime.minutes.toString())
    .replace("S", devidedTime.seconds.toString())
    .replace("s", devidedTime.seconds.toString());

  return `${isMinus ? "-" : ""}${stringTime}`;
}

function toTwoDigit(num: number) {
  const numStr = "00" + num.toString();
  return numStr.slice(-2);
}

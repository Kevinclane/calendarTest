const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;
const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;

//years get tricky... skipping for now


export function millFromSeconds(seconds) {
  return seconds * MILLISECONDS_IN_SECOND;
}

export function millFromMinutes(minutes) {
  return minutes * MILLISECONDS_IN_MINUTE;
}

export function millFromHours(hours) {
  return hours * MILLISECONDS_IN_HOUR;
}

export function millFromDays(days) {
  return days * MILLISECONDS_IN_DAY;
}

export function millFromWeeks(weeks) {
  return weeks * MILLISECONDS_IN_WEEK;
}
export const isTimeElapsed = (date: Date | string, seconds: number) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const currTimeStamp = Date.now();
  const dateTimeStamp = date.getTime();
  if (currTimeStamp <= dateTimeStamp) return false;

  const diff = currTimeStamp - dateTimeStamp;
  return diff / 1000 < seconds;
};

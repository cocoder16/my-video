/**
 * formatTime
 * @param {number} time time value in seconds (int)
 * @return {string} time
 */
export default function formatTime(time) {
  const isValidValue = Number.isInteger(time) && time >= 0;

  if (!isValidValue) {
    return "";
  }

  const seconds = time % 60;
  const restMinutes = parseInt(time / 60);
  const minutes = restMinutes % 60;
  const hoursText = parseInt(restMinutes / 60);
  const secondsText = seconds < 10 ? "0" + seconds : seconds;
  const minutesText = hoursText > 0 && minutes < 10 ? "0" + minutes : minutes;

  if (time < 3600) {
    return `${minutesText}:${secondsText}`;
  } else {
    return `${hoursText}:${minutesText}:${secondsText}`;
  }
}

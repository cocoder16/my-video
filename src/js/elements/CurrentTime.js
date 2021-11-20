import formatTime from "../utils/formatTime";

/**
 * CurrentTime Element
 * @param {number} initialCurrentTime video initial current time
 * @return {Element} element which can controller event for playing or paused
 */
export default function CurrentTime(initialCurrentTime) {
  // init DOM
  const currentTime = document.createElement("li");
  const text = document.createElement("span");

  currentTime.appendChild(text);

  currentTime.className = "current-time";

  text.textContent = formatTime(initialCurrentTime);

  return currentTime;
}

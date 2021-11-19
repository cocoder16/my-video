/**
 * getSourceType
 * @param {boolean} useMaterialIcon if true, use material icon, or, static resource
 * @param {string} playButtonIcon play icon: material icon or src
 * @param {string} pauseButtonIcon pause icon: material icon or src
 * @return {Element} element which can controller event for playing or paused
 */
export default function PlayPause(useMaterialIcon, playButtonIcon, pauseButtonIcon) {
  // cdn in main module
  // icon default src => in parameter
  // create DOM
  // controller event handler 캡슐화
  // listener 설치

  /* dynamic state */
  let isPlaying = false;
  /* *** */

  const playPauseManager = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("span");

  playPauseManager.appendChild(button);
  button.appendChild(icon);

  playPauseManager.className = "play-pause";
  icon.className = "material-icons";

  if (useMaterialIcon) {
    icon.textContent = playButtonIcon;
  }

  return playPauseManager;
}

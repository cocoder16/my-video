/**
 * PlayPause
 * @param {Element} video video element bound
 * @param {boolean} useMaterialIcon if true, use material icon, or, static resource
 * @param {string} playButtonIcon play icon: material icon or src
 * @param {string} pauseButtonIcon pause icon: material icon or src
 * @return {Element} element which can controller event for playing or paused
 */
export default function PlayPause(video, useMaterialIcon, playButtonIcon, pauseButtonIcon) {
  const isAutoPlay = video.autoplay;

  // init DOM
  const playPause = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("span");

  playPause.appendChild(button);
  button.appendChild(icon);

  playPause.className = "play-pause";
  icon.className = "material-icons";

  // set DOM property
  playPause.button = button;
  playPause.icon = icon;

  // set default button icon
  if (useMaterialIcon && isAutoPlay) {
    icon.textContent = pauseButtonIcon;
  } else if (useMaterialIcon && !isAutoPlay) {
    icon.textContent = playButtonIcon;
  }

  return playPause;
}

/**
 * VolumeSlider Element
 * @param {number} defaultVolume default volume value
 * @return {Element} element which can controller event for playing or paused
 */
export default function VolumeSlider(defaultVolume) {
  // init DOM
  const volumeSlider = document.createElement("li");
  const progress = document.createElement("progress");

  volumeSlider.appendChild(progress);

  volumeSlider.className = "volume-slider";
  progress.className = "volume";

  progress.setAttribute("value", defaultVolume);
  progress.setAttribute("max", 1);

  // set property
  volumeSlider.progress = progress;
  volumeSlider.step = 0.01;

  return volumeSlider;
}

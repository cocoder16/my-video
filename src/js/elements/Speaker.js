/**
 * Speaker Element
 * @param {boolean} useMaterialIcon if true, use material icon, or, static resource
 * @param {string} volumeOffButtonIcon speaker icon: material icon or src
 * @param {string} volumeLowOnButtonIcon speaker icon: material icon or src
 * @param {string} volumeHighOnButtonIcon speaker icon: material icon or src
 * @param {number} defaultVolume default volume value
 * @param {number} highLowBoundaryOfVolume the boundary determine high or low volume icon
 * @return {Element} element which can controller event for playing or paused
 */
export default function Speaker(
  useMaterialIcon,
  volumeOffButtonIcon,
  volumeLowOnButtonIcon,
  volumeHighOnButtonIcon,
  defaultVolume,
  highLowBoundaryOfVolume
) {
  // init DOM
  const speaker = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("span");

  speaker.appendChild(button);
  button.appendChild(icon);

  speaker.className = "speaker";
  icon.className = "material-icons";

  // set DOM property
  speaker.button = button;
  speaker.icon = icon;

  // set default button icon
  if (useMaterialIcon) {
    if (defaultVolume > highLowBoundaryOfVolume) {
      icon.textContent = volumeHighOnButtonIcon;
    } else if (defaultVolume > 0) {
      icon.textContent = volumeLowOnButtonIcon;
    } else {
      icon.textContent = volumeOffButtonIcon;
    }
  }

  return speaker;
}

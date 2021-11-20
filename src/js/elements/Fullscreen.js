/**
 * Fullscreen Element
 * @param {boolean} useMaterialIcon if true, use material icon, or, static resource
 * @param {string} fullscreenButtonIcon pictureInPicture icon: material icon or src
 * @return {Element} element which can controller event for playing or paused
 */
export default function Fullscreen(useMaterialIcon, fullscreenButtonIcon) {
  // init DOM
  const fullscreen = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("span");

  fullscreen.appendChild(button);
  button.appendChild(icon);

  fullscreen.className = "fullscreen";
  icon.className = "material-icons";

  // set DOM property
  fullscreen.button = button;
  fullscreen.icon = icon;

  // set default button icon
  if (useMaterialIcon) {
    icon.textContent = fullscreenButtonIcon;
  }

  return fullscreen;
}

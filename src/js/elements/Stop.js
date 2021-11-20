/**
 * Stop Element
 * @param {boolean} useMaterialIcon if true, use material icon, or, static resource
 * @param {string} stopButtonIcon stop icon: material icon or src
 * @return {Element} element which can controller event for playing or paused
 */
export default function Stop(useMaterialIcon, stopButtonIcon) {
  // init DOM
  const stop = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("span");

  stop.appendChild(button);
  button.appendChild(icon);

  stop.className = "stop";
  icon.className = "material-icons";

  // set DOM property
  stop.button = button;
  stop.icon = icon;

  // set default button icon
  if (useMaterialIcon) {
    icon.textContent = stopButtonIcon;
  }

  return stop;
}

/**
 * PictureInPicture Element
 * @param {boolean} useMaterialIcon if true, use material icon, or, static resource
 * @param {string} pictureInPictureButtonIcon pictureInPicture icon: material icon or src
 * @return {Element} element which can controller event for playing or paused
 */
export default function PictureInPicture(useMaterialIcon, pictureInPictureButtonIcon) {
  // init DOM
  const pictureInPicture = document.createElement("li");
  const button = document.createElement("button");
  const icon = document.createElement("span");

  pictureInPicture.appendChild(button);
  button.appendChild(icon);
  button.setAttribute("type", "button");
  pictureInPicture.className = "picture-in-picture";
  icon.className = "material-icons";

  // set DOM property
  pictureInPicture.button = button;
  pictureInPicture.icon = icon;

  // set default button icon
  if (useMaterialIcon) {
    icon.textContent = pictureInPictureButtonIcon;
  }

  return pictureInPicture;
}

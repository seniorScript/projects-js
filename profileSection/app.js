const imageInput = document.getElementById("choose-image");
const profileContainer = document.querySelector(".profile-picture");
const profilePicture = document.querySelector(".profile-picture img");

profileContainer.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (e) => displayImage(e));

function displayImage(e) {
  const file = e.target.files[0];
  if (file) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    profileContainer.innerHTML = "";
    profileContainer.appendChild(img);
  }
}

const imageInput = document.getElementById("choose-image");
const profilePicture = document.querySelector(".profile-picture img");

profilePicture.addEventListener("click", () => {
  imageInput.click();
});

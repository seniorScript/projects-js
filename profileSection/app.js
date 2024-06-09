const imageInput = document.getElementById("choose-image");
const profileContainer = document.querySelector(".profile-picture");
const profilePicture = document.querySelector(".profile-picture img");

const name = document.getElementById("name");
const newName = document.getElementById("new-name");

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

name.addEventListener("click", () => {
  newName.style.display = "block";
  name.style.display = "none";
});

newName.addEventListener("change", (e) => {
  changeName(newName.value);
  newName.style.display = "none";
  newName.value = "";
});

function changeName(newName) {
  name.innerHTML = newName;
  name.style.display = "block";
}


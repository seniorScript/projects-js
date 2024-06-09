const imageInput = document.getElementById("choose-image");
const profileContainer = document.querySelector(".profile-picture");
const profilePicture = document.querySelector(".profile-picture img");

const name = document.getElementById("name");
const newName = document.getElementById("new-name");

const city = document.getElementById("city");
const newCity = document.getElementById("new-city");

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

function changeText(originalInput, newInput) {
  originalInput.addEventListener("click", () => {
    newInput.style.display = "block";
    originalInput.style.display = "none";
  });

  newInput.addEventListener("change", () => {
    changeTextValue(originalInput, newInput.value);
    newInput.style.display = "none";
    newInput.value = "";
  });
}

changeText(name, newName);
changeText(city, newCity);

function changeTextValue(oldText, newText) {
  oldText.innerHTML = newText;
  oldText.style.display = "block";
}

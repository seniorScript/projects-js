const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");

const chooseFile = document.getElementById("choose-file");
chooseFile.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", displayImage);

function displayImage(event) {
  const file = event.target.files[0];
  if (file) {
    imagePreview.innerHTML = "";
    const img = document.createElement("img");
    const source = URL.createObjectURL(file);
    img.src = source;
    img.style.display = "block";
    img.style.width = "50%";
    img.style.hight = "50%";
    imagePreview.appendChild(img);
  }
}

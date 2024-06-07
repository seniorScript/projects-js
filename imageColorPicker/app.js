const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const chooseFile = document.getElementById("choose-file");
const canvas = document.getElementById("canvas");
const colorDisplay = document.getElementById("color-display");

chooseFile.addEventListener("click", () => imageInput.click());
imageInput.addEventListener("change", handleImageChange);

function handleImageChange(event) {
  const file = event.target.files[0];
  if (file) {
    displayImage(file);
  }
}

function displayImage(file) {
  imagePreview.innerHTML = "";
  const img = document.createElement("img");
  const source = URL.createObjectURL(file);
  img.src = source;
  img.style.display = "block";
  img.style.width = "50%";
  img.style.height = "50%";
  imagePreview.appendChild(img);

  img.onload = () => drawImageOnCanvas(img);
  img.addEventListener("click", (event) => pickColor(event, img));
}

function drawImageOnCanvas(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
}

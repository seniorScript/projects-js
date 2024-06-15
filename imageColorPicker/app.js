const addButton = document.getElementById("add");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colorDisplay = document.getElementById("color-display");
const pickedColor = document.getElementById("picked-color");

addButton.addEventListener("click", () => imageInput.click());
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

function pickColor(event, img) {
  const rect = img.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const imageData = ctx.getImageData(x, y, 1, 1).data;
  const rgbColor = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
  colorDisplay.style.backgroundColor = rgbColor;
  displayColorValue(rgbColor);
}

function displayColorValue(value) {
  pickedColor.innerHTML = value;
}

pickedColor.addEventListener("click", () => {
  const p = document.createElement("p");
  p.textContent = pickedColor.textContent;
  copyText(p.innerHTML);
});

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert(text);
  } catch (err) {
    alert("Failed to copy: ", err);
  }
}

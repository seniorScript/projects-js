const addButton = document.getElementById("add");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// color
const colorDisplay = document.getElementById("color-display");
const pickedColor = document.getElementById("picked-color");

const label = document.getElementById("label");

// tools
const tools = document.querySelectorAll("#tools > *");
const toolSection = document.getElementById("tools");
const colorSwitcher = document.getElementById("color-switcher");
const cropSwitcher = document.getElementById("crop-switcher");
const filterSwitcher = document.getElementById("filter-switcher");

let mode = null;

// functions
function removeActiveClass() {
  tools.forEach((tool) => {
    tool.classList.remove("selected");
  });
}

function showTools() {
  toolSection.style.display = "flex";
}

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
  img.style.maxWidth = "400px";
  img.style.maxHeight = "500px";
  img.style.width = "auto";
  img.style.height = "auto";

  imagePreview.appendChild(img);

  img.onload = () => drawImageOnCanvas(img);
  img.addEventListener("click", (event) => pickColor(event, img));
  label.innerHTML = "Manipulate the image!";
  showTools();
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
  displayColorValue(rgbToHex(imageData[0], imageData[1], imageData[2]));
}

function displayColorValue(value) {
  pickedColor.innerHTML = value;
}

function handleColorPicker() {
  // color picker is being handled
  console.log("color picker actived");
}

function handleCrop() {
  // crop is being handled
  console.log("crop actived");
}

function handleFilter() {
  // filter is being handled
  console.log("filter actived");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert(text);
  } catch (err) {
    alert("Failed to copy: ", err);
  }
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// event listeners
colorSwitcher.addEventListener("click", () => {
  if (mode === "color") return;
  else {
    mode = "color";
    removeActiveClass();
    colorSwitcher.classList.add("selected");
    handleColorPicker();
  }
});

cropSwitcher.addEventListener("click", () => {
  if (mode === "crop") return;
  else {
    mode = "crop";
    removeActiveClass();
    cropSwitcher.classList.add("selected");
    handleCrop();
  }
});

filterSwitcher.addEventListener("click", () => {
  if (mode === "filter") return;
  else {
    mode = "filter";
    removeActiveClass();
    filterSwitcher.classList.add("selected");
    handleFilter();
  }
});

addButton.addEventListener("click", () => imageInput.click());

imageInput.addEventListener("change", handleImageChange);

pickedColor.addEventListener("click", () => {
  const p = document.createElement("p");
  p.textContent = pickedColor.textContent;
  copyText(p.innerHTML);
});

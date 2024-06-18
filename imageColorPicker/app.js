// Constants
const MODE_COLOR = "color";
const MODE_CROP = "crop";
const MODE_FILTER = "filter";

// DOM Elements
const domElements = {
  addButton: document.getElementById("add"),
  imageInput: document.getElementById("image-input"),
  imagePreview: document.getElementById("image-preview"),
  canvas: document.getElementById("canvas"),
  ctx: document.getElementById("canvas").getContext("2d"),
  colorDisplay: document.getElementById("color-display"),
  pickedColor: document.getElementById("picked-color"),
  label: document.getElementById("label"),
  tools: document.querySelectorAll("#tools > *"),
  toolSection: document.getElementById("tools"),
  colorSwitcher: document.getElementById("color-switcher"),
  cropSwitcher: document.getElementById("crop-switcher"),
  filterSwitcher: document.getElementById("filter-switcher"),
  filterRange: document.getElementById("filter-range"),
  contrast: document.getElementById("contrast"),
  brightness: document.getElementById("brightness"),
  saturation: document.getElementById("saturation"),
};

let mode = null;
let currentImage = null;

let cropStart = null;
let cropEnd = null;

// Utility Functions
const removeActiveClass = () => {
  domElements.tools.forEach((tool) => {
    tool.classList.remove("selected");
  });
};

const showTools = () => {
  domElements.toolSection.style.display = "flex";
};

const showElement = (element, show) => {
  element.style.display = show ? "block" : "none";
};

const rgbToHex = (r, g, b) =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

// Image Handling Functions
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) displayImage(file);
};

const displayImage = (file) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.classList.add("image-preview");
  img.onload = () => {
    domElements.imagePreview.innerHTML = "";
    domElements.imagePreview.appendChild(img);
    drawImageOnCanvas(img);
    currentImage = img;
    domElements.label.innerHTML = "Manipulate the image!";
    showTools();
    addImageClickListener();
  };
  img.onerror = () => {
    alert("Failed to load image.");
  };
};

const drawImageOnCanvas = (img) => {
  domElements.canvas.width = img.width;
  domElements.canvas.height = img.height;
  domElements.ctx.drawImage(img, 0, 0, img.width, img.height);
};

const manipulateImage = (event) => {
  if (!currentImage) return;
  const rect = currentImage.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const imageData = domElements.ctx.getImageData(x, y, 1, 1).data;
  const rgbColor = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;

  if (mode === MODE_COLOR) {
    domElements.colorDisplay.style.backgroundColor = rgbColor;
    displayColorValue(rgbToHex(imageData[0], imageData[1], imageData[2]));
  }

  // Placeholder for crop and filter modes
  if (mode === MODE_CROP) {
    // doing crop things
  }

  if (mode === MODE_FILTER) console.log("filter");
};

const displayColorValue = (value) => {
  domElements.pickedColor.innerHTML = value;
  showElement(domElements.pickedColor, mode === MODE_COLOR);
  showElement(domElements.colorDisplay, mode === MODE_COLOR);
};

const addImageClickListener = () => {
  currentImage.removeEventListener("click", manipulateImage);
  currentImage.addEventListener("click", manipulateImage);
};

// Tool Mode Handling
const setMode = (newMode, switcherElement) => {
  if (mode === newMode) return;
  mode = newMode;
  removeActiveClass();
  showElement(domElements.pickedColor, newMode === MODE_COLOR);
  showElement(domElements.colorDisplay, newMode === MODE_COLOR);
  switcherElement.classList.add("selected");
  addImageClickListener();
};

// Event Listeners
domElements.colorSwitcher.addEventListener("click", () =>
  setMode(MODE_COLOR, domElements.colorSwitcher)
);
domElements.cropSwitcher.addEventListener("click", () =>
  setMode(MODE_CROP, domElements.cropSwitcher)
);
domElements.filterSwitcher.addEventListener("click", () =>
  setMode(MODE_FILTER, domElements.filterSwitcher)
);

domElements.addButton.addEventListener("click", () =>
  domElements.imageInput.click()
);
domElements.imageInput.addEventListener("change", handleImageChange);

domElements.pickedColor.addEventListener("click", () => {
  const p = document.createElement("p");
  p.textContent = domElements.pickedColor.textContent;
  copyText(p.innerHTML);
});

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert(text);
  } catch (err) {
    alert("Failed to copy: ", err);
  }
};

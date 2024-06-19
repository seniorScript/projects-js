// Global main variables
let mode = null;
let currentImage = null;
let cropStart = null;
let cropEnd = null;

import {
  removeActiveClass,
  showTools,
  showElement,
  rgbToHex,
  copyText,
  getPosition,
} from "./utility.js";

import { domElements } from "./DomElements.js";
import { MODE_COLOR, MODE_CROP, MODE_FILTER } from "./constants.js";

// Utility functions
const setCurrentImage = (img) => (currentImage = img);

const setMode = (newMode) => (mode = newMode);

const createImage = (src) => {
  const img = new Image();
  img.src = src;
  img.classList.add("image-preview");
  return img;
};

const updateLabel = (text) => (domElements.label.innerHTML = text);

const updateCanvasSize = (img) => {
  domElements.canvas.width = img.width;
  domElements.canvas.height = img.height;
};

const drawImageOnCanvas = (img) => {
  updateCanvasSize(img);
  domElements.ctx.drawImage(img, 0, 0, img.width, img.height);
};

const displayColorValue = (value) => {
  domElements.pickedColor.innerHTML = value;
  showElement(domElements.pickedColor, mode === MODE_COLOR);
  showElement(domElements.colorDisplay, mode === MODE_COLOR);
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

  if (mode === MODE_CROP) {
    // Crop logic
  }

  if (mode === MODE_FILTER) {
    console.log("filter");
  }
};

const addImageClickListener = () => {
  currentImage.removeEventListener("click", manipulateImage);
  currentImage.addEventListener("click", manipulateImage);
};

const handleImageLoad = (img) => {
  domElements.imagePreview.innerHTML = "";
  domElements.imagePreview.appendChild(img);
  drawImageOnCanvas(img);
  setCurrentImage(img);
  updateLabel("Manipulate the image!");
  showTools(domElements.toolSection);
  addImageClickListener();
};

const handleImageError = () => alert("Failed to load image.");

const displayImage = (file) => {
  const img = createImage(URL.createObjectURL(file));
  img.onload = () => handleImageLoad(img);
  img.onerror = handleImageError;
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) displayImage(file);
};

// Tool Mode Handling
const updateModeUI = (newMode, switcherElement) => {
  if (mode === newMode) return;
  setMode(newMode);
  removeActiveClass(domElements.tools);
  showElement(domElements.pickedColor, newMode === MODE_COLOR);
  showElement(domElements.colorDisplay, newMode === MODE_COLOR);
  switcherElement.classList.add("selected");
  addImageClickListener();
};

// Event Listeners
domElements.colorSwitcher.addEventListener("click", () =>
  updateModeUI(MODE_COLOR, domElements.colorSwitcher)
);
domElements.cropSwitcher.addEventListener("click", () =>
  updateModeUI(MODE_CROP, domElements.cropSwitcher)
);
domElements.filterSwitcher.addEventListener("click", () =>
  updateModeUI(MODE_FILTER, domElements.filterSwitcher)
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

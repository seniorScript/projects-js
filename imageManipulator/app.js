// DOM elements
const imageInput = document.getElementById("image-input");
const addIcon = document.querySelector(".add-container");
const download = document.querySelector(".download-container");
const cropSwitcher = document.getElementById("crop-switcher");
const initialSelection = document.getElementById("initial-selection");
const openImageButton = document.getElementById("open-image");
const filters = document.getElementById("filter-range");
const imageContainer = document.querySelector(".image-place");

// filters
const filterRange = document.getElementById("filter-range");
const contrast = document.getElementById("contrast");
const contrastText = document.getElementById("contrast-text");
const brightness = document.getElementById("brightness");
const brightText = document.getElementById("brightness-text");
const grayscale = document.getElementById("grayscale");
const grayscaleText = document.getElementById("grayscale-text");

// Global variables
let mode = null;
let currentImage = null;
let originalImage = null;

// filters
let brightnesValue = 100;
let contrastValue = 100;
let grayScaleValue = 0;

// Event listeners
openImageButton.addEventListener("click", () => {
  imageInput.click();
});

contrast.addEventListener("change", () => {
  contrastValue = contrast.value / 100;
  contrastText.innerHTML = Number(contrastValue).toFixed(2);
  applyFilter();
});

brightness.addEventListener("change", () => {
  brightnesValue = brightness.value;
  brightText.innerHTML = brightnesValue;
  applyFilter();
});

grayscale.addEventListener("change", () => {
  grayScaleValue = grayscale.value / 100;
  grayscaleText.innerHTML = grayScaleValue;
  applyFilter();
});

download.addEventListener("click", () => {
  if (currentImage) {
    const dataURL = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = dataURL;
    anchor.download = "image.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
});

cropSwitcher.addEventListener("click", () => {
  if (!currentImage) return;
  if (mode === "crop") {
    mode = null;
    cropSwitcher.classList.remove("selected");
  } else {
    mode = "crop";
    cropSwitcher.classList.toggle("selected");
  }
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const img = createImage(file);
    img.onload = () => {
      contrastValue = 100;
      contrast.value = 100;
      contrastText.innerHTML = contrastValue;

      brightnesValue = 100;
      brightness.value = brightnesValue;
      brightText.innerHTML = brightnesValue;

      grayScaleValue = 0;
      grayscale.value = grayScaleValue;
      grayscaleText.innerHTML = grayScaleValue;

      // reset the ranges

      currentImage = img;
      originalImage = new Image();
      originalImage.src = img.src;
      initialSelection.style.display = "none";

      brightnesValue = 100;
      brightness.value = brightnesValue;
      brightText.innerHTML = 100;

      contrastValue = 1;
      contrast.value = contrastValue;
      contrastText.innerHTML = 1;

      showTools();
      applyFilter();

      img.style.width = "100%";
      img.style.height = "100%";
      img.style.maxHeight = "700px";

      imageContainer.innerHTML = "";
      imageContainer.appendChild(img);
    };
  }
});

addIcon.addEventListener("click", () => {
  imageInput.click();
});

// Functions
function handleFilter(e) {
  if (mode !== "filter") return;
  applyFilter();
}

function applyFilter() {
  let filter = `grayscale(${grayScaleValue}) contrast(${contrastValue}) brightness(${brightnesValue}%)`;
  currentImage.style.filter = filter;
}

function createImage(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  return img;
}

function showTools() {
  filters.style.display = "flex";
  imageContainer.style.display = "flex";
}

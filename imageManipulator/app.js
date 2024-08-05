// DOM elements
const imageInput = document.getElementById("image-input");
const addIcon = document.querySelector(".add-container");
const download = document.querySelector(".download-container");
const cropSwitcher = document.getElementById("crop-switcher");
const initialSelection = document.getElementById("initial-selection");
const openImageButton = document.getElementById("open-image");
const filters = document.getElementById("filter-range");
const imageContainer = document.querySelector("#canvas");
const cropToggler = document.getElementById("crop-toggler");
const canvasContainer = document.querySelector(".canvas-container");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
let cropper = null;
let currentImageURL = null;

// filters
let brightnesValue = 0;
let contrastValue = 100;
let grayScaleValue = 0;

// Event listeners
cropToggler.addEventListener("click", () => {
  cropTheImage();
});

openImageButton.addEventListener("click", () => {
  imageInput.click();
});

contrast.addEventListener("change", () => {
  contrastValue = contrast.value;
  contrastText.innerHTML = contrastValue;
  applyFilter();
});

brightness.addEventListener("change", () => {
  brightnesValue = brightness.value;
  brightText.innerHTML = brightnesValue;
  applyFilter();
});

grayscale.addEventListener("change", () => {
  grayScaleValue = grayscale.value;
  grayscaleText.innerHTML = grayScaleValue;
  applyFilter();
});

download.addEventListener("click", () => {
  if (currentImage) {
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.href = currentImageURL;
    anchor.download = "image.png";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(currentImageURL);
  }
});

cropSwitcher.addEventListener("click", () => {
  if (!currentImage) return;
  if (mode === "crop") {
    mode = null;
    cropSwitcher.classList.remove("selected");
    cropper.destroy();
    cropper = null;
  } else {
    mode = "crop";
    cropSwitcher.classList.toggle("selected");
    cropper = new Cropper(canvas, {
      zoomable: false,
      autocrop: true,
    });
  }
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const img = createImage(file);
    img.onload = () => {
      resetFilters();
      currentImage = img;
      originalImage = new Image();
      originalImage.src = img.src;
      currentImageURL = img.src;
      initialSelection.style.display = "none";

      showTools();
      applyFilter();
      drawOnCanvas(img);
    };
  }
});

addIcon.addEventListener("click", () => {
  imageInput.click();
});

// Functions
function drawOnCanvas(img) {
  canvas.style.display = "flex";
  canvas.width = img.width;
  canvas.height = img.height;
  canvasContainer.style.display = "flex";
  canvas.style.maxWidth = "650px";
  canvas.style.maxHeight = "500px";
  ctx.drawImage(img, 0, 0, img.width, img.height);
}

function resetFilters() {
  contrastValue = 100;
  contrast.value = 100;
  contrastText.innerHTML = contrastValue;

  brightnesValue = 100;
  brightness.value = brightnesValue;
  brightText.innerHTML = brightnesValue;

  grayScaleValue = 0;
  grayscale.value = grayScaleValue;
  grayscaleText.innerHTML = grayScaleValue;
}

function handleFilter(e) {
  if (mode !== "filter") return;
  applyFilter();
}

function applyFilter() {
  if (!originalImage) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = "none";
  ctx.filter = `brightness(${brightnesValue}%) grayscale(${grayScaleValue}%) contrast(${contrastValue}%)`;
  ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
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

function cropTheImage() {
  if (mode === "crop" && cropper) {
    const canv = cropper.getCroppedCanvas();
    canv.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      currentImage.src = url;
      currentImageURL = url;
      mode = null;
      cropSwitcher.classList.remove("selected");
      cropper.destroy();
      cropper = null;
    }, "image/png");
  }
}

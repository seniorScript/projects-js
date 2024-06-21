const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const imageInput = document.getElementById("image-input");
const addIcon = document.getElementById("add");

const pickedColor = document.getElementById("picked-color");

const download = document.getElementById("download");

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

let startX, startY, endX, endY;
let cropStart = null;
let cropEnd = null;

let mode = null;
let currentImage = null;

const colorSwitcher = document.getElementById("color-switcher");
const cropSwitcher = document.getElementById("crop-switcher");
const filterSwitcher = document.getElementById("filter-switcher");

filterSwitcher.addEventListener("click", (e) => {
  removeActiveClass();
  filterSwitcher.classList.add("selected");
  console.log("filter");
});

colorSwitcher.addEventListener("click", (e) => {
  removeActiveClass();
  colorSwitcher.classList.add("selected");
  mode = "color";
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (currentImage) {
    context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  }
});

cropSwitcher.addEventListener("click", () => {
  mode = "crop";
  removeActiveClass();
  cropSwitcher.classList.add("selected");
  pickedColor.style.display = "none";
});

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  return { x, y };
}

function handleColorPicker(e) {
  if (mode !== "color") return;
  const pos = getMousePosition(e);
  const data = context.getImageData(pos.x, pos.y, 1, 1).data;
  const [R, G, B] = data;
  const hex = RgbToHex(R, G, B);
  pickedColor.style.background = hex;
}

function handleCrop(e) {
  if (mode !== "crop") return;

  if (!cropStart) {
    let pos = getMousePosition(e);
    startX = pos.x;
    startY = pos.y;
    cropStart = true;
  } else {
    let pos = getMousePosition(e);
    endX = pos.x;
    endY = pos.y;
    cropStart = false;

    if (confirm("Confirm crop?")) {
      cropTheImage();
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (currentImage) {
        context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
      }
    }
  }
}

function cropTheImage() {
  let minX = Math.min(startX, endX);
  let minY = Math.min(startY, endY);
  let width = Math.abs(startX - endX);
  let height = Math.abs(startY - endY);

  let tempCanvas = document.createElement("canvas");
  let tempContext = tempCanvas.getContext("2d");
  tempCanvas.width = width;
  tempCanvas.height = height;

  tempContext.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);

  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = width;
  canvas.height = height;
  context.drawImage(tempCanvas, 0, 0, width, height);

  currentImage = new Image();
  currentImage.src = tempCanvas.toDataURL();

  mode = null;
  pickedColor.style.display = "none";
}

addIcon.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const img = createImage(file);
    img.onload = () => {
      drawOnCanvas(img);
      currentImage = img;
    };
  }
});

function createImage(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  return img;
}

function drawOnCanvas(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0, img.width, img.height);
}

canvas.addEventListener("click", (e) => {
  handleColorPicker(e);
  handleCrop(e);
});

canvas.addEventListener("mousemove", (e) => {
  if (mode === "crop" && cropStart) {
    const pos = getMousePosition(e);

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (currentImage) {
      context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    }

    let startXPos = Math.min(startX, pos.x);
    let startYPos = Math.min(startY, pos.y);
    let w = Math.abs(startX - pos.x);
    let h = Math.abs(startY - pos.y);

    context.beginPath();
    context.rect(startXPos, startYPos, w, h);
    context.strokeStyle = "red";
    context.stroke();
  }
});

function RgbToHex(r, g, b) {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

const switchers = document.querySelectorAll("#tools > *");

function removeActiveClass() {
  switchers.forEach((s) => {
    s.classList.remove("selected");
  });
}

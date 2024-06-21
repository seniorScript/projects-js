const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const imageInput = document.getElementById("image-input");
const addIcon = document.getElementById("add");

const pickedColor = document.getElementById("picked-color");

let startX, startY, endX, endY;
let cropStart = null;
let cropEnd = null;

let mode = null;
let currentImage = null;

const colorSwitcher = document.getElementById("color-switcher");
const cropSwitcher = document.getElementById("crop-switcher");

colorSwitcher.addEventListener("click", (e) => {
  mode = "color";
  pickedColor.style.display = "block";
  // Clear the previous rectangle
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw the image to clear any previous drawings
  if (currentImage) {
    context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  }
});

cropSwitcher.addEventListener("click", () => {
  mode = "crop";
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

    // Ask for confirmation (you can implement this part in various ways)
    if (confirm("Confirm crop?")) {
      cropTheImage();
    } else {
      // Clear crop selection if not confirmed
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

  // Create a temporary canvas to hold the cropped image
  let tempCanvas = document.createElement("canvas");
  let tempContext = tempCanvas.getContext("2d");
  tempCanvas.width = width;
  tempCanvas.height = height;

  // Perform the crop operation
  tempContext.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);

  // Clear the original canvas and draw the cropped image back
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = width;
  canvas.height = height;
  context.drawImage(tempCanvas, 0, 0, width, height);

  // Update currentImage with the cropped image
  currentImage = new Image();
  currentImage.src = tempCanvas.toDataURL(); // Convert cropped canvas to data URL

  // Reset mode and UI
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

    // Clear the previous rectangle
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the image to clear any previous drawings
    if (currentImage) {
      context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    }

    // Calculate the starting position and size of the rectangle
    let startXPos = Math.min(startX, pos.x);
    let startYPos = Math.min(startY, pos.y);
    let w = Math.abs(startX - pos.x);
    let h = Math.abs(startY - pos.y);

    // Draw the new rectangle
    context.beginPath();
    context.rect(startXPos, startYPos, w, h);
    context.strokeStyle = "red"; // Optional: change the color of the rectangle
    context.stroke();
  }
});

function RgbToHex(r, g, b) {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

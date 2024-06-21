const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const imageInput = document.getElementById("image-input");
const addIcon = document.getElementById("add");

const pickedColor = document.getElementById("picked-color");

let mode = null;
let currentImage = null;

const colorSwitcher = document.getElementById("color-switcher");

colorSwitcher.addEventListener("click", (e) => {
  mode = "color";
  pickedColor.style.display = "block";
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

addIcon.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const img = createImage(file);
    img.onload = () => {
      drawOnCanvas(img);
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
});

function RgbToHex(r, g, b) {
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

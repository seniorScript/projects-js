const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const imageInput = document.getElementById("image-input");
const addIcon = document.getElementById("add");

addIcon.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", () => {});

const air = document.getElementById("air");
const cropBtn = document.getElementById("crop-btn");
const container = document.querySelector(".container");
const imageContainer = document.querySelector(".image-container");

const imageInput = document.getElementById("image-input");
const personImg = document.getElementById("person-img");
let cropper = null;

personImg.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.id = "person-image";
    img.addEventListener("load", () => {
      air.src = img.src;
      container.style.display = "flex";
      cropper = new Cropper(air, {
        aspectRatio: 1,
        movable: false,
        zoomable: false,
      });
    });
  }
});

cropBtn.addEventListener("click", () => {
  if (!cropper) return;
  let croppedImg = cropper.getCroppedCanvas().toDataURL();
  personImg.src = croppedImg;
  cropper.destroy();
  container.style.display = "none";
  cropper = null;
});

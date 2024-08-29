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
    img.addEventListener("load", () => {
      personImg.src = img.src;
    });
  }
});

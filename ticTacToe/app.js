const cells = document.querySelectorAll("[data-cell]");
const draggables = document.querySelectorAll(".draggable");
let currentPlayer = "X";

cells.forEach((cell) => {
  cell.addEventListener("dragover", dragOver);
  cell.addEventListener("drop", drop);
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

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

function drop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const draggable = document.getElementById(id);

  if (!e.target.textContent) {
    e.target.textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      setTimeout(() => alert(`${currentPlayer} wins!`), 10);
      resetBoard();
    } else if (isDraw()) {
      setTimeout(() => alert(`It's a draw!`), 10);
      resetBoard();
    } else {
      switchPlayer();
    }
  }
}

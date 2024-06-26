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

function checkWin(player) {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.textContent === "X" || cell.textContent === "O";
  });
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

const options = document.querySelectorAll(".gameOption");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
let choices = ["rock", "paper", "scissors"];

let yourScore = 0;
let yourScoreSpan = document.getElementById("yourScore");

let pcScore = 0;
let pcScoreSpan = document.getElementById("pcScore");

let gameInProgress = false;

options.forEach((option) => {
  option.addEventListener("click", () => {
    game(option.id);
  });
});

function game(id) {
  if (gameInProgress) {
    return;
  }

  gameInProgress = true;
  let pcChoice = choices[Math.floor(Math.random() * 3)];
  let winner = chooseWinner(id, pcChoice);
  updateScore(winner);
  updateStyles(id, "yourStyle");
  updateStyles(pcChoice, "pcStyle");

  setTimeout(() => {
    gameInProgress = false;
  }, 1500);
}

function chooseWinner(you, pc) {
  if (you === pc) {
    return "DRAW";
  } else if (
    (you === "rock" && pc === "scissors") ||
    (you === "paper" && pc === "rock") ||
    (you === "scissors" && pc === "paper")
  ) {
    return "YOU";
  } else {
    return "PC";
  }
}

function updateScore(winner) {
  if (winner === "YOU") {
    yourScore++;
    yourScoreSpan.innerHTML = yourScore;
  }

  if (winner === "PC") {
    pcScore++;
    pcScoreSpan.innerHTML = pcScore;
  }

  return;
}

function updateStyles(choice, style) {
  const option = document.getElementById(choice);
  option.classList.add(style);
  setTimeout(() => {
    option.classList.remove(style);
  }, 1500);
}

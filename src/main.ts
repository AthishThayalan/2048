import "./style.scss";
import confetti from "canvas-confetti";
import { playLoseSound, playPartySound, playShiftSound } from "./audio";
const gameBoard = document.querySelector<HTMLDivElement>(".board");
const newGame = document.getElementById("newGameBtn");
const score = document.querySelector<HTMLSpanElement>("span");
const highScore = document.getElementById("highScore");
const savedHighScore = localStorage.getItem("highScore");

let touchStartX: number;
let touchStartY: number;

let winAchieved = false;

if (!gameBoard || !newGame || !score || !highScore) {
  throw new Error("Element not found.");
}
if (savedHighScore) {
  highScore.innerText = savedHighScore;
}

let board: number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];
let counter = 0;
score.innerText = counter.toString();

const setStart = () => {
  const randomNumbers: number[] = [];
  while (randomNumbers.length < 4) {
    const randomNumber = Math.floor(Math.random() * 4);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }
  board[randomNumbers[0]][randomNumbers[1]] = 2;
  board[randomNumbers[2]][randomNumbers[3]] = 2;
};

const updateHighScore = (): void => {
  if (counter > Number(highScore.innerText)) {
    highScore.innerText = counter.toString();
    localStorage.setItem("highScore", counter.toString());
  }
};

const updateScore = (num: number): void => {
  counter += num;
  score.innerText = counter.toString();
  updateHighScore();
};

const resetScore = (): void => {
  counter = 0;
  score.innerText = counter.toString();
};

const resetBoard = () => {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
};

const spawnRandomBox = (): void => {
  const emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  if (emptyCells.length === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];
  const newValue = Math.random() < 0.9 ? 2 : 4;

  board[randomCell[0]][randomCell[1]] = newValue;

  const box = document.getElementById(
    (4 * randomCell[0] + randomCell[1]).toString()
  );
  updateBoard(box, newValue);
};

const updateBoard = (box: any, value: number): void => {
  box.innerText = "";
  box.classList.value = "";
  box.classList.add("board__box");
  if (value !== 0) {
    box.innerText = value;
    if (value > 2048) {
      box.classList.add("board__box--dark");
    } else {
      box.classList.add(`board__box--${value}`);
    }
    box.classList.add("board__box--updated");
    setTimeout(() => {
      box.classList.remove("board__box--updated");
    }, 300);
  }
};

const startNewGame = () => {
  resetScore();
  resetBoard();
  gameBoard.innerHTML = "";
  loadGame();
};

const checkValidMoves = (): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return true;
      }
      if (j < 3 && board[i][j] === board[i][j + 1]) {
        return true;
      }
      if (i < 3 && board[i][j] === board[i + 1][j]) {
        return true;
      }
    }
  }
  updateHighScore();
  return false;
};

const checkWinCondition = (): void => {
  if (!winAchieved) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 2048) {
          winAchieved = true;
          playPartySound();
          confetti({
            particleCount: 700,
            spread: 360,
          });
          return;
        }
      }
    }
  }
};

const gameOver = () => {
  if (!checkValidMoves()) {
    playLoseSound();
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const overlayText = document.createElement("div");
    overlayText.classList.add("overlay__text");
    overlayText.innerText = "Game Over";
    overlay.appendChild(overlayText);
    gameBoard.appendChild(overlay);
  }
};

const loadGame = (): void => {
  setStart();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement("div");
      box.classList.add("board__box");
      box.id = (4 * i + (j % 4)).toString();
      let value: number = board[i][j];
      updateBoard(box, value);
      gameBoard.appendChild(box);
    }
  }
};

const transposeBoard = (board: number[][]): number[][] => {
  let transposedBoard: number[][] = [];
  for (let i = 0; i < 4; i++) {
    let newRow: number[] = [];
    for (let j = 0; j < 4; j++) {
      newRow.push(board[j][i]);
    }
    transposedBoard.push(newRow);
  }

  return transposedBoard;
};

const verticalShift = (direction: "up" | "down") => {
  board = transposeBoard(board);
  if (direction === "up") {
    horizontalShift("left");
  } else {
    horizontalShift("right");
  }
  board = transposeBoard(board);
  for (let i = 0; i < 4; i++) {
    for (let k = 0; k < 4; k++) {
      let box = document.getElementById((4 * i + (k % 4)).toString());
      updateBoard(box, board[i][k]);
    }
  }
};

const horizontalShift = (direction: "right" | "left") => {
  for (let i = 0; i < 4; i++) {
    let row = direction === "right" ? board[i].reverse() : board[i];
    let filteredRow = row.filter((num) => num !== 0);
    for (let j = 0; j < filteredRow.length - 1; j++) {
      if (filteredRow[j] == filteredRow[j + 1]) {
        filteredRow[j] += filteredRow[j + 1];
        filteredRow[j + 1] = 0;
        updateScore(filteredRow[j]);
      }
    }
    filteredRow = filteredRow.filter((num) => num !== 0);
    while (filteredRow.length !== 4) {
      filteredRow.push(0);
    }
    if (direction === "right") {
      filteredRow.reverse();
    }
    board[i] = filteredRow;
    for (let k = 0; k < 4; k++) {
      let box = document.getElementById((4 * i + (k % 4)).toString());
      updateBoard(box, board[i][k]);
    }
  }
  spawnRandomBox();
  checkWinCondition();
  playShiftSound();
  gameOver();
};

document.addEventListener("DOMContentLoaded", loadGame);
document.addEventListener("keydown", (event) => {
  if (!checkValidMoves()) {
    return;
  }
  if (event.key === "ArrowLeft") {
    horizontalShift("left");
  } else if (event.key === "ArrowRight") {
    horizontalShift("right");
  } else if (event.key === "ArrowUp") {
    verticalShift("up");
  } else if (event.key === "ArrowDown") {
    verticalShift("down");
  }
});

gameBoard.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

gameBoard.addEventListener("touchend", (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const touchEndY = event.changedTouches[0].clientY;

  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      horizontalShift("right");
    } else {
      horizontalShift("left");
    }
  } else {
    if (dy > 0) {
      verticalShift("down");
    } else {
      verticalShift("up");
    }
  }
});
newGame.addEventListener("click", startNewGame);

import "./style.scss";

const gameBoard = document.querySelector<HTMLDivElement>(".board");
if (!gameBoard) {
  throw new Error("Element not found.");
}
let board: number[][] = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const setStart = () => {
  const randomNumbers = [];
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 4);
    randomNumbers.push(randomNumber);
  }
  board[randomNumbers[0]][randomNumbers[1]] = 2;
  board[randomNumbers[2]][randomNumbers[3]] = 2;
};

const updateBoard = (box: any, value: number): void => {
  box.innerText = "";
  box.classList.value = "";
  box.classList.add("board__box");
  if (value !== 0) {
    box.innerText = value;
    box.classList.add(`board__box--${value}`);
    box.classList.add("board__box--updated");
    setTimeout(() => {
      box.classList.remove("board__box--updated");
    }, 300);
  }
};

const loadGame = (): void => {
  setStart();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement("div");
      box.classList.add("board__box");
      box.id = (4 * i + (j % 4)).toString();
      console.log(box.id);
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
    console.log(`row = ${row}`);
    let filteredRow = row.filter((num) => num !== 0);
    for (let j = 0; j < filteredRow.length - 1; j++) {
      if (filteredRow[j] == filteredRow[j + 1]) {
        filteredRow[j] += filteredRow[j + 1];
        filteredRow[j + 1] = 0;
      }
    }
    filteredRow = filteredRow.filter((num) => num !== 0);
    console.log(filteredRow);

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
};

document.addEventListener("DOMContentLoaded", loadGame);
document.addEventListener("keydown", (event) => {
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

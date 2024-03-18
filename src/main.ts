import "./style.scss";

const gameBoard = document.querySelector<HTMLDivElement>(".board");
if (!gameBoard) {
  throw new Error("Element not found.");
}
let board: number[][] = [
  [2, 2, 0, 0],
  [0, 4, 16, 0],
  [0, 8, 32, 0],
  [0, 0, 0, 0],
];

const updateBoard = (box: any, value: number): void => {
  box.innerText = "";
  box.classList.value = "";
  box.classList.add("board__box");
  if (value !== 0) {
    box.innerText = value;
    box.classList.add(`board__box--${value}`);
  }
};

const loadGame = (): void => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement("div");
      box.classList.add("board__box");
      box.id = i.toString() + "-" + j.toString(); // keep track of box position. Might be easier to move in x and y direction
      let value: number = board[i][j];
      updateBoard(box, value);
      gameBoard.appendChild(box);
    }
  }
};

const handleLeftPress = (): void => {
  console.log("pressed");
  let returnArr: number[] = [];
  for (let i = 0; i < 4; i++) {
    let removeZero = board[i].filter((num) => num !== 0);
    for (let j = 0; j < 4; j++) {
      if (removeZero[j] === removeZero[j + 1]) {
        removeZero[j] += removeZero[j + 1];
        removeZero[j + 1] = 0;
      }
    }
    let removeZeroAgain: number[] = removeZero.filter((num) => num !== 0);
    while (removeZeroAgain.length < 4) {
      removeZeroAgain.push(0);
    }
    board[i] = removeZeroAgain;
    console.log(removeZeroAgain);
  }
};

document.addEventListener("DOMContentLoaded", loadGame);
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    handleLeftPress();
  }
});

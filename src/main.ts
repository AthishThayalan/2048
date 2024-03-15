import "./style.scss";

const gameBoard = document.querySelector<HTMLDivElement>(".board");
if (!gameBoard) {
  throw new Error("Element not found.");
}

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
  let board: number[][] = [
    [2, 0, 0, 0],
    [0, 4, 16, 0],
    [0, 8, 32, 0],
    [0, 0, 0, 0],
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement("div");
      box.classList.add("board__box");
      box.id = i.toString() + "-" + j.toString();
      let value: number = board[i][j];
      updateBoard(box, value);
      gameBoard.appendChild(box);
    }
  }
};

document.addEventListener("DOMContentLoaded", loadGame);

import "./style.scss";

const gameBoard = document.querySelector<HTMLDivElement>(".board");
if (!gameBoard) {
  throw new Error("Element not found.");
}

const updateBox = (): void => {
  console.log("hi");
};

const loadGame = (): void => {
  let board: number[][] = [
    [0, 2, 0, 0],
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 0],
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement("div");
      box.classList.add("board__box");
      box.classList.add("board__box--64");
      box.innerText = board[i][j].toString();
      gameBoard.appendChild(box);
    }
  }
};

document.addEventListener("DOMContentLoaded", loadGame);

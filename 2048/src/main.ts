import "./style.scss";

const gameBoard = document.querySelector<HTMLDivElement>(".board");
if (!gameBoard) {
  throw new Error("Element not found.");
}

const loadGame = (): void => {
  let board: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      let box = document.createElement("div");
      box.classList.add("board__box");
      box.innerText = board[y][x].toString();
      gameBoard.appendChild(box);
    }
  }
};

document.addEventListener("DOMContentLoaded", loadGame);

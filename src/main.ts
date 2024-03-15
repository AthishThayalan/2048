import "./style.scss";

const gameBoard = document.querySelector<HTMLDivElement>(".board");
if (!gameBoard) {
  throw new Error("Element not found.");
}

const loadGame = (): void => {
  let board: number[][] = [
    [2, 0, 4, 8],
    [2, 0, 4, 8],
    [2, 0, 4, 8],
    [2, 0, 4, 8],
  ];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.createElement("div");
      box.classList.add("board__box");
      box.innerText = board[i][j].toString();
      box.classList.add("twoThousandFortyEight");
      gameBoard.appendChild(box);
    }
  }
};

document.addEventListener("DOMContentLoaded", loadGame);

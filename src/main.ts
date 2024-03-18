import "./style.scss";

const gameBoard = document.querySelector<HTMLDivElement>(".board");
if (!gameBoard) {
  throw new Error("Element not found.");
}
let board: number[][] = [
  [2, 2, 2, 2],
  [4, 4, 16, 0],
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
  //What I expect to happen
  // 4 4 0 0
  // 4 4
  //8
  //8 0 0 0
  for (let i = 0; i < 3; i++) {
    let row = board[i];
    console.log(`row = ${row}`);
    let filteredRow = row.filter((num) => num !== 0);
    for (let j = 0; j < filteredRow.length - 1; j++) {
      if (filteredRow[j] == filteredRow[j + 1]) {
        filteredRow[j] += filteredRow[j + 1];
        filteredRow[j + 1] = 0;
      }
    }
    filteredRow = filteredRow.filter((num) => num !== 0); // get rid of 0s again
    while (filteredRow.length !== 4) {
      filteredRow.push(0);
    }
    board[i] = filteredRow;
    console.log(board);
    // update the style of each box
    for (let k = 0; k < 4; k++) {
      let box = document.getElementById(i.toString() + "-" + k.toString());
      updateBoard(box, board[i][k]);
    }
  }
};

document.addEventListener("DOMContentLoaded", loadGame);
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    handleLeftPress();
  }
});

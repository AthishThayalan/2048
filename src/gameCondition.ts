import { board } from "./main";
import { updateHighScore } from "./score";
import { playPartySound, playLoseSound } from "./audio";
import confetti from "canvas-confetti";
import { gameBoard } from "./main";

export let winAchieved = false;
export const checkValidMoves = (): boolean => {
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

export const checkWinCondition = (): void => {
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

export const gameOver = () => {
  if (!gameBoard) {
    throw new Error("Game board element not found.");
  }
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

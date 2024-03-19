export const highScore = document.getElementById("highScore");
export const savedHighScore = localStorage.getItem("highScore");
export const score = document.querySelector<HTMLSpanElement>("span");
if (!highScore || !score) {
  throw new Error("Error.");
}
export let counter = 0;
export const updateHighScore = (): void => {
  if (counter > Number(highScore.innerText)) {
    highScore.innerText = counter.toString();
    localStorage.setItem("highScore", counter.toString());
  }
};

export const updateScore = (num: number): void => {
  counter += num;
  score.innerText = counter.toString();
  updateHighScore();
};

export const resetScore = (): void => {
  counter = 0;
  score.innerText = counter.toString();
};

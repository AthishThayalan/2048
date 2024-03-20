export const playShiftSound = () => {
  const audio = document.getElementById("rowShiftSound") as HTMLAudioElement;
  audio.play();
};

export const playPartySound = () => {
  const winAudio = document.getElementById("winSound") as HTMLAudioElement;
  winAudio.play();
};

export const playLoseSound = () => {
  const loseAudio = document.getElementById("loseSound") as HTMLAudioElement;
  loseAudio.play();
};

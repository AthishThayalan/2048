# 2048 Game

2048 is a popular single-player sliding block puzzle game. The objective is to slide numbered tiles on a grid to combine them and create a tile with the number 2048. This README provides an overview of the 2048 game implementation in TypeScript.

## Features

- Sliding tiles: Move tiles in four directions - up, down, left, and right.
- Combining tiles: When two tiles with the same number collide while moving, they merge into one tile with the sum of the two numbers.
- Winning condition: Achieve a tile with the number 2048 to win the game.
- Score tracking: Keep track of the current score and highest score achieved.
- New game: Start a new game anytime to reset the board and score.

## Technologies Used

- **TypeScript**: Programming language used to add interactivity and logic to the game.
- **SCSS**: Stylesheet language used for styling the game interface.
- **Canvas Confetti**: Library used to generate confetti effect upon winning.

## How to Play

1. Clone or download the repository to your local machine.
2. Open terminal and run npm install in the directory.
3. Then run "npm run dev".
4. Open the localhost link provided in the terminal.
5. Use the arrow keys to slide the tiles in the desired direction.
6. Combine tiles with the same number to create larger numbers.
7. Aim to achieve the 2048 tile to win the game.
8. Enjoy playing the 2048 game!

## Project Structure

- **index.html**: Main HTML file containing the game interface.
- **style.scss**: Main SCSS file that imports and compiles all other SCSS partials.
- **main.ts**: TypeScript file containing the logic for game operations.
- **confetti**: Library for generating confetti effect upon winning.
- **README.md**: Documentation file providing information about the 2048 game.

## Game Mechanics

- **Initial Setup**: The game starts with two tiles randomly placed on a 4x4 grid. Each tile has a value of either 2 or 4.
- **Combining Tiles**: When two tiles with the same number collide while moving in a particular direction, they merge into one tile with the sum of the two numbers.
- **Winning**: The player wins the game when they achieve a tile with the number 2048. But can still continue to play to beat their high score.
- **Score**: The player's score increases with each successful combination of tiles.
- **Game Over**: If there are no valid moves left (i.e., no empty cells or adjacent cells with the same value), the game ends.

## Implementation Details

- **Board Representation**: The game board is represented as a 4x4 matrix.
- **Movement**: Tile movement is implemented using functions to shift and combine tiles in each direction.
- **Random Tile Spawn**: After each move, a new tile with either value 2 or 4 spawns randomly on an empty cell.
- **Local Storage**: The highest score achieved is stored in the local storage for persistence across sessions.

Live Demo : (Coming soon!)

Enjoy playing the 2048 game!

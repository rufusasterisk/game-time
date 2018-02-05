# Toader

A Frogger remake on HTML5 Canvas.

Frogger (C) Atari 1981
Sprites provided by GARYCXJX@multiverseworks.com

## Project Info
  We made Toader as an exercise in HTML5 and practice working with JavaScript object and OOP fundamentals.
  The game code was written by Jen Woodson and Rufus Welsh. We pair-coded most of the core functionality of the game, learning what style of working together worked best. Some of the later visual changes were solo coded with GitHub reviews prior to merging.
  
  One of the more interesting problems we resolved was periodically refactoring to make our code more DRY and creating more objects to manage different parts of the game. Passing values between objects was challenging as the game grew more complex - creating object dependencies is tricky!
  
  The sprite animations in the game are controlled using a frame-based timer. Each time requestAnimationFrame tells an object to draw itself, the timer increments. At different frame times, the game displays different sprite objects.

## Initial Setup

#### Pre-installation
  Toader requires Node.js v6.11.0 or a compatible version. Node is available for free at https://nodejs.org/en/download/ or using a CLI like brew.
  Installation requires Git installed on the local machine. Grab it here! https://git-scm.com/downloads

#### 1. Clone the repository to the local machine
  Using a shell of your choice, navigate to the desired parent directory and run
  
  ```git clone https://github.com/rufusasterisk/game-time.git toader```

#### 2. Change into the `toader` directory

#### 3. Install required modules
  In the Toader directory run
  
  ```npm install```
  
  This installs all required dependencies for Toader

#### 4. Start the webserver
  Toader is hosted via webpack. Starting the server is easy! Enter the following command in the Toader directory
  
  ```npm start```

#### 5. Play Toader!
  The webpack server might open a browser tab with Toader running. If it doesn't, navigate to
  
  http://localhost:8080/

  Click Start Game to begin, press Reset Game at any time to start over.

  Use the arrow keys to move, Good Luck!

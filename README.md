# Jump
## Overview
Jump is inspired by the popular mobile game, Doodle Jump. 
## Technologies
Jump is built using HTML, Canvas, CSS, and JavaScript.
## Features
* Players Movement
  * Players can move left and right
  * Player screen wrap around
    - If they hit the left edge of the screen, the character shows up on the right side of the scren. 
    - If they hit the right edge of the screen, the character shows up on the left side of the screen.
* Platforms 
  * If the character lands on a platform, they will jump off the platform
* Camera Movement
  * The camera is constantly moving up so the player needs to jump on platforms. If the player is out of bounds, they will lose the game.
* Score
  * Everytime the player jumps on a platform, the player scores one point. Players cannot get points if they have already   jumped on the same platform before.

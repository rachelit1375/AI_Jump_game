import Platform from './platform';
import Character from './character';
export default class Game {

    constructor(){
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.platforms = [];
        this.character = new Character(this.canvas);
        this.score = 0;
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
            
    }

    draw() { 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.character.drawcharacter(this.ctx);
        this.drawPlatforms();
        this.drawScore();
        this.characterJump();

        this.character.characterMove();
       let anim = requestAnimationFrame(this.draw.bind(this));
        if (this.character.outOfRange()) {
            let playAgainButton = document.getElementById("play-again");
            let playAgainButtonContainer = document.getElementById("play-again-container");
            playAgainButton.classList.remove("removed");
            playAgainButtonContainer.classList.remove("removed");
            cancelAnimationFrame(anim);
        }
    }
   
    getRandomNum(start, end) { 
        return Math.floor(Math.random() * (end - start)) + start;
    }

    randomPlatforms() {
        let randomNum = this.getRandomNum(15, 20);
        for (let i = 0; i < randomNum; i++) {
            let randomX = this.getRandomNum(0, this.canvas.width);
            let randomY = this.getRandomNum(0, this.canvas.height);
            this.platforms[i] = new Platform(randomX, randomY);
        }
    }

    drawPlatforms() { 
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i]) {
                if (this.platforms[i].yCoord > this.canvas.height) {
                    this.platforms[i].yCoord = this.getRandomNum(-75, 0);
                    this.platforms[i].xCoord = this.getRandomNum(0, this.canvas.width);
                    this.platforms[i].used = 0;
                }
                if (this.platforms[i].used === 0) {
                    this.platforms[i].yCoord = this.platforms[i].yCoord + 2;

                    this.platforms[i].drawUnusedPlatform(this.platforms[i].xCoord, this.platforms[i].yCoord, this.ctx);
                } else if (this.platforms[i].used === 1) {
                    this.platforms[i].yCoord = this.platforms[i].yCoord + 2;

                    this.platforms[i].drawUsedPlatform(this.platforms[i].xCoord, this.platforms[i].yCoord, this.ctx);
                }
            }
        }
    }

    characterJump() {
        if (!this.character.jump) {
            this.collisionDetection();
            this.character.characterY += this.character.gravity
        } else if (this.character.jump && this.character.yVelocity >= 0) {
            this.character.characterY -= 3 * this.character.yVelocity;
            this.character.yVelocity -= .1;
        } else if (this.character.yVelocity <= 0) {
            this.character.jump = false;
            this.character.yVelocity = 3;
        }
    }


    drawScore(){
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: " + this.score, 8, 20);
    }

    collisionDetection() {
        for (let i = 0; i < this.platforms.length; i++) {
            let platform = this.platforms[i];
            let platformPoint1X = platform.xCoord;
            let platformPoint1Y = platform.yCoord;
            let platformPoint2X = platform.xCoord + 40;
            let platformPoint2Y = platform.yCoord;

            let characterPoint1X = this.character.characterX;
            let characterPoint1Y = this.character.characterY + this.character.characterHeight;
            let characterPoint2X = this.character.characterX + this.character.characterWidth;
            let characterPoint2Y = this.character.characterY + this.character.characterHeight;

            if ((characterPoint1X > platformPoint1X && characterPoint1X < platformPoint2X && characterPoint1Y > platformPoint1Y && characterPoint1Y < platformPoint1Y + 8) || (characterPoint2X > platformPoint1X && characterPoint2X < platformPoint2X && characterPoint2Y > platformPoint2Y && characterPoint2Y < platformPoint2Y + 8)) {
                if (this.platforms[i].used === 0) {
                    this.score++;
                }
                this.platforms[i].used = 1;
                this.character.jump = true;
            }
        }
    }
 
    keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight"){
            this.character.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft"){
            this.character.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight"){
            this.character.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft"){
            this.character.leftPressed = false;
        }
    }

}
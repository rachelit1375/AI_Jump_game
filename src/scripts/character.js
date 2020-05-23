export default class Character {

    constructor(canvas) {
        this.canvas = canvas;
        this.characterHeight = 20;
        this.characterWidth = 20;
        this.characterWidth = 20;
        this.characterX = (canvas.width - this.characterWidth) / 2;  //starts character at the center of the width of the canvas
        this.characterY = 0;
        this.rightPressed = false;
        this.leftPressed = false;
        this.jump = false;
        this.gravity = 8;
        this.yVelocity = 3;
    }

    // let platforms = [];
    // let jumped = 0;
    // let score = 0;


    // characterJump(){
    //     if (!this.jump) {
    //         this.collisionDetection();
    //         this.characterY += this.gravity
    //     } else if (this.jump && this.yVelocity >= 0) {
    //         this.characterY -= 4 * this.yVelocity;
    //         this.yVelocity -= .1;
    //         // jumped += 2 + gravity;
    //     } else if (this.yVelocity <= 0) {
    //         this.jump = false;
    //         // jumped = 0;
    //         this.yVelocity = 3;
    //     } 
    // }

    characterMove() {
        if (this.rightPressed) {
            this.characterX += 6;
            if (this.characterX + this.characterWidth > this.canvas.width) {
                characterX = 0;
            }
        } else if (this.leftPressed) {
            this.characterX -= 6;
            if (this.characterX + this.characterWidth < 0) {
                this.characterX = this.canvas.width - this.characterWidth;
            }
        }
    }

    outOfRange() {
        return this.characterY > this.canvas.height + this.characterHeight;
    }
    drawcharacter(ctx) {
        ctx.beginPath();
        ctx.rect(this.characterX, this.characterY, this.characterWidth, this.characterHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath;
    }

    // getRandomNum(start, end) {
    //     return Math.floor(Math.random() * (end - start)) + start;
    // }

    // collisionDetection() {
    //     for (let i = 0; i < platforms.length; i++) {
    //         let platform = platforms[i];
    //         let platformPoint1X = platform.x;
    //         let platformPoint1Y = platform.y;
    //         let platformPoint2X = platform.x + 40;
    //         let platformPoint2Y = platform.y;

    //         let characterPoint1X = characterX;
    //         let characterPoint1Y = characterY + characterHeight;
    //         let characterPoint2X = characterX + characterWidth;
    //         let characterPoint2Y = characterY + characterHeight;

    //         if ((characterPoint1X > platformPoint1X && characterPoint1X < platformPoint2X && characterPoint1Y > platformPoint1Y && characterPoint1Y < platformPoint1Y + 8) || (characterPoint2X > platformPoint1X && characterPoint2X < platformPoint2X && characterPoint2Y > platformPoint2Y && characterPoint2Y < platformPoint2Y + 8)) {
    //             if (platforms[i].used === 0) {
    //                 score++;
    //             }
    //             platforms[i].used = 1;
    //             jump = true;
    //         }
    //     }
    // }
    // document.addEventListener("keydown", keyDownHandler, false);
    // document.addEventListener("keyup", keyUpHandler, false);

    keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            this.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            this.leftPressed = false;
        }
    }

}
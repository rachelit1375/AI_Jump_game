export default class Character {

    constructor(canvas) {
        this.canvas = canvas;
        this.characterHeight = 45;
        this.characterWidth = 30;
        this.characterX = (canvas.width - this.characterWidth) / 2;  //starts character at the center of the width of the canvas
        this.characterY = 0; //starts character at the top of the screen
        this.rightPressed = false;
        this.leftPressed = false;
        this.jump = false;
        this.gravity = 9;
        this.yVelocity = 3;
        this.image = new Image();
        this.image.src = "src/images/p1_front.png";
    }

    characterMove() {
        if (this.rightPressed) {
            this.characterX =(this.characterX+ 6)%this.canvas.width;
            // if (this.characterX + this.characterWidth > this.canvas.width) {
            //     this.characterX = 0;
            // }
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
        // ctx.beginPath();
        // ctx.drawImage(this.characterX, this.characterY, this.characterWidth, this.characterHeight);
        // ctx.fillStyle = "#0095DD";
        // ctx.fill();
        // ctx.closePath;
        ctx.drawImage(this.image, this.characterX, this.characterY, this.characterWidth, this.characterHeight);
    }


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
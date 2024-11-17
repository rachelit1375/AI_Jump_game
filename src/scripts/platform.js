export default class Platform {
    constructor(x, y){
        this.xCoord = x;
        this.yCoord = y;
        this.platformWidth = 45;
        this.platformHeight = 25;
        this.used = 0;
        this.image = new Image();
        this.image.src = 'src/images/brown platform merged transparent.png';
    }

    drawUsedPlatform(x, y, ctx){ 
        // ctx.beginPath();
        // ctx.rect(x, y, this.platformWidth, this.platformHeight);
        // ctx.fillStyle = "red";
        // ctx.fill();
        // ctx.closePath;
        ctx.drawImage(this.image, x, y, this.platformWidth, this.platformHeight);

    }


}
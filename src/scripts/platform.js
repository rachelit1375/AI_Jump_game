export default class Platform {
    constructor(x, y){
        this.xCoord = x;
        this.yCoord = y;
        this.platformWidth = 40;
        this.platformHeight = 8;
        this.used = 0; 
    }


    drawUnusedPlatform(x, y, ctx){
        ctx.beginPath();
        ctx.rect(x, y, 40, 8);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath;
    }

    drawUsedPlatform(x, y, ctx){ 
        ctx.beginPath();
        ctx.rect(x, y, 40, 8);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath;
    }


}
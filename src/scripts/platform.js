export default class Platform {
    constructor(x, y){
        this.xCoord = x;
        this.yCoord = y;
        this.platformWidth = 40;
        this.platformHeight = 8;
        this.used = 0; 
    }


 

    drawPlatforms(ctx) { //game function
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.platforms[i]) {
                if (this.platforms[i].yCoord > this.canvas.height) {
                    this.platforms[i].yCoord = getRandomNum(-75, 0);
                    this.platforms[i].xCoord = getRandomNum(0, this.canvas.width);
                    this.platforms[i].used = 0;
                }
                if (this.platforms[i].used === 0) {
                    this.platforms[i].yCoord = this.platforms[i].yCoord + 2;

                    platforms[i].drawUnusedPlatform(this.platforms[i].xCoord, this.platforms[i].yCoord);
                } else if (this.platforms[i].used === 1) {
                    this.platforms[i].yCoord = this.platforms[i].yCoord + 2;
                  
                    platforms[i].drawUsedPlatform(this.platforms[i].xCoord, this.platforms[i].yCoord);
                }
            }
        }
    }

    drawUnusedPlatform(x, y, ctx){ //platform function
        ctx.beginPath();
        ctx.rect(x, y, 40, 8);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath;
    }

    drawUsedPlatform(x, y, ctx){ //platform function
        ctx.beginPath();
        ctx.rect(x, y, 40, 8);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath;
    }


}
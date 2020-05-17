import "./styles/index.scss";
// import canvasExample from "./scripts/canvas";
// import platform from "./scripts/platform";

window.addEventListener("DOMContentLoaded", main);

function main() {
   var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");

            var characterHeight = 20;
            var characterWidth = 20;
            var characterX = (canvas.width - characterWidth) / 2; //starts character at the center of the width of the canvas
            var characterY = (canvas.height - characterHeight) / 2;
            var rightPressed = false;
            var leftPressed = false;
            let platforms = [];
            let jump = false;
            let jumped = 0;

            let score = 0;

            function draw (){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                drawcharacter();
                drawPlatforms();
                drawScore();
                // collisionDetection();

                if(!jump) {
                    collisionDetection();
                    characterY += 6.2;
                } else if (jump && jumped < 200) {
                    characterY -= 6;
                    jumped += 6;
                } else if (jumped >= 200){
                    jump = false;
                    jumped = 0;
                }
                
                if (characterY > canvas.height + characterHeight) {
                    // alert("GAME OVER");
                    // document.location.reload();
                    // clearInterval(interval);

                }
                if(rightPressed) {
                    characterX += 6;
                    if (characterX + characterWidth > canvas.width){
                        characterX = 0;
                    }
                } else if (leftPressed) {
                    characterX -= 6;
                    if (characterX + characterWidth < 0){
                        characterX = canvas.width - characterWidth;
                    }
                }
                // characterY += 3; //gravity
                requestAnimationFrame(draw);
            }  

            function drawcharacter() {
                ctx.beginPath();
                ctx.rect(characterX, characterY, characterWidth, characterHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath;
            }

            function getRandomNum(start, end) {
                return Math.floor(Math.random() * (end - start)) + start;
            }

            function randomPlatforms() {
                let randomNum = getRandomNum(15, 20);
                for(let i = 0; i < randomNum; i++) {
                    let randomX = getRandomNum(0, canvas.width);
                    let randomY = getRandomNum(0, canvas.height);
                    platforms[i] = { x: randomX, y: randomY, status: 1, used: 0};
                }
            }

            function drawPlatforms() {
                for(let i = 0; i < platforms.length; i++){
                    if(platforms[i]){
                        if(platforms[i].used === 0) {
                            ctx.beginPath();
                            ctx.rect(platforms[i].x, platforms[i].y, 40, 8);
                            ctx.fillStyle = "green";
                            ctx.fill();
                            ctx.closePath;
                        } else if (platforms[i].used === 1) {
                            ctx.beginPath();
                            ctx.rect(platforms[i].x, platforms[i].y, 40, 8);
                            ctx.fillStyle = "red";
                            ctx.fill();
                            ctx.closePath;
                        }
                    }
                }
            }

            function drawScore(){
                ctx.font = "16px Arial";
                ctx.fillStyle = "black";
                ctx.fillText("Score: " + score, 8, 20);
            }

            function collisionDetection() {
                for(let i = 0; i < platforms.length; i++){
                    let platform = platforms[i];
                    let platformPoint1X = platform.x;
                    let platformPoint1Y = platform.y;
                    let platformPoint2X = platform.x + 40;
                    let platformPoint2Y = platform.y;

                    let characterPoint1X = characterX;
                    let characterPoint1Y = characterY + characterHeight;
                    let characterPoint2X = characterX + characterWidth;
                    let characterPoint2Y = characterY + characterHeight;

                    if((characterPoint1X > platformPoint1X && characterPoint1X < platformPoint2X && characterPoint1Y > platformPoint1Y && characterPoint1Y < platformPoint1Y + 8) || (characterPoint2X > platformPoint1X && characterPoint2X < platformPoint2X && characterPoint2Y > platformPoint2Y && characterPoint2Y < platformPoint2Y + 8)) {
                        if(platforms[i].used === 0) {
                            score++;
                        }
                        platforms[i].used = 1;
                        jump = true;
                    }
                }
            }
            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);

            function keyDownHandler(e) {
                if(e.key == "Right" || e.key == "ArrowRight"){
                    rightPressed = true;
                } else if (e.key == "Left" || e.key == "ArrowLeft"){
                    leftPressed = true;
                }
            }

            function keyUpHandler(e) {
                if(e.key == "Right" || e.key == "ArrowRight"){
                    rightPressed = false;
                } else if (e.key == "Left" || e.key == "ArrowLeft"){
                    leftPressed = false;
                }
            }

            draw();
         randomPlatforms();
}

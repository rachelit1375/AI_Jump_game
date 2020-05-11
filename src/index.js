import "./styles/index.scss";
import canvasExample from "./scripts/canvas";

window.addEventListener("DOMContentLoaded", main);

function main() {
   var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");

            var characterHeight = 25;
            var characterWidth = 25;
            var characterX = (canvas.width - characterWidth) / 2; //starts character at the center of the width of the canvas
            var characterY = (canvas.height - characterHeight) / 2;
            var rightPressed = false;
            var leftPressed = false;
            
            function draw (){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                drawcharacter();
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
            
            }  

            function drawcharacter() {
                ctx.beginPath();
                ctx.rect(characterX, characterY, characterWidth, characterHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath;
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
            setInterval(draw, 10)
}

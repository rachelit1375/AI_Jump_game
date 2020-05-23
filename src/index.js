import "./styles/index.scss";
// import canvasExample from "./scripts/canvas";
// import platform from "./scripts/platform";
import Game from './scripts/game';

window.addEventListener("DOMContentLoaded", main);

function main() {
//    var canvas = document.getElementById("myCanvas");
//             var ctx = canvas.getContext("2d");

//             var characterHeight = 20;
//             var characterWidth = 20;
//             var characterX = (canvas.width - characterWidth) / 2; //starts character at the center of the width of the canvas
//             var characterY = 0;
//             var rightPressed = false;
//             var leftPressed = false;
//             let platforms = [];
//             let jump = false;
//             let jumped = 0;
//             let gravity = 8;
//             let score = 0;
//             let yVelocity = 3;
//             function draw (){
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
            
//                 drawcharacter();
//                 drawPlatforms();
//                 drawScore();
//                 // collisionDetection();

//                 if(!jump) {
//                     collisionDetection();
//                     characterY += gravity
//                 } else if (jump && yVelocity >= 0) {
//                     characterY -= 4 * yVelocity;
//                     yVelocity -= .1;
//                     // jumped += 2 + gravity;
//                 } else if (yVelocity <= 0){
//                     jump = false;
//                     // jumped = 0;
//                     yVelocity = 3;
//                 }
                
//                 if (characterY > canvas.height + characterHeight) {
//                     alert("GAME OVER");
//                     document.location.reload();
//                     clearInterval(interval);

//                 }
//                 if(rightPressed) {
//                     characterX += 6;
//                     if (characterX + characterWidth > canvas.width){
//                         characterX = 0;
//                     }
//                 } else if (leftPressed) {
//                     characterX -= 6;
//                     if (characterX + characterWidth < 0){
//                         characterX = canvas.width - characterWidth;
//                     }
//                 }
//                 // characterY += 3; //gravity
//                 requestAnimationFrame(draw);
//             }  

//             function drawcharacter() {
//                 ctx.beginPath();
//                 ctx.rect(characterX, characterY, characterWidth, characterHeight);
//                 ctx.fillStyle = "#0095DD";
//                 ctx.fill();
//                 ctx.closePath;
//             }

//             function getRandomNum(start, end) {
//                 return Math.floor(Math.random() * (end - start)) + start;
//             }

//             function randomPlatforms() {
//                 let randomNum = getRandomNum(10, 15);
//                 for(let i = 0; i < randomNum; i++) {
//                     let randomX = getRandomNum(0, canvas.width);
//                     let randomY = getRandomNum(0, canvas.height);
//                     platforms[i] = { x: randomX, y: randomY, status: 1, used: 0};
//                 }
//             }

//             function drawPlatforms() {
//                 for(let i = 0; i < platforms.length; i++){
//                     if(platforms[i]){
//                         if(platforms[i].y > canvas.height) {
//                             platforms[i].y = getRandomNum(-75, 0);
//                             platforms[i].x = getRandomNum(0, canvas.width);
//                             platforms[i].used = 0;
//                         }
//                         if(platforms[i].used === 0) {
//                             platforms[i].y = platforms[i].y + 2;
//                             ctx.beginPath();
//                             ctx.rect(platforms[i].x, platforms[i].y, 40, 8);
//                             ctx.fillStyle = "green";
//                             ctx.fill();
//                             ctx.closePath;
//                         } else if (platforms[i].used === 1) {
//                             platforms[i].y = platforms[i].y + 2;
//                             ctx.beginPath();
//                             ctx.rect(platforms[i].x, platforms[i].y, 40, 8);
//                             ctx.fillStyle = "red";
//                             ctx.fill();
//                             ctx.closePath;
//                         }
//                     }
//                 }
//             }

//             function drawScore(){
//                 ctx.font = "16px Arial";
//                 ctx.fillStyle = "black";
//                 ctx.fillText("Score: " + score, 8, 20);
//             }

//             function collisionDetection() {
//                 for(let i = 0; i < platforms.length; i++){
//                     let platform = platforms[i];
//                     let platformPoint1X = platform.x;
//                     let platformPoint1Y = platform.y;
//                     let platformPoint2X = platform.x + 40;
//                     let platformPoint2Y = platform.y;

//                     let characterPoint1X = characterX;
//                     let characterPoint1Y = characterY + characterHeight;
//                     let characterPoint2X = characterX + characterWidth;
//                     let characterPoint2Y = characterY + characterHeight;

//                     if((characterPoint1X > platformPoint1X && characterPoint1X < platformPoint2X && characterPoint1Y > platformPoint1Y && characterPoint1Y < platformPoint1Y + 8) || (characterPoint2X > platformPoint1X && characterPoint2X < platformPoint2X && characterPoint2Y > platformPoint2Y && characterPoint2Y < platformPoint2Y + 8)) {
//                         if(platforms[i].used === 0) {
//                             score++;
//                         }
//                         platforms[i].used = 1;
//                         jump = true;
//                     }
//                 }
//             }

    //     let game = new Game();
    //     window.addEventListener("keydown", game.keyDownHandler, false);
    //    window.addEventListener("keyup", game.keyUpHandler, false);
    //     game.draw();
    //     game.randomPlatforms();

    let playButton = document.getElementById("play");
    let playAgainButton = document.getElementById("play-again");
    playAgainButton.classList.add("removed");

    playButton.addEventListener("click", () => {
        play();
        playButton.classList.add("removed");
    });

    playAgainButton.addEventListener("click", () => {
        play();
        playAgainButton.classList.add("removed");
    });

//             function keyDownHandler(e) {
//                 if(e.key == "Right" || e.key == "ArrowRight"){
//                     rightPressed = true;
//                 } else if (e.key == "Left" || e.key == "ArrowLeft"){
//                     leftPressed = true;
//                 }
//             }

//             function keyUpHandler(e) {
//                 if(e.key == "Right" || e.key == "ArrowRight"){
//                     rightPressed = false;
//                 } else if (e.key == "Left" || e.key == "ArrowLeft"){
//                     leftPressed = false;
//                 }
//             }

//         draw();
//          randomPlatforms();
}

function play() {
    let game = new Game();
    game.draw();
    window.addEventListener("keydown", game.keyDownHandler, false);
    window.addEventListener("keyup", game.keyUpHandler, false);
    game.randomPlatforms();
}
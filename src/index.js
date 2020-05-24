import "./styles/index.scss";
import Game from './scripts/game';

window.addEventListener("DOMContentLoaded", main);

function main() {

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


}

function play() {
    let game = new Game();
    game.draw();
    window.addEventListener("keydown", game.keyDownHandler, false);
    window.addEventListener("keyup", game.keyUpHandler, false);
    game.randomPlatforms();
}
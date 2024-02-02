//    Connects the player and ability to move it, 
// and the buttons an it's functionality-

window.onload = function() {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");

    startButton.addEventListener("click", function(){
        startGame();
    })

    restartButton.addEventListener("click", function(){
        location.reload();
    })

    // Load the highest score from localStorage when the page is loaded
    document.addEventListener('DOMContentLoaded', () => {
    let theHighestScore = localStorage.getItem("highestScore") || 0;

    // Display the highest score on the starting screen
    document.getElementById("hs").innerHTML = `Highest Score: ${theHighestScore}`;
    });

    console.log(localStorage.getItem("highestScore"))

    function  startGame(){
        game = new Game();
        game.start();
    };


    function handleKeyDown(event){
        const key = event.key;
        const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", ' ', 'w', 'a', 's', 'd'];

        if (possibleKeys.includes(key)){
            event.preventDefault();
            if(game){
                switch (key){
                    case "ArrowLeft":
                    case "a":
                        game.player.directionX = -10;
                        break;
                    case "ArrowRight":
                    case "d":
                        game.player.directionX = 7;
                        break;
                    case "ArrowUp":
                    case "w":
                        game.player.directionY = -7;
                        break;
                    case "ArrowDown":
                    case "s":
                        game.player.directionY = 7;
                        break;
                    case ' ':
                        game.isShooting = true;
                        break;
                }
            }
        }
    }

    function handleKeyUp(event){
        const key = event.key;
        const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", ' ', 'w', 'a', 's', 'd'];

        if (possibleKeys.includes(key)){
            event.preventDefault();
            if(game){
                switch (key){
                    case "ArrowLeft":
                    case "a":
                        game.player.directionX = 0;
                        break;
                    case "ArrowRight":
                    case "d":
                        game.player.directionX = 0;
                        break;
                    case "ArrowUp":
                        case "w":
                        game.player.directionY = 0;
                        break;
                    case "ArrowDown":
                    case "s":
                        game.player.directionY = 0;
                        break;
                    case ' ':
                        game.isShooting = false;
                        break;
                }
            }
        }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
}
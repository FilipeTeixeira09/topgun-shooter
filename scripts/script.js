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

    function  startGame(){
        game = new Game();
        game.start();
    };

    function handleKeyDown(event){
        const key = event.key;
        const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];

        if (possibleKeys.includes(key)){
            event.preventDefault();
            if(game){
                switch (key){
                    case "ArrowLeft":
                        game.player.directionX = -7;
                        break;
                    case "ArrowRight":
                        game.player.directionX = 7;
                        break;
                    case "ArrowUp":
                        game.player.directionY = -7;
                        break;
                    case "ArrowDown":
                        game.player.directionY = 7;
                        break;
                    case " ":
                        game.player.shoot();
                        break;
                }
            }
        }
    }

    function handleKeyUp(event){
        const key = event.key;
        const possibleKeys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];

        if (possibleKeys.includes(key)){
            event.preventDefault();
            if(game){
                switch (key){
                    case "ArrowLeft":
                        game.player.directionX = 0;
                        break;
                    case "ArrowRight":
                        game.player.directionX = 0;
                        break;
                    case "ArrowUp":
                        game.player.directionY = 0;
                        break;
                    case "ArrowDown":
                        game.player.directionY = 0;
                        break;
                    case " ":
                        break;
                }
            }
        }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
}
class Game{
    constructor(){
        this.startScreen = document.getElementById("game-intro");
        this.gameScreen = document.getElementById("game-container");
        this.gameOver = document.getElementById("game-over");

        // Game Board Sizing - Horizontal
        this.height = 600;
        this.width = 1000;

        // Player
        this.player = new Player(this.gameScreen,
            200,
            500,
            150,
            100,
            "/images/player.png")

        // Enemies 1
        this.enemies1 = [];

        // Enemies 2
    
        // Score
        this.score = 0;

        // Lifes
        this.lifes = 5;

        // Variable to check if we're in the process of creating a new enemy
        this.isPushingEnemy = false;

        // Check if game is over
        this.gameIsOver = false;
    }

    start(){
        // Setting the dimentions of the game
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`

        // Once we start the game, change screens from initial to the game screen
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "block";

        // Create the loop that makes the game work
        this.gameLoop();
    }

    gameLoop(){
        if(this.gameIsOver === true){
            return;
        }
        this.update();
        // Creates the loop as many times as the heartz on the monitor allows us to.
        window.requestAnimationFrame(() => this.gameLoop());
    }

    update(){
        let score = document.getElementById("score");
        let lifes = document.getElementById("lifes");

        this.player.move();

        for(let i = 0; i<this.enemies1.length; i++){
            const enemyOne = this.enemies1[i];
            enemyOne.move();

            if(this.player.didCollide(enemyOne)){
                enemyOne.element.remove();
                this.enemies1.splice(i, 1);

                this.lifes --;
            
            // Points are obtanined trough the destruction of enemies 1

            /* } else if(enemyOne.left <=0){
                this.score ++;
                enemyOne.element.remove();
                this.enemies1.splice(i, 1)
            } */
        }

        if(this.lifes === 0) {
            this.endGame();
        } 
        else if (!this.enemies1.length && !this.isPushingEnemy){
            this.isPushingEnemy = true; // Makes that only appears one obstacle at a time
            setTimeout(()=>{
                this.enemies1.push(new EnemyOne(this.gameScreen));
                this.isPushingEnemy = false;
            }, 500)
        }

        score.innerHTML = this.score;
        lifes.innerHTML = this.lifes;
    }

    endGame(){
        this.gameIsOver = true;
        this.player.element.remove();
        this.enemies1.forEach((enemy, index) =>{
            this.enemies1.splice(index, 1);
            enemy.element.remove();
        })

        this.gameScreen.style.display = "none";
        this.gameOver.style.display = "block"
    }

}
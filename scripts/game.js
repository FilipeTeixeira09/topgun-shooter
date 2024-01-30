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
        this.enemies2 = [];
    
        // Score
        this.score = 0;

        // Lifes
        this.lifes = 5;

        // Variable to check if we're in the process of creating a new enemy 1
        this.isPushingEnemy = false;

        // Variable to check if we're in the process of moving the enemy 2
        this.enemyTwoIsMoving = false;


        // Check if game is over
        this.gameIsOver = false;

        // Check if bullets are being pushed
        this.isPushingBullet = false;
        this.isShooting = false;

        this.bullets = [];
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
        this.updateEnemies2()
        // Creates the loop as many times as the heartz on the monitor allows us to.
        window.requestAnimationFrame(() => this.gameLoop());
    }

    update(){
        let score = document.getElementById("score");
        let lifes = document.getElementById("lifes");

        this.player.move();

        // Here we define the fireRate and the position and properties of the bullets
        if(this.isShooting & !this.isPushingBullet){
            this.isPushingBullet = true;
            setTimeout(() => {
                let bullet = new Bullet(
                  this.gameScreen,
                  this.player.left + this.player.width,
                  this.player.top + this.player.height / 2,
                  30,
                  10,
                  "/images/bullet.png"
                );
    
                this.bullets.push(bullet);
                this.isPushingBullet = false;
            }, 300);
          }

        // Here we define the conditions of HIT for the bullets
        if(this.bullets){
        this.bullets.forEach((bullet, bulletIndex)=>{
            bullet.shoot();

            this.enemies1.forEach((enemy, obstacleIndex)=>{
            if(bullet.didCollide(enemy)){
                this.score += 1;

                // Remove the obstacle element from the DOM
                enemy.element.remove();

                // Remove obstacle object from the array
                this.enemies1.splice(obstacleIndex, 1);

                // Remove the bullet element from the DOM
                bullet.element.remove();

                // Remove bullet object from the array
                this.bullets.splice(bulletIndex, 1);
            }})
            })
        }

        // Enemies 1 conditions
        for(let i = 0; i<this.enemies1.length; i++){
            const enemyOne = this.enemies1[i];
            enemyOne.move();

            if(this.player.didCollide(enemyOne)){
                enemyOne.element.remove();
                this.enemies1.splice(i, 1);

                this.lifes --;
            } 
            else if(enemyOne.left <= - enemyOne.width){
                enemyOne.element.remove();
                this.enemies1.splice(i, 1)
            }
        }

        // Enemies 2 conditions




        // Endgame Condition
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
/*         for (let i=0; i<this.enemies2.length; i++){
            this.enemies2.push(new EnemyTwo)
        } */
        


    }

    updateEnemies2(){
        let score = document.getElementById("score");
        let lifes = document.getElementById("lifes");

        this.player.move();
                // Enemies 2 conditions
                for(let i = 0; i<this.enemies2.length; i++){
                    const enemyTwo = this.enemies1[i];
                    enemyTwo.moveIntro();
                }
    
                // Endgame Condition
                if(this.lifes === 0) {
                    this.endGame();
                } 
                else if (!this.enemies2.length && !this.enemyTwoIsMoving){
                    this.enemyTwoIsMoving = true; // Makes that only appears one obstacle at a time

                        this.enemies2.push(new EnemyTwo(this.gameScreen, 250));
                        this.enemyTwoIsMoving = false;
                }
            }

/*             setTimeout(() =>{ */
/*                 this.enemyTwoIsMoving = true; */
/*                 const enemy2 = new EnemyTwo(this.gameScreen, 250);
                this.enemies2.push(enemy2); 
            },3000); */
/*             setTimeout(() =>{
                this.enemyTwoIsMoving = true;
                this.enemies2.push(new EnemyTwo(this.gameScreen, 100));
            },6000); */
/*             setTimeout(() =>{
                this.enemyTwoIsMoving = true;
                this.enemies2.push(new EnemyTwo(this.gameScreen, 400));
            },9000); */

    endGame(){
        this.gameIsOver = true;
        this.player.element.remove();
        this.enemies1.forEach((enemy, index) =>{
            this.enemies1.splice(index, 1);
            enemy.element.remove();
        })

        this.gameScreen.style.display = "none";
        this.gameOver.style.display = "block";
    }
    }

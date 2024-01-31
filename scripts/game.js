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

        this.guidedBulletsCenter = [];
        this.guidedBulletsLeft = [];
        this.guidedBulletsRight = [];

        //Sounds - soundtrack
        this.soundtrack = document.getElementById('soundtrack');
        this.soundtrack.play();

       
        this.ripSoundtrack = null;
        
        // SFX
        this.bulletSound = document.getElementById('bullet-sound');
        this.missile = document.getElementById('missile');
        this.lastLifeBoom = document.getElementById('last-life-boom');
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

        // Here we define the conditions of HIT or miss for the bullets
        if(this.bullets){
            this.bullets.forEach((bullet, bulletIndex)=>{
                this.bulletSound.play();
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
                    }
                    else{
                        if(bullet.left > this.gameScreen.offsetWidth){
                            bullet.element.remove();
                            this.bullets.splice(bulletIndex, 1);
                        }
                    }
                })
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
            } else if(enemyOne.left <= - enemyOne.width){
                enemyOne.element.remove();
                this.enemies1.splice(i, 1)
            }
        }
         
        // Enemies 2 conditions
        if (!this.enemies2.length) {
            this.enemies2.push(new EnemyTwo(this.gameScreen, 250, -580));
            this.enemies2.push(new EnemyTwo(this.gameScreen, 70, -1180));
            this.enemies2.push(new EnemyTwo(this.gameScreen, 430, -1780));
            }
        
        // Shooting from the 1st aircraft to arrive
         setTimeout(()=>{
                if(this.guidedBulletsCenter.length === 0){
                    let guidedBullet1 = new GuidedBullet(
                        this.gameScreen,
                        170,
                        295,
                        50,
                        25,
                        "/images/rocket.png"
                    )
                    this.guidedBulletsCenter.push(guidedBullet1);
                }

                this.guidedBulletsCenter.forEach((bullet, index)=>{
                    if(bullet.left > this.width){
                        bullet.element.remove();
                        this.guidedBulletsCenter.splice(index, 1)
                    }
                    bullet.shoot();
                });
        }, 11000);

        // Shooting from the 2nd aircraft to arrive
        setTimeout(()=>{
            if(this.guidedBulletsLeft.length === 0){
                let guidedBullet2 = new GuidedBullet(
                    this.gameScreen,
                    170,
                    115,
                    50,
                    25,
                    "/images/rocket.png"
                )
                this.guidedBulletsLeft.push(guidedBullet2);
            }
            
            this.guidedBulletsLeft.forEach((bullet, index)=>{
                if(bullet.left > this.width){
                    bullet.element.remove();
                    this.guidedBulletsLeft.splice(index, 1)
                }
                bullet.shoot();
 
            });
        }, 22000)

        setTimeout(()=>{
            if(this.guidedBulletsRight.length === 0){
                let guidedBullet3 = new GuidedBullet(
                    this.gameScreen,
                    170,
                    475,
                    50,
                    25,
                    "/images/rocket.png"
                )
                this.guidedBulletsRight.push(guidedBullet3);
            }

                this.guidedBulletsRight.forEach((bullet, index)=>{
                    if(bullet.left > this.width){
                        bullet.element.remove();
                        this.guidedBulletsRight.splice(index, 1)
                    }
                    bullet.shoot();

                })
        }, 33000); 

        if(this.guidedBulletsCenter){
            this.guidedBulletsCenter.forEach((bullet, bulletIndex)=>{

                if(bullet.didCollide(this.player)){
                    this.lifes --;

                    // Remove the obstacle element from the DOM
                    bullet.element.remove();

                    // Remove obstacle object from the array
                    this.guidedBulletsCenter.splice(bulletIndex, 1);
                }
                else{
                    if(bullet.left > this.gameScreen.offsetWidth){
                        bullet.element.remove();
                        this.guidedBulletsCenter.splice(bulletIndex, 1);
                    }
                }
            })
        };

        if(this.guidedBulletsLeft){
            this.guidedBulletsLeft.forEach((bullet, bulletIndex)=>{

                if(bullet.didCollide(this.player)){
                    this.lifes --;

                    // Remove the obstacle element from the DOM
                    bullet.element.remove();

                    // Remove obstacle object from the array
                    this.guidedBulletsLeft.splice(bulletIndex, 1);
                }
                else{
                    if(bullet.left > this.gameScreen.offsetWidth){
                        bullet.element.remove();
                        this.guidedBulletsLeft.splice(bulletIndex, 1);
                    }
                }
            })
        };

        if(this.guidedBulletsRight){
            this.guidedBulletsRight.forEach((bullet, bulletIndex)=>{

                if(bullet.didCollide(this.player)){
                    this.lifes --;

                    // Remove the obstacle element from the DOM
                    bullet.element.remove();

                    // Remove obstacle object from the array
                    this.guidedBulletsRight.splice(bulletIndex, 1);
                }
                else{
                    if(bullet.left > this.gameScreen.offsetWidth){
                        bullet.element.remove();
                        this.guidedBulletsRight.splice(bulletIndex, 1);
                    }
                }
            })
        };

        // Endgame Condition
        if(this.lifes <= 0) {
            this.endGame();
        }
        // Enemies 1 conditions
        else if (!this.enemies1.length && !this.isPushingEnemy){
            this.isPushingEnemy = true; // Makes that only appears one obstacle at a time
            setTimeout(()=>{
                this.enemies1.push(new EnemyOne(this.gameScreen));
                this.isPushingEnemy = false;
            }, 100)
        }
        
        score.innerHTML = this.score;
        lifes.innerHTML = this.lifes;  
    }

    updateEnemies2(){
        let score = document.getElementById("score");
        let lifes = document.getElementById("lifes");

        // Endgame Condition
        if (this.lifes <= 0) {
            this.endGame();
        }

        for(let i = 0; i<this.enemies2.length; i++){
            const enemyTwo = this.enemies2[i];
            enemyTwo.moveIntro();

            if(enemyTwo.left >= 20){
                enemyTwo.left = 20;
            }
        }
        
        score.innerHTML = this.score;
        lifes.innerHTML = this.lifes;
    }


    endGame(){
        let finalScore = document.getElementById("final-score");

        this.gameIsOver = true;
        this.player.element.remove();
        this.enemies1.forEach((enemy, index) =>{
            this.enemies1.splice(index, 1);
            enemy.element.remove();
        })

        this.ripSoundtrack = document.getElementById('ripSoundtrack');
        this.soundtrack.pause();
        this.ripSoundtrack.play();
        this.lastLifeBoom.play();

        this.gameScreen.style.display = "none";
        this.gameOver.style.display = "block";

        finalScore.innerHTML = `Your Score: ${this.score}`;
    }
}

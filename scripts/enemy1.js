class EnemyOne {
    constructor(gameScreen){
        this.gameScreen = gameScreen;

        this.left = 1000;
        this.top = Math.floor(Math.random()*450+50);

        this.width = 150;
        this.height = 100;

        this.element = document.createElement("img");
        this.element.src = 'images/enemy.png';
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move(){
        // Move Obstacle down
        this.left -= 5;
        this.updatePosition();
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
}
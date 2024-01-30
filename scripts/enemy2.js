class EnemyTwo {
    constructor(gameScreen, top){
        this.gameScreen = gameScreen;

        this.left = 0;
        this.top = top;

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
    
    moveIntro(){
        this.left = +10;
        this.updatePosition();
    };

    updatePosition(){
        this.element.style.left = `${this.left}px`;
    };
}
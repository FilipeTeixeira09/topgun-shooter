class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        // gameScreen HTML element
        this.gameScreen = gameScreen;

        // Position Values
        this.left = left;
        this.top = top;

        // Player Dimension Values
        this.width = width;
        this.height = height;

        this.element = document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.directionX = 0;
        this.directionY = 0;
        this.gameScreen.appendChild(this.element);
    }

    move(){
        this.left += this.directionX;
        this.top += this.directionY;

        //sides
        // blocks right movement
        if (this.left + this.width > this.gameScreen.offsetWidth - 100){
            this.left = this.gameScreen.offsetWidth - this.width - 100;
        }

        // blocks left movement
        else if (this.left <= 200) {
            this.left = 200;
        }

        //top n bottom
        if (this.top + this.height > this.gameScreen.offsetHeight - 20) {
            this.top = this.gameScreen.offsetHeight - this.height - 20;
        }
        else if (this.top <= 20) {
            this.top = 20;
        }

        this.updatePosition()
    }

    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    didCollide(enemy) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = enemy.element.getBoundingClientRect();
        // If part of my blueCar is inside the redCar, then I have a collision.
        if (
            playerRect.left < obstacleRect.right &&
            playerRect.right - 50 > obstacleRect.left &&
            playerRect.top + 10 < obstacleRect.bottom &&
            playerRect.bottom - 10> obstacleRect.top
        ) {
            return true;
        } else {
            return false;
        }
    }
}
export default class Ball {
    /**
     * @param {number} x - X position to spawn a ball 
     * @param {number} y - y positiioon to spawn a bal
     * @param {number} r - radius of the ball
     * @param {number} dy - factor by which speed is to be increased in vertical direction
     * @param {number} dx - factor by which speed is to be increased in horizontal direction
     * @param {number} speed - default speed by which ball should move
     * @param {string} color - default speed by which ball should move
     * @param {HTMLElement} parent - Parent to which ball is to be aded default = body
     */
    constructor(x = 0, y = 0, r = 20, dy = 1, dx = 1, speed = 5, color = "#f00", parent = document.body) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dy = dy;
        this.dx = dx;
        this.speed = speed;
        this.element = document.createElement('div');
        this.color = color;
        this.parent = parent;
        this.initBall();
    }

    /**
     * Initializes a ball and attach to parent element
     */
    initBall() {
        this.element.style.width = `${this.r * 2}px`;
        this.element.style.height = `${this.r * 2}px`;
        this.element.style.borderRadius = `50%`;
        this.element.style.background = this.color;
        this.element.style.position = `absolute`;
        this.parent.appendChild(this.element);
        this.drawBall();
    }

    /**
     * Draw the ball the specified coordinate inside a
     * the parent element
     */
    drawBall() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    /**
     * Moves the ball by in a direction and detects
     * the collision with the walls of the parent
     */
    moveBall() {
        if (this.y > this.parent.clientHeight - this.element.clientHeight || this.y < 0) {
            this.dy *= -1;
        }
        if (this.x > this.parent.clientWidth - this.element.clientWidth || this.x < 0) {
            this.dx *= -1;
        }

        this.y += this.speed * this.dy;
        this.x += this.speed * this.dx;
        this.drawBall();
    }

    /**
     * Returns true if the balls are colliding, false otherwise
     * and changes the direction of ball
     * @param {Ball} ball - Ball to check collision with
     * @returns {boolean}
     */
    isCollidingWith(ball) {
        const x_distance = Math.floor(this.x - ball.x);
        const y_distance = Math.floor(this.y - ball.y);
        const sq_of_distances = x_distance * x_distance + y_distance * y_distance;
        const sum_of_radius = this.r + ball.r;

        if (sq_of_distances < sum_of_radius * sum_of_radius) {
            console.log("Before collision", this, ball)
            let tmp = this.dx;
            let tmp_2 = this.dy;
            this.dx = ball.dx;
            this.dy = ball.dy;
            ball.dx = tmp;
            ball.dy = tmp_2;
            console.log("After collision", this, ball)
            return true
        }

        return false;
    }
}
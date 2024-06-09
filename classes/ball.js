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
    constructor(x = 0, y = 0, r = 20, dy = 1, dx = 1, speed = 5, color = "#f00", parent = document.body, id = null) {
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
        this.id = id;
        this.mass = this.r * 1.08;
    }


    /**
     * Initializes a ball and attach to parent element
     */
    initBall() {
        this.element.style.width = `${this.r * 2}px`;
        this.element.style.height = `${this.r * 2}px`;
        this.element.classList.add('ball');
        this.element.style.borderRadius = "50%";
        this.element.style.background = this.color;
        this.parent.appendChild(this.element);
    }

    /**
     * Draw the ball the specified coordinate inside a
     * the parent element
     */
    drawBall() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    /**
     * Moves the ball by in a direction and detects
     * the collision with the walls of the parent
     */
    moveBall() {
        if (this.y > this.parent.clientHeight - this.element.clientHeight - 2 || this.y < 0) {
            this.dy *= -1;
        }
        if (this.x > this.parent.clientWidth - this.element.clientWidth - 2 || this.x < 0) {
            this.dx *= -1;
        }

        if (this.y < 0) {
            this.y = 0
        } else if (this.y > this.parent.clientHeight - this.element.clientHeight - 2) {
            this.y = this.parent.clientHeight - this.element.clientHeight - 2;
        }
        if (this.x < 0) {
            this.x = 0
        } else if (this.x > this.parent.clientWidth - this.element.clientWidth - 2) {
            this.x = this.parent.clientWidth - this.element.clientWidth - 2;
        }

        this.y += this.speed * this.dy;
        this.x += this.speed * this.dx;
    }

    isOverlappingWith(ball) {
        const x_distance = Math.floor(this.x - ball.x);
        const y_distance = Math.floor(this.y - ball.y);
        const sq_of_distances = x_distance * x_distance + y_distance * y_distance;
        const sum_of_radius = this.r + ball.r;
        if (sq_of_distances < sum_of_radius * sum_of_radius) {
            let distance_between_center = Math.floor(Math.sqrt((this.x - ball.x) * (this.x - ball.x) + (this.y - ball.y) * (this.y - ball.y)))
            let overlap = this.r + ball.r - distance_between_center;
            if (overlap > 0) {
                let adjust = overlap / 2;

                this.x += adjust * (x_distance) / distance_between_center;
                this.y += adjust * (y_distance) / distance_between_center;

                ball.x -= adjust * (x_distance) / distance_between_center;
                ball.y -= adjust * (y_distance) / distance_between_center;

            }
            return true;
        }

        return false;
    }

    /**
     * Returns true if the balls are colliding, false otherwise
     * and changes the direction of ball
     * @param {Ball} ball - Ball to check collision with
     * @returns {boolean}
     */
    checkCollisionWith(ball) {
        const x_distance = Math.floor(this.x - ball.x);
        const y_distance = Math.floor(this.y - ball.y);
        const sq_of_distances = (x_distance * x_distance) + (y_distance * y_distance);
        const sum_of_radius = (this.r + ball.r);
        if (sq_of_distances <= sum_of_radius * sum_of_radius) {
            this.isOverlappingWith(ball);
            // let tmp = this.dx;
            // let tmp_2 = this.dy;
            // this.dx = ball.dx;
            // this.dy = ball.dy;
            // ball.dx = tmp;
            // ball.dy = tmp_2;
            const angle = Math.atan2(y_distance, x_distance);

            // dy angle w.r.t to tangent and dx w.r.t normal
            let this_normal_velocity = this.dx * Math.cos(angle) + this.dy * Math.sin(angle);
            let ball_normal_velocity = ball.dx * Math.cos(angle) + ball.dy * Math.sin(angle);

            let this_tangent_velocity = -this.dx * Math.sin(angle) + this.dy * Math.cos(angle);
            let ball_tangent_velocity = -ball.dx * Math.sin(angle) + ball.dy * Math.cos(angle);

            // Normal velocities are swapped
            let temp = this_normal_velocity;
            this_normal_velocity = ball_normal_velocity;
            ball_normal_velocity = temp;

            this.dx = this_normal_velocity * Math.cos(angle) - this_tangent_velocity * Math.sin(angle);
            this.dy = this_normal_velocity * Math.sin(angle) + this_tangent_velocity * Math.cos(angle);
            ball.dx = ball_normal_velocity * Math.cos(angle) - ball_tangent_velocity * Math.sin(angle);
            ball.dy = ball_normal_velocity * Math.sin(angle) + ball_tangent_velocity * Math.cos(angle);
            return true
        }

        return false;
    }
}
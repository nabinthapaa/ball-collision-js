import Ball from "./classes/ball.js";
import * as rnd from './utils/Random.js';

/**@type {HTMLDivElement} */
const bounding_box = document.getElementById("bounding-box");
const bounding_box_height = bounding_box.clientHeight;
const bounding_box_width = bounding_box.clientWidth;

/**@type {Array.<Ball>} */
const balls = []

for (let i = 0; i < 50; i++) {
    let speed = rnd.getRandomRange(2, 3);
    console.log(speed);
    const radius = rnd.getRandomRange(20, 30);
    const ball = new Ball(
        rnd.getRandomNumber(bounding_box_width - radius * 2),
        rnd.getRandomNumber(bounding_box_height - radius * 2),
        radius,
        Math.random(),
        Math.random(),
        speed,
        rnd.getRandomColor(),
        bounding_box
    )

    balls.push(ball);
}

function animate() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].moveBall();
    }
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j] !== balls[i]) {
                const collision = balls[i].isCollidingWith(balls[j]);
                if (collision) {
                    balls[i].moveBall();
                    balls[j].moveBall();
                }
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();
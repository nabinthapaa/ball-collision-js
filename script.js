import Ball from "./classes/ball.js";
import * as rnd from './utils/Random.js';

/**@type {HTMLDivElement} */
const bounding_box = document.getElementById("bounding-box");
const bounding_box_height = bounding_box.clientHeight;
const bounding_box_width = bounding_box.clientWidth;
const total_balls = 500;

/**@type {Array.<Ball>} */
const balls = []

for (let i = 0; i < total_balls; i++) {
    let speed = rnd.getRandomRange(1, 5);
    const radius = rnd.getRandomRange(10, 13);
    const ball = new Ball(
        rnd.getRandomNumber(bounding_box_width - radius * 2),
        rnd.getRandomNumber(bounding_box_height - radius * 2),
        radius,
        // Generate a random number between -1 and 1
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        speed,
        rnd.getRandomColor(),
        bounding_box,
        i
    )

    balls.push(ball);
}

for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
}


async function animate() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].moveBall();
    }
    for (let i = 0; i < balls.length; i++) {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j] !== balls[i]) {
                balls[i].checkCollisionWith(balls[j]);
            }
        }
    }
    for (let i = 0; i < balls.length; i++) {
        balls[i].drawBall();
    }

    requestAnimationFrame(animate)
}

(async () => animate())();
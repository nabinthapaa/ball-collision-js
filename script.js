import Ball from "./classes/ball.js";
import * as rnd from './utils/Random.js';

/**@type {HTMLDivElement} */
const bounding_box = document.getElementById("bounding-box");
const bounding_box_height = bounding_box.clientHeight;
const bounding_box_width = bounding_box.clientWidth;
const radius = rnd.getRandomRange(20, 30);

const ball = new Ball(
    rnd.getRandomNumber(bounding_box_width - radius),
    rnd.getRandomNumber(bounding_box_height - radius),
    radius,
    Math.random(),
    Math.random(),
    rnd.getRandomNumber(10),
    rnd.getRandomColor(),
    bounding_box
)

ball.drawBall();
function animate() {
    ball.moveBall();
    requestAnimationFrame(animate)
}

animate();
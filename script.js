import swipeAndPrune from "./classes/SwipeAndPrune.js";
import Ball from "./classes/ball.js";
import SpatialGrid from "./classes/grid.js";
import * as rnd from './utils/Random.js';

/**@type {HTMLDivElement} */
const bounding_box = document.getElementById("bounding-box");
const bounding_box_height = bounding_box.clientHeight;
const bounding_box_width = bounding_box.clientWidth;
const grid = new SpatialGrid(100, bounding_box);

/**@type {Array.<Ball>} */
const balls = []

for (let i = 0; i < 50; i++) {
    let speed = rnd.getRandomRange(2, 3);
    const radius = rnd.getRandomRange(10, 30);
    const ball = new Ball(
        rnd.getRandomNumber(bounding_box_width - radius * 2),
        rnd.getRandomNumber(bounding_box_height - radius * 2),
        radius,
        Math.random(),
        Math.random(),
        speed,
        rnd.getRandomColor(),
        bounding_box,
        i
    )

    balls.push(ball);
    grid.addBall(ball);
}

for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
}


function animate() {
    grid.clear();
    for (let i = 0; i < balls.length; i++) {
        balls[i].moveBall();
        grid.addBall(balls[i]);
    }
    // outerLoop: for (let i = 0; i < balls.length; i++) {
    //     /**@type {Array.<Ball>} */
    //     const nearbyBalls = grid.getNearbyBall(balls[i]);
    //     if (!nearbyBalls) {
    //         continue outerLoop;
    //     }
    //     for (let j = 0; j < nearbyBalls.length; j++) {
    //         balls[i].isCollidingWith(nearbyBalls[j]);
    //     }
    // }

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
    for (let i = 0; i < balls.length; i++) {
        balls[i].drawBall();
    }

    requestAnimationFrame(animate)
}



// function animate() {
//     for (let i = 0; i < balls.length; i++) {
//         balls[i].moveBall();
//     }
//     outerLoop: for (let i = 0; i < balls.length; i++) {
//         const nearbyBalls = swipeAndPrune(balls[i], balls);
//         if (!nearbyBalls.length) {
//             continue outerLoop;
//         }
//         for (let j = 0; j < nearbyBalls.length; j++) {
//             if (nearbyBalls[j] !== balls[i]) {
//                 const collision = balls[i].isCollidingWith(nearbyBalls[j]);
//                 if (collision) {
//                     balls[i].moveBall();
//                     nearbyBalls[j].moveBall();
//                 }
//             }
//         }
//     }

//     requestAnimationFrame(animate);
// }
animate();
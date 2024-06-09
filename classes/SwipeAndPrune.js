import Ball from "./ball.js";

/**
 * 
 * @param {Ball} ball 
 * @param {Array.<Ball>} balls 
 * @returns {Array.<Ball>}
 */
function swipeAndPrune(ball, balls) {
    /**
     * ball x postition check
     * ball_ x position check
     * if 
     */
    const nearby = []
    loop: for (let i = 0; i < balls.length; i++) {
        if ((ball.dx < 0 && balls[i].x > 0) || (ball.dy > 0 && balls[i] < 0)) {
            continue loop;
        }

        if ((ball.dx > 0 && balls[i].dx < 0) || (ball.dy < 0 && balls[i] > 0)) {
            if (ball.x <= balls[i].x) {
                nearby.push(balls[i])
            }
            if (ball.y === balls[i].y) {
                nearby.includes(balls[i]) ? '' : nearby.push(balls[i]);
            }
        }
    }

    return nearby;
}

export default swipeAndPrune;
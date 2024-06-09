import Ball from "./ball.js";

export default class SpatialGrid {
    /**
     * Initializes a grid with specified cell size
     * within a parent  
     * @param {number} cellsize - Size of a cell
     * @param {HTMLElement} parent - HTML element where the grid is to be initialized 
     */
    constructor(cellsize = 50, parent = document.body) {
        this.cellsize = cellsize;
        this.cells = {}
        this.parent = parent;
        this.gridlines = [];
    }

    /**
     * Clears the grid
     */
    clear() {
        this.cells = {};
    }

    /**
     * Determines where the ball is in the grid
     * @param {Ball} ball - Ball to add in grid
     */
    addBall(ball) {
        const cellX = this.#getCellX(ball);
        const cellY = this.#getCellY(ball);
        const position = `${cellX}${cellY}`;

        if (!this.cells[position]) {
            this.cells[position] = [];
        }

        this.cells[position].push(ball);
    }


    /**
     * Returns a array of nearby balls
     * @param {Ball} ball - Ball whose neighbours are to be determined
     */
    getNearbyBall(ball) {
        const cellX = this.#getCellX(ball);
        const cellY = this.#getCellY(ball);
        const position = `${cellX}${cellY}`;

        return this.cells[position]?.filter(ball_ => ball_.id !== ball.id);
    }

    /**
     * Returns the X-poisition of ball in the grid
     * @param {Ball} ball - Ball whose position is to be determined in the grid
     * @returns {number}
     */
    #getCellX(ball) {
        return Math.floor(ball.x / this.cellsize)
    }

    /**
     * Returns the Y-poisition of ball in the grid
     * @param {Ball} ball - Ball whose position is to be determined in the grid
     * @returns {number}
     */
    #getCellY(ball) {
        return Math.floor(ball.y / this.cellsize)
    }


}
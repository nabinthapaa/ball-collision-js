/**
 * Returns a random number between the provided range
 * @param {number} min - Starting value
 * @param {number} max - Endin Value
 * @returns {number}
 */
function getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Returns a random number from 0 to provided number(exclusive)
 * @param {number} end - Number upto which a random number is to be returned
 * @returns {number} 
 */
function getRandomNumber(end) {
    return Math.floor(Math.random() * end);
}

/**
 * Returns a Hex code for a random color
 * @returns {string}
 */
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777216).toString(16)
}

export { getRandomColor, getRandomNumber, getRandomRange };


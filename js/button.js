/**
 * @author Hugo Amuan
 * @version 1.0
 * This class represents a single button in the memory game.
 */

export default class Button {
    /**
     * Constructor for a button object. Creates a DOM elt w/ essential stylization to it.
     * @param {*} number - # displayed on the button
     * @param {*} colour - background colour of the button
     */
    constructor(number,colour) {

        this.number = number;
        this.colour = colour;

        this.elt = document.createElement("button");
        this.elt.classList.add("game_btn");
        this.elt.style.backgroundColor = colour;
        this.elt.textContent = number;
    }

    // Use to hide the position of the coloured button
    hideNumber(){
        this.elt.textContent="";
    }

    // Used to display position of the coloured button
    showNumber(){
        this.elt.textContent=this.number;
    }

    /**
     * Sets a position for a generated button.
     * Used in button_game.js to scramble btn pos
     * @param {number} x - the horizontal pos in px.
     * @param {number} y - the vertical pos in px.
     */
    setPos(x,y){
        this.elt.style.position="absolute";
        this.elt.style.left = x + "px";
        this.elt.style.top = y + "px";
    }
}

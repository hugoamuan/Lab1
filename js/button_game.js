import Button from "./button.js";
import { USER_MESSAGES } from "../lang/messages/en/user.js";

/**
 * @author Hugo Amuan
 * @version 1.0
 * 
 * Manages the logic of the memory btn game.
 * - Handles btn generation, scrambling, event handling, and tracking
 *   the users input to determine game outcome.
 */

export default class ButtonGame {

    /**
     * Creates a new instance of ButtonGame
     * @param {*} containerID - identifier of the html container for the game
     * @param {*} messageID - identifier of the element for displaying messages to the user.
     */

    constructor(containerID, messageID) {
        this.game_container = document.getElementById(containerID);
        this.message = document.getElementById(messageID);

        // Internal game state vars managed by the ButtonGame
        this.buttons = [];
        this.orderToMemorize = [];
        this.userClicks = [];
        this.gameOver = false;
    }

    /**
     * Generates 'n' buttons w/ random colours and appends them to the container.
     * - Saves the original order in an array
     * - Saves the users answers in an array.
     * @param {*} n - Num buttons to generate (3-7) 
     */
    generate(n) {
        // Reset game state
        this.game_container.innerHTML = "";
        this.buttons = [];
        this.orderToMemorize = [];
        this.userClicks = [];
        this.gameOver = false;

        const colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
        const availableColours = [...colours];

        for (let i = 0; i < n; i++) {
            
            // Pick rand colour and remove it
            const colourIndex = Math.floor(Math.random() * availableColours.length);
            const colour = availableColours.splice(colourIndex, 1)[0];
            
            // Create the btn element and save it 
            const btn = new Button(i + 1, colour);
            this.buttons.push(btn);
            this.orderToMemorize.push(btn.number);

            // Append it to game div
            this.game_container.appendChild(btn.elt);
        }
    }

    /**
     * Handles the scrambling phase asynchronously, using delays without blocking the main thread so the browser remains responsive.
     * @param {A} ms 
     */
    async triggerScramble(ms) {

        const scramble_amt = 3;
        await this.delay(ms); // await: pause this async function and allow user to interact with page or allow other code to run.

        // Hide numbers
        this.buttons.forEach(btn => btn.hideNumber());

        // Scramble 3 times every 2 seconds
        for (let i = 0; i < scramble_amt; i++) {
            this.scramblePositions();
            await this.delay(2000);
        }

        this.enableClickOnce();
    }

    /**
     * Randomly sets positions for all buttons within the game_container
     */
    scramblePositions() {

        // Check current screen dimensions w/ a safety buffer.
        const width = this.game_container.clientWidth - 50;
        const height = this.game_container.clientHeight - 50;

        // for-each loop on buttons[] that generates a random x and y value to modify a btn's pos.
        this.buttons.forEach(btn => {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            btn.setPos(x, y);
        });
    }

    /**
     * Attaches event listeners to buttons to handle clicks for user input.
     */
    enableClickOnce() {
        this.buttons.forEach(btn => {
            btn.elt.addEventListener("click", () => this.handleClick(btn), { once: true }); // once: true -> ensures button is only clicked
        });
    }

    /**
     * Handles a button click, updates, game state, and checks current ButtonGame for win/loss cond.
     * @param {*} btn  - 
     */
    handleClick(btn) {

        // game over do nothing.
        if (this.gameOver) return;
        // reveal clicked number 
        btn.showNumber();
        this.userClicks.push(btn.number); // Track # of user clicks.

        const currentIndex = this.userClicks.length - 1;

        // Check if click matches the expected order.
        if (btn.number !== this.orderToMemorize[currentIndex]) {
            this.gameOver = true;
            this.message.textContent = USER_MESSAGES.WRONG;

            // User losses -> reveal og order.
            this.buttons.forEach(button => button.showNumber());
        } 
        else
            // User wins
             if(this.userClicks.length === this.orderToMemorize.length) {
            this.gameOver = true;
            this.message.textContent = USER_MESSAGES.WIN;
        }
    }

    /**
     * Creates a promise that resolves (done_waiting() notifies the function that it is complete) after 'ms' seconds. 
     * @param {*} ms 
     * @returns 
     */
    delay(ms) {
        return new Promise(done_waiting => setTimeout(done_waiting, ms));
    }
}
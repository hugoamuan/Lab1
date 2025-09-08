import ButtonGame from "./button_game.js" 
import { USER_MESSAGES } from "../lang/messages/en/user.js";

/**
 * @author Hugo Amuan
 * @version 1.0
 * 
 * This class coordinates the actions between the HTML and ButtonGame logic
 * Reads user input, starts the game and acts upon events such as window resizing.
 */
export default class GameController {

    /**
     * Initialize the game controller and retrieve references for HTML elts.
     * @param {*} gameContainerID  - ID of the div where buttons will be placed after generation.
     * @param {*} messageID - ID of the html element where messages are displayed to the user. 
     * @param {*} inputID - ID of the input field for # of buttons the user wants.
     * @param {*} generateBtnID - ID of the button used to start the game
     */
    constructor(gameContainerID, messageID, inputID, generateBtnID) {

        // Grab references to HTML elts; passed in script.js
        this.user_input_for_n = document.getElementById(inputID);
        this.startBtn = document.getElementById(generateBtnID);
        this.message_for_user = document.getElementById(messageID);

        // Create a new ButtonGame instance 
        this.game = new ButtonGame(gameContainerID, messageID);

        this.initializeCoreEvents();
    }

    // Initializes the event listeners needed to play the game
    initializeCoreEvents() {

        this.startBtn.addEventListener("click", () => this.startGame());

        // If window gets resized, rescramble to ensure buttons are within the layout.
        window.addEventListener("resize", () => {
            if(this.game && !this.game.game_over) {
                this.game.scramblePositions();
            }
        });
    }

    /**
     * Reads the user input
     */
    startGame() {

        const n = parseInt(this.user_input_for_n.value);
        const one_sec_in_ms = 1000;

        if(!isNaN(n) && n >= 3 && n <= 7) {
            this.message_for_user.textContent = "";

            // Generate n buttons
            this.game.generate(n);

            const memorization_time = n * one_sec_in_ms;
            this.game.triggerScramble(memorization_time);
        } 
        else 
            {
            this.message_for_user.textContent = USER_MESSAGES.WRONG_INPUT 
            || "Cannot retrieve error message from /lang/messages/en/user.js"
            }
    }
}
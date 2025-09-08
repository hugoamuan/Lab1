import GameController from "./game_controller.js";
/**
 * @author Hugo Amuan
 * @version 1.0
 * 
 * Main script to run the memory game. 
 * Waits for page to fully load and continues by initializing the game controller.
 * 
 * Pass references to the ID needed for a new GameController instance that will
 * set-up the rest of the app logic.
 */

window.onload = () => {
    new GameController(
        "game_container",
        "invalid_input_message",
        "num_buttons",
        "generate_btn"
    );
};

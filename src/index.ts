import { Engine } from "./engine";


/**
 * Game entry point
 * @returns void
 */
function game() {
    const element = document.createElement('div');
  
    const engine = new Engine();
    engine.start();
  
    return element;
  }
  
  document.body.appendChild(game());
import { Engine } from "./core/engine";

import './style.css';

const engine = new Engine();

/**
 * Game entry point
 * @returns void
 */
function game() {
    const element = document.createElement('div');
  
    engine.start();
  
    return element;
}
  
document.body.appendChild(game());

window.onresize = function() {
  engine.resize();
}
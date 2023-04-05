import _ from "lodash";

namespace TSE {

  export class Engine {
    public constructor() {
      console.log('TS Engine start');
    }
  }
}

function component() {
    const element = document.createElement('div');
  
    const e = new TSE.Engine();
    
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'from engine!'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());
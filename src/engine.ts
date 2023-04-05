import { gl, glUtilities } from "./gs";

/**
 * Main Game engine class
 */
export class Engine {

    private _canvas!: HTMLCanvasElement;

    public constructor() {
    console.log('#TS Engine start');
    }

/**
* start main game loop
*/
    public start(): void {

    try {
        this._canvas = glUtilities.initialize();
    } catch( exception: any) {
        console.error( exception );
    }
    

    gl.clearColor(0, 0, 0, 1);

    this.loop();
    
}

    /**
     * Main game loop
     */
    private loop(): void {

    gl.clear( gl.COLOR_BUFFER_BIT );

    requestAnimationFrame( () => {
        this.loop();
    });

    }
}

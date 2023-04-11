import { gl, glUtilities } from "./gl/glUtilities";
import {Shader} from "./gl/shader";

/**
 * Main Game engine class
 */
export class Engine {

    private _canvas!: HTMLCanvasElement;
    // @ts-ignore
    private _shader: Shader;
    // @ts-ignore
    private _buffer: WebGLBuffer;

    public constructor() {
        console.log('## TS Engine start');
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

        this.loadShaders();
        this._shader.use();

        this.createBuffer();

        this.resize();

        this.loop();
        
    }

    /**
     * Resizes canvas to fit window
     */
    public resize(): void {
        if(this._canvas !== undefined) {
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;

            gl.viewport(0,0, this._canvas.width, this._canvas.height);
        }
    }

    private loadShaders(): void {
        let vertexShaderSource = `
attribute vec3 a_position;

void main() {
    gl_Position = vec4(a_position, 1.0);    
}
        `;
        let fragmentShaderSource = `
precision mediump float;
void main() {
    gl_FragColor = vec4(1.0);
}
        `;

        this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
    }

    /**
     * Main game loop
     */
    private loop(): void {

        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);

        let positionLocation = this._shader.getAttributeLocation("a_position");

        // Not sure if this is really needed?
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame( () => {
            this.loop();
        });
    }

    private createBuffer(): void {
        this._buffer = gl.createBuffer()!;

        let vertices = [
            0, 0, 0,
            0,0.5, 0,
            0.5, 0.5, 0
        ];

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        //gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        let positionLocation = this._shader.getAttributeLocation("a_position");


        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.disableVertexAttribArray(positionLocation);
    }


}

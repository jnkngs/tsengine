import { gl, glUtilities } from "./gl/glUtilities";
import {Shader} from "./gl/shader";
import {AttributeInfo, GLBuffer} from "./gl/glbuffer";

/**
 * Main Game engine class
 */
export class Engine {

    private _canvas!: HTMLCanvasElement;
    // @ts-ignore
    private _shader: Shader;
    // @ts-ignore
    private _buffer: GLBuffer;

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

uniform vec4 u_color;

void main() {
    gl_FragColor = u_color;
}
        `;

        this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
    }

    /**
     * Main game loop
     */
    private loop(): void {

        gl.clear( gl.COLOR_BUFFER_BIT );

        // set uniforms
        let colorPosition = this._shader.getUniformLocation("u_color");
        gl.uniform4f(colorPosition, 1, 0.5, 0, 1);

	    this._buffer.bind();
        this._buffer.draw();

        requestAnimationFrame( () => {
            this.loop();
        });
    }

    private createBuffer(): void {
        this._buffer = new GLBuffer(3);

        let positionAttribute = new AttributeInfo();
        positionAttribute.location = this._shader.getAttributeLocation("a_position");
        positionAttribute.offset = 0;
        positionAttribute.size = 3;
        this._buffer.addAttributeLocation(positionAttribute);

        let vertices = [
            0, 0, 0,
            0,0.5, 0,
            0.5, 0.5, 0
        ];

        this._buffer.pushBackData(vertices);
        this._buffer.upload();
        this._buffer.unbind();
    }


}

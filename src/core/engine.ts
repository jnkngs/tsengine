import { gl, glUtilities } from "./gl/glUtilities";
import {Shader} from "./gl/shader";
import {AttributeInfo, GLBuffer} from "./gl/glbuffer";
import {Sprite} from "./graphics/sprite";
import {Matrix4x4} from "./math/matrix4x4";

/**
 * Main Game engine class
 */
export class Engine {
    // @ts-ignore
    private _projection: Matrix4x4;

    private _canvas!: HTMLCanvasElement;
    // @ts-ignore
    private _shader: Shader;

    // @ts-ignore
    private _sprite: Sprite;

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

        this._projection = Matrix4x4.orthographic(
            0,
            this._canvas.width,
            0,
            this._canvas.height,
            -100,
            100);

        this._sprite = new Sprite("test");
        this._sprite.load();
        this._sprite.position.x = 200;

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

            gl.viewport(-1,1, -1, 1);
        }
    }

    private loadShaders(): void {
        let vertexShaderSource = `
attribute vec3 a_position;

uniform mat4 u_projection;
uniform mat4 u_model;

void main() {
    gl_Position = u_projection * u_model * vec4(a_position, 1.0);    
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

        let projectionPosition = this._shader.getUniformLocation("u_projection");
        gl.uniformMatrix4fv(projectionPosition, false, new Float32Array(this._projection.data));

        let modelLocation = this._shader.getUniformLocation("u_model");
        gl.uniformMatrix4fv(modelLocation, false, new Float32Array(Matrix4x4.translation(this._sprite.position).data ));

        this._sprite.draw();

        requestAnimationFrame( () => {
            this.loop();
        });
    }

}

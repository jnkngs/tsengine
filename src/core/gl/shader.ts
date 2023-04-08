import {gl} from "./glUtilities";

/*
* Represents a WEBGL shader
* */
export class Shader {

    private _name: string;
    private _program: WebGLProgram;

    /*
    * Creates a new shader
    * @param: name - the name of the string
    * @param: vertexSource - the source of the vertex shader
    * @param: fragmentSource - the source of the fragment shader
    * */
    constructor(name: string, vertexSource: string, fragmentSource: string) {
        this._name = name;
        let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
        let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

        this._program = this.createProgram(vertexShader, fragmentShader);
    }

    /*
    * The name of the shader
    */
    get name(): string {
        return this._name;
    }

    /*
    * Use this shader
    */
    public use(): void {
        gl.useProgram(this._program);
    }

    private loadShader(source: string, shaderType: number): WebGLShader {
        let shader: WebGLShader = gl.createShader(shaderType)!;
        if(typeof shader === "undefined") {
            throw new Error(`Cannot create shader ${this._name}`);
        }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        let error = gl.getShaderInfoLog(shader);
        if(error !== "") {
            throw new Error(`Cannot compile ${this._name} shader: ${error}`);
        }

        return shader;
    }

    private createProgram(vertexShader:WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
        const program = gl.createProgram()!;

        if(typeof program === "undefined") {
            throw new Error(`Cannot create shader program ${this._name}`);
        }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        gl.linkProgram(program);
        let error = gl.getProgramInfoLog(program);
        if(error !== "") {
            throw new Error(`Cannot link ${this._name} shader: ${error}`);
        }

        return program;
    }
}
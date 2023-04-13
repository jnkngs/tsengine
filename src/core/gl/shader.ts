import {gl} from "./glUtilities";

/*
* Represents a WEBGL shader
* */
export class Shader {

    private _name: string;
    private _program: WebGLProgram;
    private _attributes: {[name: string]: number} = {};
    private _uniforms: {[name:string]: WebGLUniformLocation} = {};

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

        this.detectAttributes();
        this.detectUniforms();
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

    /*
    * Gets the location of an uniform by name
    * @param string - name
    * @returns number - location of uniform
    * */
    public getUniformLocation(name: string): WebGLUniformLocation {
        if(this._uniforms[name] === undefined) {
            throw new Error(`Unable to find uniform named ${name} in shader ${this._name}`);
        }

        return this._uniforms[name];
    }

    /*
    * Gets the location of an attribute by name
    * @param string - name
    * @returns number - location of attribute
    * */
    public getAttributeLocation(name: string): number {
        if(this._attributes[name] === undefined) {
            throw new Error(`Unable to find attribute named ${name} in shader ${this._name}`);
        }

        return this._attributes[name];
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

    private detectAttributes() {
        let attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
        for(let i=0; i<attributeCount; ++i) {
            let info: WebGLActiveInfo = gl.getActiveAttrib(this._program, i)!;
            if(!info) {
                break;
            }

            this._attributes[info.name] = gl.getAttribLocation(this._program, info.name);
        }
    }

    private detectUniforms() {
        let uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
        for(let i=0; i<uniformCount; ++i) {
            let info: WebGLActiveInfo = gl.getActiveUniform(this._program, i)!;
            if(!info) {
                break;
            }

            this._uniforms[info.name] = gl.getUniformLocation(this._program, info.name)!;
        }
    }
}
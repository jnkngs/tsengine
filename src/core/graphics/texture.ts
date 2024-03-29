import {gl} from "../gl/glUtilities";


export class Texture {

    private _name: string;
    private _handle: WebGLTexture;
    private _isLoaded: boolean = false;
    private _width: number;
    private _height: number;

    public constructor(name: string, width: number = 1, height: number = 1) {
        this._name = name;
        this._width = width;
        this._height = height

        this._handle = gl.createTexture() as WebGLTexture;
    }

    public get name(): string {
        return this._name;
    }

    public get isLoaded(): boolean {
        return this._isLoaded;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public bind() {
        gl.bindTexture(gl.TEXTURE_2D, this._handle);
    }

}
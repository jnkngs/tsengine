import {gl} from "./glUtilities";

/*
* Representation of the information needed for GlBuffer attributes
* */
export class AttributeInfo {
    public location!: number;   // location of this attribute
    public size!: number;       // size, number of elements, in this attribute (i.e. vec3 = 3)
    public  offset!: number;    // number of elements from the beginning of the buffer
}

export class GLBuffer {

    private _hasAttributeLocation: boolean = false;
    private _elementSize: number;
    private _stride: number;
    private _buffer: WebGLBuffer;

    private _targetBufferType: number;
    private _dataType: number;
    private _mode: number;
    private _typeSize: number;

    private _data: number[] = [];
    private _attributes: AttributeInfo[] = [];
    constructor(elementSize: number, dataType: number =gl.FLOAT, targetBufferType: number = gl.ARRAY_BUFFER, mode: number = gl.TRIANGLES) {
        this._elementSize = elementSize;
        this._dataType = dataType;
        this._targetBufferType = targetBufferType;
        this._mode = mode;

        // Determine type size
        switch (this._dataType) {
            case gl.FLOAT:
            case gl.INT:
            case gl.UNSIGNED_INT:
                this._typeSize = 4;
                break;
            case gl.SHORT:
            case gl.UNSIGNED_SHORT:
                this._typeSize = 2;
                break;
            case gl.BYTE:
            case gl.UNSIGNED_BYTE:
                this._typeSize = 1;
                break;
            default:
                throw new Error(`Unrecognized data type: ${this._dataType}`);
        }

        this._stride = this._elementSize * this._typeSize;

        this._buffer = gl.createBuffer()!;
        if(this._buffer === null) {
            throw new Error("Cannot create GL buffer");
        }

    }

    /*
    * Destroys this buffer
    * */
    public destroy() {
        gl.deleteBuffer(this._buffer);
    }

    /*
    * Binds this buffer
    * @param normalized, indicate if data should be normalized, defaults to false
    * */
    public bind(normalized: boolean = false) {
        gl.bindBuffer(this._targetBufferType, this._buffer);

        if(this._hasAttributeLocation) {
            for(let attr of this._attributes) {
                gl.vertexAttribPointer(attr.location, attr.size, this._dataType, normalized, this._stride, (attr.offset * this._typeSize));
                gl.enableVertexAttribArray(attr.location);
            }
        }
    }

    /*
    * Unbind this buffer
    * */
    public unbind() {
        for(let attr of this._attributes) {
            gl.disableVertexAttribArray(attr.location);

        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    }

    /*
    * Adds an attribute with the provided info
    * @param: info
    * */
    public addAttributeLocation(info: AttributeInfo) {
        this._hasAttributeLocation = true;
        this._attributes.push(info);
    }

    /*
    * Adds data to this buffer
    * @param: data
    * */
    public pushBackData(data: number[]) {

        for(let d of data) {
            this._data.push(d);
        }

    }

    /*
    * Uploads this buffer's data to the GPU
    * */
    public upload() {
        gl.bindBuffer(this._targetBufferType, this._buffer);

        let bufferData!: ArrayBuffer;

        switch (this._dataType) {
            case gl.FLOAT:
                bufferData = new Float32Array(this._data);
                break;
            case gl.INT:
                bufferData = new Int32Array(this._data);
                break;
            case gl.UNSIGNED_INT:
                bufferData = new Uint32Array(this._data);
                break;
            case gl.SHORT:
                bufferData = new Int16Array(this._data);
                break;
            case gl.UNSIGNED_SHORT:
                bufferData = new Uint16Array(this._data);
                break;
            case gl.BYTE:
                bufferData = new Int8Array(this._data);
                break;
            case gl.UNSIGNED_BYTE:
                bufferData = new Uint8Array(this._data);
                break;
        }

        gl.bufferData(this._targetBufferType, bufferData, gl.STATIC_DRAW);
    }

    /*
    * Draws this buffer
    * */
    public draw() {
        if(this._targetBufferType === gl.ARRAY_BUFFER) {
            gl.drawArrays(this._mode, 0, this._data.length / this._elementSize);
        }
        else if(this._targetBufferType === gl.ELEMENT_ARRAY_BUFFER) {
            gl.drawElements(this._mode, this._data.length, this._dataType, 0);
        }
    }
}
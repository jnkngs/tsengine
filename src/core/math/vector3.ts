
export class Vector3 {
    private _x: number;
    private _y: number;
    private _z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x(): number {
        return this._x;
    }

    set x(val: number) {
        this._x = val;
    }

    get y(): number {
        return this._y;
    }

    set y(val: number) {
        this._y = val;
    }

    get z(): number {
        return this._z;
    }

    set z(val: number) {
        this._z = val;
    }

    public toArray(): number[] {
        return [this._x, this._y, this._z];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}
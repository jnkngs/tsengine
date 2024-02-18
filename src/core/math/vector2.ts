
export class Vector2 {
    private _x: number;
    private _y: number;

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
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

    public toArray(): number[] {
        return [this._x, this._y];
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}
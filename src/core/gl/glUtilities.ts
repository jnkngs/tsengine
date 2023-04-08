
export var gl: WebGLRenderingContext;
export class glUtilities {

    /**
     * Initializes WebGL, to given element if provided, else creates it
     * @param elementId string (optional)
     * @returns created canvas element
     */
    public static initialize(elementId?: string): HTMLCanvasElement {
        /**
         * WebGL rendering context
         */
        let canvas: HTMLCanvasElement;

        if(elementId !== undefined) {
            canvas = document.getElementById(elementId) as HTMLCanvasElement;
            if(canvas === undefined) {
                throw new Error(`Cannot find ${elementId}`);
            }
        } else {
            canvas = document.createElement("canvas") as HTMLCanvasElement;
            if(canvas === undefined) {
                throw new Error('Cannot create canvas element');
            }

            document.body.appendChild(canvas);
        }

        gl = canvas.getContext('webgl')!;

        if(typeof gl === 'undefined') {
            throw new Error('cannot create webgl context');
        }

        return canvas;
    }
}

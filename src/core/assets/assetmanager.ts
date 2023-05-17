import {IAssetLoader} from "./iassetloader";
import {IAsset} from "./iasset";

export class AssetManager {

    private static _loaders: IAssetLoader[] = [];
    private static _loadedAssets: {[name:string]: IAsset} = {};
    private constructor() {

    }

    public static initialize() {

    }

    public static registerLoader( loader: IAssetLoader) {
        AssetManager._loaders.push(loader);
    }

    public static loadAsset(assetName: string) {

    }

    public static isAssetLoaded(assetName: string): boolean {
        return AssetManager._loadedAssets[assetName] !== undefined;
    }

    public static getAsset(assetName: string): IAsset | undefined {
        if(AssetManager._loadedAssets[assetName] !== undefined) {
            return AssetManager._loadedAssets[assetName];
        } else {
            AssetManager.loadAsset(assetName);
        }

        return undefined;
    }
}
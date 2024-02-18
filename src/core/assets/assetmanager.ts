import {IAssetLoader} from "./iassetloader";
import {IAsset} from "./iasset";
import {Message} from "../message/message";
import {ImageAssetLoader} from "./ImageAssetLoader";

export const MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED";
export class AssetManager {

    private static _loaders: IAssetLoader[] = [];
    private static _loadedAssets: {[name:string]: IAsset} = {};
    private constructor() {

    }

    public static initialize() {
        AssetManager._loaders.push(new ImageAssetLoader());
    }

    public static registerLoader( loader: IAssetLoader) {
        AssetManager._loaders.push(loader);
    }

    public static onAssetLoaded(asset: IAsset) {
        AssetManager._loadedAssets[asset.name] = asset;
        Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset );
    }

    public static loadAsset(assetName: string) {
        let extension = assetName.split('.').pop()?.toLowerCase() || '';
        for(let l of AssetManager._loaders) {
            if(l.supportedExtensions.indexOf(extension) !== -1) {
                l.loadAsset(assetName);
                return;
            }
        }

        console.warn(`Unable to load asset with extension ${extension}. No loader associated with it.`)
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
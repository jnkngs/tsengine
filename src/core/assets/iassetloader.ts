import {IAsset} from "./iasset";

export interface IAssetLoader {

    readonly supportedExtensions: string[];

    loadAsset(assetName: string): void;
}
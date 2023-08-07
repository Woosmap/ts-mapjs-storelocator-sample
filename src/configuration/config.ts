import mapConfig from "./map.config";
import directionsConfig from "./directions.config";
import searchConfig from "./search.config";
import selectors from "./selectors.config";
import urls from "./urls.config";
import {merge} from "../utils/utils";

export const defaultConfig = {
    map: mapConfig,
    directions: directionsConfig,
    search: searchConfig,
    selectors: selectors,
    urls: urls
}
export type Configuration = typeof defaultConfig;

let currentConfig: Configuration = defaultConfig;

export function createConfigObject(configObj?: Configuration): Configuration {
    const config = configObj || {};
    return merge({...config}, {...currentConfig});
}

export function setConfig(configObj?: Configuration): void {
    currentConfig = createConfigObject(configObj);
}

export function getConfig(): Configuration {
    return currentConfig
}

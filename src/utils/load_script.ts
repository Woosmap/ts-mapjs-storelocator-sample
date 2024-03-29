import {objectToQueryString, StringMap} from "./utils";

/**
 * Previously loading/loaded scripts that have been requested by `loadScript()`.
 */
let cachedScripts: Record<string, Promise<void>> = {};

/**
 * Asynchronously loads a script keeping track of which scripts have already
 * requested and loaded.
 *
 * Multiple requests to the same resource will return the same promise.
 *
 * @param {Object} options - used to set the script url, query parameters and if the script should be overridden.
 * @return {Promise<void>} returns a promise to indicate if the script was successfully loaded.
 */
export function loadScript(options: { url: string; params?: Record<string, string>; override?: boolean }): Promise<void> {
    const {url, params, override} = options;
    if (!url || url.length === 0) {
        throw new Error("Invalid url.");
    }
    if (typeof params !== "undefined" && typeof params !== "object") {
        throw new Error("Expected params to be an object.");
    }

    const src = `${url}?${objectToQueryString(params)}`;
    const existing = cachedScripts[src];
    if (existing) {
        if (override) {
            const script = getScriptElement(src);
            if (script) {
                delete cachedScripts[src];
                script.remove();
            }
        } else {
            return existing
        }
    }

    const promise = new Promise<void>((resolve, reject) => {
        if (findScript(src)) {
            resolve();
        }

        const script = createScriptElement(url, params);

        const onScriptLoad = (): void => {
            resolve();
        };

        const onScriptError = (): void => {
            cleanup();
            delete cachedScripts[src];
            script.remove();

            const defaultError = new Error(`The script "${src}" failed to load.`);
            reject(defaultError);
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        document.head.insertBefore(script, document.head.firstElementChild);

        function cleanup(): void {
            script.removeEventListener('load', onScriptLoad);
            script.removeEventListener('error', onScriptError);
        }
    });

    cachedScripts[src] = promise;

    return promise;
}


/**
 * Find script src in the DOM
 * @param {string} src - used to set the script url and attributes.
 * @return {boolean | null} returns `true` if script exist otherwise `null`.
 */
function findScript(src: string): boolean | null {
    const currentScript: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);
    if (currentScript === null) {
        return null
    }
    return true;
}

/**
 * Get script by src in the DOM
 * @param {string} src - used to set the script url and attributes.
 * @return {HTMLScriptElement | null} returns existing `HTMLScriptElement` if script exist otherwise `null`.
 */
function getScriptElement(src: string): HTMLScriptElement | null {
    const currentScript: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);
    if (currentScript === null) {
        return null
    }
    return currentScript;
}

/**
 * Creates Script Element
 * @param {string} url - the script url
 * @param {StringMap} params - parameters to append to script url
 * @return {HTMLScriptElement} returns the newly created script.
 */
export function createScriptElement(url: string, params: StringMap = {}): HTMLScriptElement {
    const newScript: HTMLScriptElement = document.createElement("script");
    newScript.src = `${url}?${objectToQueryString(params)}`;
    newScript.async = true;
    return newScript;
}


/**
 * Clears the script cache. For testing purposes only.
 */
export function clearScriptCache(): void {
    cachedScripts = {};
}

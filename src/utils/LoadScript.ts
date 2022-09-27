type StringMap = Record<string, string>;

interface ScriptElement {
    url: string;
    attributes?: StringMap;
    onSuccess: () => void;
    onError: OnErrorEventHandler;
}

/**
 * Load a custom script asynchronously.
 *
 * @param {Object} options - used to set the script url and attributes.
 * @return {Promise<void>} returns a promise to indicate if the script was successfully loaded.
 */
export function loadScript(
    options: {
        url: string;
        attributes?: Record<string, string>;
    }
): Promise<void> {
    const {url, attributes} = options;
    return new Promise((resolve, reject) => {
        const currentScript = document.querySelector<HTMLScriptElement>(`script[src="${url}"]`);
        if (currentScript) return resolve();
        insertScriptElement({
            url,
            attributes,
            onSuccess: () => resolve(),
            onError: () => {
                const defaultError = new Error(
                    `The script "${url}" failed to load.`
                );
                return reject(defaultError);
            },
        });
    });
}

function insertScriptElement({
                                 url,
                                 attributes,
                                 onSuccess,
                                 onError,
                             }: ScriptElement): void {
    const newScript = createScriptElement(url, attributes);
    newScript.onerror = onError;
    newScript.onload = onSuccess;

    document.head.insertBefore(newScript, document.head.firstElementChild);
}

function createScriptElement(
    url: string,
    attributes: StringMap = {}
): HTMLScriptElement {
    const newScript: HTMLScriptElement = document.createElement("script");
    newScript.src = `${url}?${objectToQueryString(attributes)}`;
    return newScript;
}

function objectToQueryString(params: StringMap): string {
    let queryString = "";
    Object.keys(params).forEach((key) => {
        if (queryString.length !== 0) queryString += "&";
        queryString += key + "=" + params[key];
    });
    return queryString;
}

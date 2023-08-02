export type StringMap = Record<string, string | number | boolean>;

export function objectToQueryString(params: StringMap = {}): string {
    let queryString = "";
    Object.keys(params).forEach((key) => {
        if (queryString.length !== 0) queryString += "&";
        queryString += key + "=" + params[key].toString();
    });
    return queryString;
}

/**
 * Decodes to a [latitude, longitude] coordinates array.
 *
 * @param {String} polylineString
 * @param {Number} precision
 * @returns {Array}
 *
 * @see https://github.com/mapbox/polyline/blob/master/src/polyline.js#L36
 */
export function decodePolyline(polylineString: string, precision = 5): number[][] {
    const coordinates = [];
    const factor = Math.pow(10, precision);
    let index, lat, lng, byte, shift, result, latitude_change, longitude_change;
    index = 0;
    lat = 0;
    lng = 0;

    while (index < polylineString.length) {
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = polylineString.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = polylineString.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
}

/**
 * debounce to delays invoking the parameter function until at least timeout milliseconds have elapsed
 * since the last time it was invoked.
 */
export function debounce<T extends (...args: any[]) => ReturnType<T>>(
    callback: T,
    timeout: number
): ((...args: Parameters<T>) => void) {
    let timer: ReturnType<typeof setTimeout>

    return (...args: Parameters<T>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(...args)
        }, timeout)
    }
}

/**
 * return the length in pixel of a string displayed on the map
 */
export function getTextWidth(text: string): number {
    const canvas: HTMLCanvasElement = document.getElementById("canvasMarkerWoosmap") as HTMLCanvasElement || document.createElement("canvas") as HTMLCanvasElement;
    canvas.id = "canvasMarkerWoosmap";
    const context: CanvasRenderingContext2D = canvas.getContext("2d", {willReadFrequently: true}) as CanvasRenderingContext2D;
    context.font = "bold 15px sans-serif";
    return context.measureText(text).width;
}

/**
 * Check if input is an Object
 */
export function isObject(input: unknown): input is Record<string, unknown> {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
}


/**
 * Merge the source object into the target like `Object.assign` but recursively.
 * No override if key already exist in target.
 */
export function merge<T extends Record<string, any>, S extends Record<string, any>>(target: T, source: S): T & S;
export function merge<T extends any, S extends any>(target: T, source: S): T | S;
export function merge(target: unknown, source: unknown): any {
    if (!isObject(source) || !isObject(target)) {
        return target;
    }
    for (const key in source) {
        const targetProp = target[key];
        const sourceProp = source[key];

        if (isObject(sourceProp) && isObject(targetProp)) {
            merge(targetProp, sourceProp);
        } else if (!(key in target)) {
            target[key] = source[key];
        }
    }
    return target;
}


/**
 * replace all keys enclosed by curly braces (eg. {replace_str}) by given values
 */
export function replace(str: string, keyValues: Record<string, string>): string {
    let result = str;
    Object.keys(keyValues).forEach((key) => {
        result = result.replace(
            new RegExp('\\{\\s*' + key + '\\s*\\}', 'g'),
            keyValues[key]
        );
    });
    return result;
}


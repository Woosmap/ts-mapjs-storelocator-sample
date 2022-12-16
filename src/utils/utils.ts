export type StringMap = Record<string, string | number | boolean>;

export function objectToQueryString(params: StringMap): string {
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


export function getTextWidth(text: string): number {
    const canvas: HTMLCanvasElement = document.getElementById("canvasMarkerWoosmap") as HTMLCanvasElement || document.createElement("canvas") as HTMLCanvasElement;
    canvas.id = "canvasMarkerWoosmap";
    const context: CanvasRenderingContext2D = canvas.getContext("2d", {willReadFrequently: true}) as CanvasRenderingContext2D;
    context.font = "bold 15px sans-serif";
    return context.measureText(text).width;
}


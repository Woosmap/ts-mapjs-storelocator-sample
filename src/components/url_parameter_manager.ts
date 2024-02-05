import {MapLocation} from "./map/map";
import {SearchLocation} from "./search/search";

export interface AllowedParameters {
    storeId?: string;
    locality?: SearchLocation;
    location?: MapLocation;
    direction?: Direction;
}

interface Direction {
    from?: SearchLocation;
    to?: SearchLocation;
}

// Regular expressions for parsing URL parameters
const LOCATION_REGEX = /@([-\d.]+),([-\d.]+),(\d+)/;
const DIRECTION_REGEX = /\/direction\/([^/]*)\/([-\d.]*)?,?([-\d.]*)?\/([^/]*)\/([-\d.]+),([-\d.]+)/;
const STORE_ID_REGEX = /\/store\/(.+?)\//;
const LOCALITY_SEARCH_TEXT_REGEX = /\/search\/(.+?)\//;
const LOCALITY_DATA_REGEX = /loc=!pid(.+?)!lat([-\d.]+)!lng([-\d.]+)/;


/**
 * Manages URL parameters.
 */
export class URLParameterManager<T extends AllowedParameters> {
    private parameters: T;
    private baseURL: string = '/storelocator/mapjs/'

    /**
     * Constructs a new URLParameterManager and loads parameters from the URL.
     */
    constructor() {
        this.parameters = {} as T;
        this.loadFromURL();

        // Listen for URL changes
        window.addEventListener("popstate", () => {
            this.loadFromURL();
        });
    }

    /**
     * Converts a Base64 string to a hexadecimal string.
     */
    static base64ToHex(str: string): string {
        const raw = atob(str);
        let result = '';
        for (let i = 0; i < raw.length; i++) {
            const hex = raw.charCodeAt(i).toString(16);
            result += (hex.length === 2 ? hex : '0' + hex);
        }
        return result;
    }

    /**
     * Converts a hexadecimal string to a Base64 string.
     */
    static hexToBase64(str: string): string {
        let raw = '';
        for (let i = 0; i < str.length; i += 2) {
            raw += String.fromCharCode(parseInt(str.substr(i, 2), 16));
        }
        return btoa(raw);
    }

    /**
     * Rounds a number to the specified number of decimal places.
     * @param {number} value - The number to round.
     * @param {number} decimals - The number of decimal places.
     * @return {number} The rounded number.
     */
    private roundToN = (value: number | string, decimals: number): number => {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return +(Math.round(Number(num + `e+${decimals}`)) + `e-${decimals}`);
    }

    /**
     * Loads parameters from the URL.
     */
    private loadFromURL(): void {
        // Parse query parameters
        const searchParams = new URLSearchParams(window.location.search);
        this.parameters = {} as T;

        [...searchParams.keys()].forEach((key: string) => {
            const value = searchParams.get(key);
            if (value !== null) {
                this.parameters[key as keyof T] = value as T[keyof T];
            }
        });

        // Parse URL path to extract searchText and location
        const path = window.location.pathname;
        this.parseDirection(path);
        this.parseStoreId(path);
        this.parseLocation(path);
        this.parseLocalitySearchText(path);
        this.parseLocalityData(path)
    }


    /**
     * Parses a value from the URL path using a regular expression.
     * @param {string} path - The URL path.
     * @param {RegExp} regex - The regular expression to use.
     * @param {(match: RegExpMatchArray) => void} processMatch - The function to process the match.
     */
    private parseValueFromPath(path: string, regex: RegExp, processMatch: (match: RegExpMatchArray) => void): void {
        const match = regex.exec(path);
        if (match) {
            try {
                processMatch(match);
            } catch (error) {
                console.error(`Error processing match for regex ${regex}: ${error}`);
            }
        }
    }

    /**
     * Parses the location from the URL path.
     * @param {string} path - The URL path.
     */
    private parseLocation(path: string): void {
        this.parseValueFromPath(path, LOCATION_REGEX, match => {
            this.parameters.location = {
                latitude: this.roundToN(match[1], 6),
                longitude: this.roundToN(match[2], 6),
                zoom: this.roundToN(match[3], 2),
            };
        });
    }

    /**
     * Parses the direction from the URL path.
     * @param {string} path - The URL path.
     */
    private parseDirection(path: string): void {
        this.parseValueFromPath(path, DIRECTION_REGEX, match => {
            if (match) {
                this.parameters.direction = {
                    from: {
                        name: decodeURIComponent(match[1]) || undefined,
                        location: match[2] ? {
                            lat: parseFloat(match[2]),
                            lng: parseFloat(match[3]),
                        } : undefined,
                    },
                    to: {
                        name: decodeURIComponent(match[4]) || undefined,
                        location: match[5] ? {
                            lat: parseFloat(match[5]),
                            lng: parseFloat(match[6]),
                        } : undefined,
                    },
                };
                if (!this.parameters.direction.from?.location && !this.parameters.direction.from?.name) {
                    this.parameters.direction.from = undefined;
                }
                if (!this.parameters.direction.to?.location && !this.parameters.direction.to?.name) {
                    this.parameters.direction.to = undefined;
                }
            }
        });
    }

    /**
     * Parses the store ID from the URL path.
     * @param {string} path - The URL path.
     */
    private parseStoreId(path: string): void {
        this.parseValueFromPath(path, STORE_ID_REGEX, match => {
            this.parameters.storeId = decodeURIComponent(match[1]);
        });
    }


    /**
     * Parses the locality searchText from the URL path.
     * @param {string} path - The URL path.
     */
    private parseLocalitySearchText(path: string): void {
        this.parseValueFromPath(path, LOCALITY_SEARCH_TEXT_REGEX, match => {
            if (match) {
                this.parameters.locality = {
                    name: decodeURIComponent(match[1]),
                    publicId: undefined,
                    location: undefined
                };
            }
        });
    }

    /**
     * Parses the locality data from the URL path.
     * @param {string} path - The URL path.
     */
    private parseLocalityData(path: string): void {
        this.parseValueFromPath(path, LOCALITY_DATA_REGEX, match => {
            if (match) {
                if (!this.parameters.locality) {
                    this.parameters.locality = {
                        name: undefined,
                        publicId: undefined,
                        location: undefined
                    };
                }
                this.parameters.locality.publicId = URLParameterManager.hexToBase64(match[1]);
                this.parameters.locality.location = {
                    lat: parseFloat(match[2]),
                    lng: parseFloat(match[3]),
                };
            }
        });

    }

    /**
     * Updates the URL with the current parameters.
     */
    private updateURL(): void {
        let urlPath = this.baseURL;
        let dataParam = '';

        if (this.parameters.direction) {
            urlPath += this.getDirectionPath();
        } else if (this.parameters.storeId) {
            urlPath += this.getStorePath();
        } else if (this.parameters.locality) {
            const {localityPath, data} = this.getLocalityPath();
            urlPath += localityPath;
            dataParam = data;
        }

        if (this.parameters.location) {
            urlPath += this.getLocationPath();
        }

        if (dataParam) {
            urlPath += dataParam;
        }

        window.history.pushState(this.parameters, '', urlPath);
    }

    /**
     * Gets the store path.
     * @private
     */
    private getStorePath(): string {
        return `store/${this.parameters.storeId}/`;
    }


    /**
     * Gets the locality path and data param.
     * @private
     */
    private getLocalityPath(): { localityPath: string, data: string } {
        let localityPath = '';
        let data = '';
        if (this.parameters.locality) {
            if (this.parameters.locality.name) {
                localityPath += `search/${encodeURIComponent(this.parameters.locality.name)}/`;
            }
            if (this.parameters.locality.publicId) {
                const pid = URLParameterManager.base64ToHex(this.parameters.locality.publicId);
                data = this.parameters.locality.location ?
                    `loc=!pid${pid}!lat${this.parameters.locality.location.lat}!lng${this.parameters.locality.location.lng}/` :
                    `loc=!pid${pid}/`;
            }
        }
        return {localityPath, data};
    }

    /**
     * Gets the direction path.
     * @private
     */
    private getDirectionPath(): string {
        let path = '';
        if (this.parameters.direction?.from || this.parameters.direction?.to) {
            path += 'direction/';
            const fromName = this.parameters.direction?.from?.name ?? '';
            const fromLatLng = this.parameters.direction?.from?.location
                ? `${this.parameters.direction.from.location.lat},${this.parameters.direction.from.location.lng}`
                : '';
            const toName = this.parameters.direction?.to?.name ?? '';
            const toLatLng = this.parameters.direction?.to?.location
                ? `${this.parameters.direction.to.location.lat},${this.parameters.direction.to.location.lng}`
                : '';

            path += `${encodeURIComponent(fromName)}/${fromLatLng}/${encodeURIComponent(toName)}/${toLatLng}/`;
        }
        return path;
    }

    /**
     * Gets the location path.
     * @private
     */
    private getLocationPath(): string {
        if (this.parameters.location) {
            return `@${this.parameters.location.latitude},${this.parameters.location.longitude},${this.parameters.location.zoom}/`;
        }
        return '';
    }

    /**
     * Sets a new location in the URL.
     * @param {Location} location - The new location.
     */
    public setLocation(location: MapLocation): void {
        this.parameters.location = {
            latitude: this.roundToN(location.latitude, 6),
            longitude: this.roundToN(location.longitude, 6),
            zoom: this.roundToN(location.zoom, 2),
        };
        this.updateURL();
    }

    /**
     * Returns the location from the URL parameters.
     * @return {Location | undefined} The location, or undefined if no location is set.
     */
    public getLocation(): MapLocation | undefined {
        return this.parameters.location;
    }

    /**
     * Gets the store ID.
     * @returns {string | undefined} The store ID.
     */
    public getStoreId(): string | undefined {
        return this.parameters.storeId;
    }

    /**
     * Sets a new store ID.
     * @param {string | undefined} storeId - The new store ID.
     */
    public setStoreId(storeId: string | undefined): void {
        this.parameters.storeId = storeId;
        this.updateURL();
    }

    /**
     * Gets the locality.
     * @returns {SearchLocation | undefined} The locality.
     */
    public getLocality(): SearchLocation | undefined {
        return this.parameters.locality;
    }

    /**
     * Sets a new locality.
     * @param {SearchLocation | undefined} locality - The new locality.
     */
    public setLocality(locality: SearchLocation | undefined): void {
        if (locality) {
            this.parameters.locality = {
                name: locality.name,
                publicId: locality.publicId,
                location: locality.location ? {
                    lat: this.roundToN(locality.location.lat, 6),
                    lng: this.roundToN(locality.location.lng, 6)
                } : undefined
            };
        } else {
            this.parameters.locality = undefined;
        }
        this.updateURL();
    }

    /**
     * Gets the direction.
     * @returns {Direction | undefined} The direction.
     */
    public getDirection(): Direction | undefined {
        return this.parameters.direction;
    }

    /**
     * Sets a new direction.
     * @param {Direction | undefined} direction - The new direction.
     */
    public setDirection(direction: Direction | undefined): void {
        if (direction) {
            const fromLocation = direction.from?.location ? {
                lat: this.roundToN(direction.from?.location.lat, 6),
                lng: this.roundToN(direction.from?.location.lng, 6)
            } : undefined;
            const fromName = direction.from?.name && direction.from?.name !== '' ? direction.from?.name : undefined;

            const toLocation = direction.to?.location ? {
                lat: this.roundToN(direction.to?.location.lat, 6),
                lng: this.roundToN(direction.to?.location.lng, 6)
            } : undefined;
            const toName = direction.to?.name && direction.to?.name !== '' ? direction.to?.name : undefined;

            this.parameters.direction = {
                from: (fromLocation || fromName) ? {location: fromLocation, name: fromName} : undefined,
                to: (toLocation || toName) ? {location: toLocation, name: toName} : undefined,
            };
        } else {
            this.parameters.direction = undefined;
        }
        this.updateURL();
    }
}

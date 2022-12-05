export enum GeolocationError {
    Unavailable = 'Unavailable',
    PermissionDenied = 'PermissionDenied',
    PositionUnavailable = 'PositionUnavailable',
    Timeout = 'Timeout',
    Default = 'Default'
}

export interface GenericPosition {
    name: string;
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy?: number;
    timestamp: number;
}


export class GeolocationService {

    public static GeolocationOptions: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 30000
    };

    static async getCurrentPosition(): Promise<GeolocationPosition> {
        try {
            return await new Promise((resolve: PositionCallback, reject) => {
                GeolocationService.getNavigatorGeolocation().getCurrentPosition(resolve, reject, GeolocationService.GeolocationOptions);
            });
        } catch (error) {
            throw new Error(GeolocationService.getGeolocationError(<GeolocationPositionError>error));
        }
    }

    static getNavigatorGeolocation(): Geolocation {
        if (!navigator.geolocation) {
            throw new Error(GeolocationError.Unavailable);
        }
        return navigator.geolocation;
    }

    static isGeolocationError(error: unknown): error is GeolocationPositionError {
        return typeof error === 'object' && 'PERMISSION_DENIED' in <GeolocationPositionError>error
    }

    static getGeolocationError(error: GeolocationPositionError | Error ): GeolocationError {
        console.error('Geolocation failed', error);
        if (GeolocationService.isGeolocationError(error)) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    return GeolocationError.PermissionDenied;
                case error.POSITION_UNAVAILABLE:
                    return GeolocationError.PositionUnavailable;
                case error.TIMEOUT:
                    return GeolocationError.Timeout;
                default:
                    return GeolocationError.Default;
            }
        } else if (error.message === GeolocationError.Unavailable) {
            return GeolocationError.Unavailable;
        } else {
            return GeolocationError.Default;
        }
    }
}

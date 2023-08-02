import Component from "../component";
import {GenericPosition, GeolocationError, GeolocationService} from "../../services/geolocation";
import {getLocale} from "../../helpers/locale";

export interface IGeolocateComponent {
    position?: GenericPosition;
    error?: GeolocationError | undefined;
}

export enum GeolocateComponentEvents {
    GEOLOCATION_FOUND = "geolocation_found",
    GEOLOCATION_ERROR = "geolocation_error",
}


export default class GeolocateComponent extends Component<IGeolocateComponent> {
    init(): void {
        this.$element = <HTMLDivElement>document.createElement("div");
    }

    render(): void {
        if (this.state && this.$element) {
            this.$element.className = "search__geolocateBtn";
            this.$element.innerHTML = `<button type="button" aria-label="${getLocale().search.yourLocation}"></button>`
            this.$element.addEventListener("click", async () => {
                this.$element.classList.add("active");
                await this.getLocation().then(() => {
                    this.$element.classList.remove("active");
                });
            });
            this.$target.appendChild(this.$element);
        }
    }

    setPosition(geoPosition: GeolocationPosition): void {
        const {latitude, longitude, altitude, accuracy} = geoPosition.coords;
        this.setState({
            position: {
                name: getLocale().search.yourLocation,
                timestamp: Date.now(),
                latitude,
                longitude,
                altitude,
                accuracy
            }
        }, true, () => {
            this.emit(GeolocateComponentEvents.GEOLOCATION_FOUND, this.state.position)
        })
    }

    async getLocation(): Promise<void> {
        try {
            const position = await GeolocationService.getCurrentPosition();
            this.setPosition(position);
        } catch (error) {
            this.onGeolocationError(<GeolocationError>error);
        }
    }

    onGeolocationError(error: GeolocationError): void {
        this.setState({error: error, position: undefined}, true, () => {
            this.emit(GeolocateComponentEvents.GEOLOCATION_ERROR)
        })
    }
}

import Component from '../component';
import Urls from "../../configuration/urls.config";
import {loadScript} from '../../utils/load_script';
import Selectors from "../../configuration/selectors.config";
import {AssetFeatureResponse} from "../../types/stores/asset_response";

export interface IMapComponent {
    woosmapPublicKey: string;
    mapOptions: woosmap.map.MapOptions;
    storesStyle: woosmap.map.Style;
    nearbyLocation?: woosmap.map.LatLngLiteral;
}

export default class MapComponent extends Component<IMapComponent> {
    private map!: woosmap.map.Map;
    private storesOverlay!: woosmap.map.StoresOverlay;

    init(): void {
        this.$element = document.createElement('div');
        this.$element.id = Selectors.mapWrapperID;
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            loadScript({url: Urls.mapJS, attributes: {"key": this.state.woosmapPublicKey}})
                .then(() => {
                    this.initMapView();
                })
                .catch((error) => {
                    console.error("failed to load the Woosmap Map JS SDK script", error);
                });
        }
    }

    initMapView(): void {
        this.map = new woosmap.map.Map(Selectors.mapWrapperID, this.state.mapOptions);
        this.storesOverlay = new woosmap.map.StoresOverlay(this.state.storesStyle);
        this.storesOverlay.setMap(this.map);
    }

    setCenter(location: woosmap.map.LatLngLiteral): void {
        this.map.setCenter(location);
    }

    setSelectedStore(store: AssetFeatureResponse): void {
        const latlng: woosmap.map.LatLngLiteral = {
            lat: store.geometry.coordinates[1],
            lng: store.geometry.coordinates[0]
        }
        this.map.setCenter(latlng)
        this.map.setZoom(14)
    }
}

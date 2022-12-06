import Component from "../component";
import Urls from "../../configuration/urls.config";
import {loadScript} from "../../utils/load_script";
import Selectors from "../../configuration/selectors.config";
import {AssetFeatureResponse} from "../../types/stores";
import GeoJSONFeature = woosmap.map.GeoJSONFeature;
import Styler from "../../helpers/styler";

export interface IMapComponent {
    woosmapPublicKey: string;
    mapOptions: woosmap.map.MapOptions;
    storesStyle: woosmap.map.Style;
    nearbyLocation?: woosmap.map.LatLngLiteral;
    selectedStore?: AssetFeatureResponse;
    stores?: woosmap.map.GeoJSONFeature[];
    query?: string;
    padding: woosmap.map.Padding;
}

export enum MapComponentEvents {
    STORES_CHANGED = "stores_changed",
    STORE_SELECTED = "store_selected",
    STORE_UNSELECTED = "store_unselected",
    FILTERS_UPDATED = "filters_updated",
    MAP_READY = "map_ready"
}

export default class MapComponent extends Component<IMapComponent> {
    public map!: woosmap.map.Map;
    private storesOverlay!: woosmap.map.StoresOverlay;
    private data!: woosmap.map.Data;
    private styler!: Styler;

    init(): void {
        this.$element = document.createElement("div");
        this.$element.id = Selectors.mapWrapperID;
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            loadScript({
                url: Urls.mapJS,
                attributes: {key: this.state.woosmapPublicKey},
            })
                .then(() => {
                    this.initMapView();
                })
                .catch((error) => {
                    console.error("failed to load the Woosmap Map JS SDK script", error);
                });
        }
    }

    initMapView(): void {
        this.map = new woosmap.map.Map(
            Selectors.mapWrapperID,
            this.state.mapOptions
        );
        this.styler = new Styler(this.state.storesStyle);
        this.storesOverlay = new woosmap.map.StoresOverlay(this.state.storesStyle);
        this.storesOverlay.setMap(this.map);
        this.data = new woosmap.map.Data();
        this.data.addListener("click", (data) => {
            const feature: woosmap.map.data.Feature = data.feature;
            feature.toGeoJson((geojson) => {
                this.handleSelectedStore(geojson as AssetFeatureResponse);
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.data.revertStyle();
            this.data.overrideStyle(
                feature,
                this.styler.getStyledIcon({
                    types: (feature as unknown as AssetFeatureResponse).properties.types,
                    selected: true,
                })
            );
        });
        this.data.setStyle((feature) => {
            return this.styler.getStyledIcon({
                types: (feature as unknown as AssetFeatureResponse).properties.types,
            });
        });
        woosmap.map.event.addListener(this.map, "store_selected", (store) => {
            this.handleSelectedStore(store);
        });

        this.on(MapComponentEvents.STORES_CHANGED, () => {
            this.handleStores();
        });
        this.on(MapComponentEvents.STORE_SELECTED, () => {
            this.selectStore();
        });
        this.on(MapComponentEvents.STORE_UNSELECTED, () => {
            this.selectStore();
        });
        this.on(MapComponentEvents.FILTERS_UPDATED, () => {
            this.updateFilters();
        });
        this.emit(MapComponentEvents.MAP_READY);
    }

    handleSelectedStore(store: AssetFeatureResponse): void {
        this.setState({selectedStore: store}, true, () => {
            this.emit(MapComponentEvents.STORE_SELECTED, this.state.selectedStore);
        });
    }

    handleStores(): void {
        if (this.state.stores) {
            if (this.state.stores.length > 0) {
                this.data.setMap(this.map);
                this.data.forEach((feature) => this.data.remove(feature));

                //create a deepCopy instead of shallowCopy to avoid modifying this.state.stores
                const features: GeoJSONFeature[] = JSON.parse(
                    JSON.stringify(this.state.stores)
                );
                this.data.addGeoJson(
                    {
                        type: "FeatureCollection",
                        features: features,
                    },
                    {idPropertyName: "store_id"}
                );

                const bounds = new woosmap.map.LatLngBounds();

                this.data.forEach((feature) => {
                    const LatLngPoint = feature.getGeometry() as woosmap.map.Data.Point;
                    bounds.extend(LatLngPoint.get());
                });
                this.map.fitBounds(bounds, this.state.padding);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.storesOverlay.setMap(null);
            } else {
                this.storesOverlay.setMap(this.map);
                this.data.setMap(null);
            }
        }
    }

    selectStoreOnDataOverlay(): void {
        const selectedStore: AssetFeatureResponse = JSON.parse(
            JSON.stringify(this.state.selectedStore)
        );
        const feature: woosmap.map.data.Feature | null = this.data.getFeatureById(
            selectedStore.properties.store_id
        );
        if (feature) {
            this.data.addGeoJson(selectedStore, {idPropertyName: "store_id"});
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.data.revertStyle();
            this.data.overrideStyle(feature, this.styler.getStyledIcon({
                    types: (feature as unknown as AssetFeatureResponse).properties.types,
                    selected: true,
                })
            );
        }
    }

    selectStore(): void {
        if (this.state.selectedStore) {
            const visibleBounds = this.map.getBounds(this.state.padding);
            const selectedStore = this.state.selectedStore;
            this.selectStoreOnDataOverlay();
            const latLng: woosmap.map.LatLngLiteral = {
                lng: selectedStore.geometry.coordinates[0],
                lat: selectedStore.geometry.coordinates[1],
            };
            if (latLng) {
                if (!visibleBounds.contains(latLng)) {
                    this.map.panTo(latLng, this.state.padding);
                }
            }
        } else {
            this.storesOverlay.clearSelection();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.data.revertStyle();
            this.handleStores();
        }
    }

    updateFilters(): void {
        if (this.state.query) {
            this.storesOverlay.setQuery(this.state.query);
        } else {
            this.storesOverlay.setQuery(undefined);
        }
    }
}

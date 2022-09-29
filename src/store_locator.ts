import Selectors from './configuration/selectors.config';
import {WoosmapPublicKey, MapOptions, StoresStyle} from './configuration/map.config';
import MapComponent from "./components/map/map";
import SearchComponent from "./components/search/search";
import StoresListComponent from "./components/storeslist/stores_list";
import {WoosmapApiClient} from "./services/woosmap_stores";


import "./styles/main.scss";
import {AssetFeatureResponse, AssetResponse} from "./types/stores/asset_response";

export default class StoreLocator {
    private state = {};
    private api: WoosmapApiClient;

    constructor(private $storelocator: HTMLDivElement) {
        this.api = new WoosmapApiClient(WoosmapPublicKey);
        window.addEventListener('DOMContentLoaded', () => {
            this.$storelocator.innerHTML = '';
            this.$storelocator.insertAdjacentHTML('afterbegin', this.getHTMLSkeleton());
            const searchComponent = new SearchComponent({
                $target: document.getElementById(Selectors.searchWrapperID)!,
                initialState: {
                    woosmapPublicKey: WoosmapPublicKey,
                    searchOptions: {}
                },
            })
            const mapComponent = new MapComponent({
                $target: document.getElementById(Selectors.mapContainerID)!,
                initialState: {
                    woosmapPublicKey: WoosmapPublicKey,
                    mapOptions: MapOptions,
                    storesStyle: StoresStyle
                }
            })
            const storesListComponent = new StoresListComponent({
                $target: document.getElementById(Selectors.listStoresContainerID)!,
                initialState: {
                    stores: []
                }
            })
            searchComponent.on('selected_locality', (locality: woosmap.localities.DetailsResponseItem) => {
                const location: woosmap.map.LatLngLiteral = locality.geometry.location;
                mapComponent.setCenter(location)
                this.api.searchStores({lat: location.lat, lng: location.lng})
                    .then(response => {
                        const storesList = response!.features!.map((store) => store);
                        storesListComponent.setState({stores: storesList})
                    }).catch(exception => {
                    console.error(exception);
                });
            })
            storesListComponent.on('selected_store', (selectedStore: AssetFeatureResponse) => {
                mapComponent.setSelectedStore(selectedStore)
            })
        });
    }

    setState(nextState: {}) {
        this.state = {...this.state, ...nextState};
        this.render();
    }

    render() {
    }

    getHTMLSkeleton() {
        return `
        <div id="${Selectors.mapContainerID}"></div>
        <div id="${Selectors.sidebarContainerID}">
           <div id="${Selectors.searchContainerID}">
              <div id="${Selectors.searchWrapperID}"></div>
           </div>
           <div id="${Selectors.listStoresContainerID}"></div>
           <div id="${Selectors.detailsStoreContainerID}"></div>
        </div>
        <div id="${Selectors.filterPanelContainerID}"></div>`;
    }
}

import Selectors from './configuration/selectors.config';
import {WoosmapPublicKey, MapOptions, StoresStyle} from './configuration/map.config';
import {LocalitiesConf, SearchAPIParameters} from "./configuration/search.config";
import {AssetFeatureResponse} from "./types/stores/asset_response";
import Component from "./components/component";
import MapComponent from "./components/map/map";
import SearchComponent from "./components/search/search";
import StoreDetailsComponent from "./components/storedetails/store_details";
import StoresListComponent from "./components/storeslist/stores_list";
import {WoosmapApiClient} from "./services/woosmap_stores";
import "./styles/main.scss";

export interface IStoreLocator {
    initialSearch?: string,
    showList?: boolean,
    showSelected?: boolean,
}

export default class StoreLocator extends Component<IStoreLocator> {
    private api!: WoosmapApiClient;

    init(): void {
        this.api = new WoosmapApiClient(WoosmapPublicKey);
        this.state = {
            showList: false,
            showSelected: false,
        };
    }

    render(): void {
        window.addEventListener('DOMContentLoaded', () => {
            this.$target.innerHTML = '';
            this.$target.insertAdjacentHTML('afterbegin', this.getHTMLSkeleton());
            const searchComponent = new SearchComponent({
                $target: document.getElementById(Selectors.searchWrapperID) as HTMLElement,
                initialState: {
                    woosmapPublicKey: WoosmapPublicKey,
                    searchOptions: LocalitiesConf
                },
            })
            const mapComponent = new MapComponent({
                $target: document.getElementById(Selectors.mapContainerID) as HTMLElement,
                initialState: {
                    woosmapPublicKey: WoosmapPublicKey,
                    mapOptions: MapOptions,
                    storesStyle: StoresStyle
                }
            })
            const storesListComponent = new StoresListComponent({
                $target: document.getElementById(Selectors.listStoresContainerID) as HTMLElement,
                initialState: {
                    stores: []
                }
            })
            const storeDetailsComponent = new StoreDetailsComponent({
                $target: document.getElementById(Selectors.detailsStoreContainerID) as HTMLElement,
                initialState: {}
            })
            searchComponent.on('selected_locality', (locality: woosmap.localities.DetailsResponseItem) => {
                const location: woosmap.map.LatLngLiteral = locality.geometry.location;
                this.api.searchStores(Object.assign(SearchAPIParameters, {lat: location.lat, lng: location.lng}))
                    .then(response => {
                        const storesList = response?.features.map((store) => store);
                        storeDetailsComponent.hide();
                        storesListComponent.setState({stores: storesList})
                        mapComponent.setState({stores: storesList}, true, () => mapComponent.emit('stores_changed'))
                        storesListComponent.show();

                    }).catch(exception => {
                    console.error(exception);
                });
            })
            storesListComponent.on('store_selected', (selectedStore: AssetFeatureResponse) => {
                storesListComponent.hide()
                storeDetailsComponent.setState({store: selectedStore})
                storeDetailsComponent.show()
                mapComponent.setState({selectedStore: selectedStore}, true, () => mapComponent.emit('store_selected'))
            })
            storeDetailsComponent.on('back', () => {
                storeDetailsComponent.hide()
                storesListComponent.show()
                mapComponent.setState({selectedStore: null}, true, () => mapComponent.emit('store_unselected'))
            })
            mapComponent.on('store_selected', (selectedStore: AssetFeatureResponse) => {
                storesListComponent.hide()
                storeDetailsComponent.setState({store: selectedStore})
                storeDetailsComponent.show()
            })
        });
    }

    getHTMLSkeleton(): string {
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

import Selectors from './configuration/selectors.config';
import {WoosmapPublicKey, MapOptions, StoresStyle} from './configuration/map.config';
import {availableServices, LocalitiesConf} from "./configuration/search.config";
import {AssetFeatureResponse} from "./types/stores/asset_response";
import Component from "./components/component";
import MapComponent from "./components/map/map";
import SearchComponent from "./components/search/search";
import StoreDetailsComponent from "./components/storedetails/store_details";
import StoresListComponent from "./components/storeslist/stores_list";
import "./styles/main.scss";
import FilterComponent from "./components/filter/filter";
import GeoJSONFeature = woosmap.map.GeoJSONFeature;

export interface IStoreLocator {
    initialSearch?: string,
}

export default class StoreLocator extends Component<IStoreLocator> {
    $sidebarContainer!: HTMLElement;

    init(): void {
        this.state = {};
    }

    render(): void {
        window.addEventListener('DOMContentLoaded', () => {
            this.$target.innerHTML = '';
            this.$target.insertAdjacentHTML('afterbegin', this.getHTMLSkeleton());
            this.$sidebarContainer = document.getElementById(Selectors.sidebarContentContainerID) as HTMLElement;
            this.styleOnScroll();
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
                initialState: {}
            })
            const storeDetailsComponent = new StoreDetailsComponent({
                $target: document.getElementById(Selectors.detailsStoreContainerID) as HTMLElement,
                initialState: {}
            })
            let filterComponent: FilterComponent;
            if (availableServices.length) {
                filterComponent = new FilterComponent({
                    $target: document.getElementById(Selectors.filterPanelContainerID) as HTMLElement,
                    initialState: {}
                })
                filterComponent.on('filters_updated', (queryString) => {
                    storesListComponent.setState({query: queryString}, true, () => storesListComponent.emit('query_changed'));
                    mapComponent.setState({query: queryString}, true, () => mapComponent.emit('filters_updated'))
                })
            }

            searchComponent.on('selected_locality', (locality: woosmap.localities.DetailsResponseItem) => {
                const location: woosmap.map.LatLngLiteral = locality.geometry.location;
                storeDetailsComponent.setState({store: undefined})
                storesListComponent.setState({nearbyLocation: location}, true, () => storesListComponent.emit('locality_changed'))
                this.setListView()
            })

            storesListComponent.on('stores_changed', (stores: GeoJSONFeature[]) => {
                mapComponent.setState({selectedStore: undefined}, true)
                mapComponent.setState({stores: stores}, true, () => mapComponent.emit('stores_changed'))
                this.setListView()
            })

            storesListComponent.on('store_selected', (selectedStore: AssetFeatureResponse) => {
                storeDetailsComponent.setState({store: selectedStore})
                mapComponent.setState({selectedStore: selectedStore}, true, () => mapComponent.emit('store_selected'))
                this.setDetailsView()
            })

            storeDetailsComponent.on('back', () => {
                mapComponent.setState({selectedStore: undefined}, true, () => mapComponent.emit('store_unselected'))
                this.setListView()
            })
            mapComponent.on('store_selected', (selectedStore: AssetFeatureResponse) => {
                storeDetailsComponent.setState({store: selectedStore})
                this.setDetailsView()
            })
        });
    }


    setDetailsView(): void {
        this.$sidebarContainer.classList.remove('list_view');
        this.$sidebarContainer.classList.add('details_view');
    }

    setListView(): void {
        this.$sidebarContainer.classList.remove('details_view');
        this.$sidebarContainer.classList.add('list_view');
    }

    styleOnScroll(): void {
        this.$sidebarContainer?.addEventListener('scroll', () => {
            const scroll = this.$sidebarContainer.scrollTop;
            if (scroll > 0) {
                this.$sidebarContainer.classList.add('active');
            } else {
                this.$sidebarContainer.classList.remove("active");
            }
        });
    }

    getHTMLSkeleton(): string {
        return `
        <div id="${Selectors.mapContainerID}"></div>
        <div id="${Selectors.sidebarContainerID}">
           <div id="${Selectors.searchContainerID}">
              <div id="${Selectors.searchWrapperID}"></div>
           </div>
           <div id="${Selectors.sidebarContentContainerID}">
               <div id="${Selectors.filterPanelContainerID}"></div>
               <div id="${Selectors.listStoresContainerID}"></div>
               <div id="${Selectors.detailsStoreContainerID}"></div>
           </div>
        </div>`;
    }
}

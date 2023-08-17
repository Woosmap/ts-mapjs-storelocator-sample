import Selectors from "./configuration/selectors.config";
import {WoosmapPublicKey, MapOptions, StoresStyle, mobileBreakPoint, mapPaddings,} from "./configuration/map.config";
import {availableServices, LocalitiesConf,} from "./configuration/search.config";
import {AssetFeatureResponse} from "./types/stores";
import Component from "./components/component";
import MapComponent, {MapComponentEvents} from "./components/map/map";
import SearchComponent, {SearchComponentEvents, SearchLocation} from "./components/search/search";
import StoreDetailsComponent, {StoreDetailsComponentEvents} from "./components/storedetails/store_details";
import StoresListComponent, {StoresListComponentEvents} from "./components/storeslist/stores_list";
import "./styles/main.scss";
import FilterComponent, {FilterComponentEvents} from "./components/filter/filter";
import GeoJSONFeature = woosmap.map.GeoJSONFeature;
import DirectionsComponent, {DirectionsComponentEvents} from "./components/directions/directions";
import {directionsOptions} from "./configuration/directions.config";
import {SYSTEM_LANG, setUserLocale} from './helpers/locale';
import {debounce} from "./utils/utils";

export interface IStoreLocator {
    initialSearch?: string;
    locale?: string;
    padding: woosmap.map.Padding;
    enableHistory?: boolean;
}

export enum StoreLocatorEvents {
    PADDING_CHANGED = "padding_changed",
    STORES_SEARCHED = "stores_searched"
}

export enum StoreLocatorViews {
    DETAILS_VIEW = "details_view",
    LIST_VIEW = "list_view",
    DIRECTIONS_VIEW = "directions_view",
    ROADBOOK_VIEW = "roadbook_view",
}

export default class StoreLocator extends Component<IStoreLocator> {
    public searchComponent!: SearchComponent;
    public mapComponent!: MapComponent;
    public directionsComponent!: DirectionsComponent;
    public storesListComponent!: StoresListComponent;
    public storeDetailsComponent!: StoreDetailsComponent;
    public filterComponent!: FilterComponent;
    private $sidebarContentContainer!: HTMLElement;
    private storesResults!: GeoJSONFeature[];
    private selectedStore!: AssetFeatureResponse;
    private selectedLocality!:string;

    init(): void {
        setUserLocale(this.state.locale || SYSTEM_LANG);

    }

    render(): void {
        this.$target.innerHTML = "";
        this.$target.insertAdjacentHTML("afterbegin", this.getHTMLSkeleton());
        this.$sidebarContentContainer = document.getElementById(
            Selectors.sidebarContentContainerID
        ) as HTMLElement;
        this.styleOnScroll();
        this.searchComponent = new SearchComponent({
            $target: document.getElementById(
                Selectors.searchWrapperID
            ) as HTMLElement,
            initialState: {
                inputID: Selectors.searchInputID,
                woosmapPublicKey: WoosmapPublicKey,
                searchOptions: LocalitiesConf,
                featuresBtn: ["search", "clear", "geolocate"]
            },
        });
        this.mapComponent = new MapComponent({
            $target: document.getElementById(Selectors.mapContainerID) as HTMLElement,
            initialState: {
                woosmapPublicKey: WoosmapPublicKey,
                mapOptions: MapOptions,
                storesStyle: StoresStyle,
                padding: this.state.padding,
            },
        });
        this.directionsComponent = new DirectionsComponent({
            $target: document.getElementById(
                Selectors.directionsContainerID
            ) as HTMLElement,
            initialState: {
                padding: this.state.padding,
                provideRouteAlternatives: directionsOptions.provideRouteAlternatives as boolean,
                travelMode: directionsOptions.travelMode as woosmap.map.TravelMode,
                unitSystem: directionsOptions.unitSystem as woosmap.map.UnitSystem,
                avoid: directionsOptions.avoid as string[],
                selectedRouteIndex: 0
            },
        });
        this.storesListComponent = new StoresListComponent({
            $target: document.getElementById(
                Selectors.listStoresContainerID
            ) as HTMLElement,
            initialState: {
            },
        });
        this.storeDetailsComponent = new StoreDetailsComponent({
            $target: document.getElementById(
                Selectors.detailsStoreContainerID
            ) as HTMLElement,
            initialState: {},
        });
        if (availableServices.length) {
            this.filterComponent = new FilterComponent({
                $target: document.getElementById(
                    Selectors.filterPanelContainerID
                ) as HTMLElement,
                initialState: {},
            });
            this.filterComponent.on(FilterComponentEvents.FILTERS_UPDATED, (queryString) => {
                this.storesListComponent.setState({query: queryString}, true, () =>
                    this.storesListComponent.emit(StoresListComponentEvents.QUERY_CHANGED)
                );
                this.mapComponent.setState({query: queryString}, true, () =>
                    this.mapComponent.emit(MapComponentEvents.FILTERS_UPDATED)
                );
            });
        }
        this.searchComponent.on(SearchComponentEvents.SELECTED_LOCALITY, (locality: SearchLocation) => {
                this.storeDetailsComponent.setState({store: undefined});
                this.storesListComponent.setState({nearbyLocation: locality.location}, true, () =>
                    this.storesListComponent.emit(StoresListComponentEvents.LOCALITY_CHANGED)
                );
                this.directionsComponent.setState({
                    origin: {location: locality.location, name: locality.name}
                }, true);
                this.selectedLocality = locality.name;
                this.setListView();
            }
        );
        this.searchComponent.on(SearchComponentEvents.SEARCH_CLEAR, () => {
                this.storesResults = [];
                this.storesListComponent.setState({nearbyLocation: undefined, stores: []});
                this.mapComponent.setState({selectedStore: undefined, stores: []}, true, () =>
                    this.mapComponent.emit(MapComponentEvents.STORES_CHANGED)
                );
                this.directionsComponent.setState({origin: undefined}, true);
                this.setListView();
                if(this.state.enableHistory){
                    this.setUserHistory();
                }
            }
        );
        this.storesListComponent.on(StoresListComponentEvents.STORES_CHANGED, (stores: GeoJSONFeature[]) => {
            this.mapComponent.setState({selectedStore: undefined}, true);
            this.mapComponent.setState({stores: stores}, true, () =>
                this.mapComponent.emit(MapComponentEvents.STORES_CHANGED)
            );
            this.storesResults = stores;
            this.setListView();
            if(this.state.enableHistory){
                this.setUserHistory();
            } 
            this.emit(StoreLocatorEvents.STORES_SEARCHED, stores);
           
        });
        this.storesListComponent.on(StoresListComponentEvents.STORE_SELECTED, (selectedStore: AssetFeatureResponse) => {
                this.storeDetailsComponent.setState({store: selectedStore});
                this.mapComponent.setState({selectedStore: selectedStore}, true, () =>
                    this.mapComponent.selectStore()
                );
                this.setDetailsView();    
                this.selectedStore = selectedStore;
                if(this.state.enableHistory){
                    this.setUserHistory();
                }       
            }
        );
        this.storesListComponent.on(StoresListComponentEvents.STORE_MOUSEENTER, debounce((selectedStore: AssetFeatureResponse) => {
            this.mapComponent.selectStoreOnDataOverlay(selectedStore);
        }, 50));
        this.storesListComponent.on(StoresListComponentEvents.STORE_MOUSELEAVE, debounce(() => {
            if (this.$target.className !== StoreLocatorViews.DETAILS_VIEW) {
                this.mapComponent.unselectStoreOnDataOverlay();
            }
        }, 50));
        this.storeDetailsComponent.on(StoreDetailsComponentEvents.BACK, () => {
            this.mapComponent.setState({selectedStore: undefined}, true, () =>
                this.mapComponent.emit(MapComponentEvents.STORE_UNSELECTED)
            );
            this.storesResults = [];
            this.setListView();
            this.setUserHistory();
        });
        this.mapComponent.on(MapComponentEvents.MAP_READY, () => {
            this.directionsComponent.emit(DirectionsComponentEvents.MAP_READY, this.mapComponent.map);
            if(this.state.enableHistory){
                this.getUserHistory();
            }
        });
        this.mapComponent.on(MapComponentEvents.STORE_UNSELECTED, () => {
            if (this.$target.className === StoreLocatorViews.DETAILS_VIEW) {
                this.setListView();
            }
        });
        this.storeDetailsComponent.on(StoreDetailsComponentEvents.DIRECTIONS_SHOW, (selectedStore: AssetFeatureResponse) => {
                const destination = {
                    name: selectedStore.properties.name,
                    location: {
                        lat: selectedStore.geometry.coordinates[1],
                        lng: selectedStore.geometry.coordinates[0],
                    },
                };
                if (this.directionsComponent.checkNeedUpdate({destination: destination})) {
                    this.directionsComponent.setState({destination: destination}, true, () =>
                        this.directionsComponent.emit(DirectionsComponentEvents.DESTINATION_CHANGED)
                    );
                } else {
                    this.directionsComponent.emit(DirectionsComponentEvents.DIRECTIONS_SHOW);
                }
                this.setDirectionsView();
            }
        );
        this.mapComponent.on(MapComponentEvents.STORE_SELECTED, (selectedStore: AssetFeatureResponse) => {
            if (selectedStore) {
                this.storeDetailsComponent.setState({store: selectedStore});
                if (this.$target.className === StoreLocatorViews.DIRECTIONS_VIEW || this.$target.className === StoreLocatorViews.ROADBOOK_VIEW) {
                    const destination = {
                        name: selectedStore.properties.name,
                        location: {
                            lat: selectedStore.geometry.coordinates[1],
                            lng: selectedStore.geometry.coordinates[0],
                        },
                    };
                    this.directionsComponent.setState({destination: destination}, true, () => {
                            this.directionsComponent.emit(DirectionsComponentEvents.DESTINATION_CHANGED)
                        }
                    );
                } else {
                    this.setDetailsView();
                    this.selectedStore = selectedStore;
                    if(this.state.enableHistory){
                        this.setUserHistory();
                    }
                }
            } else {
                this.setDetailsView();
            }
        });
        this.on(StoreLocatorEvents.PADDING_CHANGED, () => {
            this.directionsComponent.setState({padding: this.state.padding}, true);
            this.mapComponent.setState({padding: this.state.padding}, true);
        });

        this.directionsComponent.on(DirectionsComponentEvents.ROADBOOK_SHOW, () => {
            this.setRoadbookView();
        });
        this.directionsComponent.on(DirectionsComponentEvents.DIRECTIONS_SHOW, () => {
            this.setDirectionsView();
        });
        this.directionsComponent.on(DirectionsComponentEvents.CLOSE_DIRECTIONS, () => {
            this.setDetailsView();
        });
        window.addEventListener('resize', debounce(() => {
            this.managePadding();
        }, 100))
        this.managePadding();
    }
    setDetailsView(): void {
        this.$target.className = StoreLocatorViews.DETAILS_VIEW;
        this.$sidebarContentContainer.scrollTo(0, 0);
    }

    setListView(): void {
        this.$target.className = StoreLocatorViews.LIST_VIEW;
        this.$sidebarContentContainer.scrollTo(0, 0);
    }

    setDirectionsView(): void {
        this.$target.className = StoreLocatorViews.DIRECTIONS_VIEW;
    }

    setRoadbookView(): void {
        this.$target.className = StoreLocatorViews.ROADBOOK_VIEW;
    }

    styleOnScroll(): void {
        this.$sidebarContentContainer?.addEventListener("scroll", () => {
            const scroll = this.$sidebarContentContainer.scrollTop;
            if (scroll > 0) {
                this.$sidebarContentContainer.classList.add("active");
            } else {
                this.$sidebarContentContainer.classList.remove("active");
            }
        });
    }

    managePadding(): void {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        //On Mobile, padding from bottom to 56% of Store Locator height
        mapPaddings.mobile.bottom = Math.round((document.getElementById(Selectors.mapContainerID) as HTMLElement).clientHeight * 0.56);
        if (width >= mobileBreakPoint) {
            this.setState({padding: mapPaddings.full}, true, () => {
                this.emit(StoreLocatorEvents.PADDING_CHANGED)
            });
        } else {
            this.setState({padding: mapPaddings.mobile}, true, () => {
                this.emit(StoreLocatorEvents.PADDING_CHANGED)
            });
        }
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
        <div id="${Selectors.directionsContainerID}"></div>   
        <div id="${Selectors.roadbookContainerID}"></div>
        </div>`;
    }
    setUserHistory():void {
        const searchHistory = { stores: JSON.stringify(this.storesResults), 
                                locality: this.selectedLocality, 
                                selectedStore: JSON.stringify(this.selectedStore) };
        if(window.history.state){
            window.history.replaceState(searchHistory,'');
        }
        else{
            window.history.pushState(searchHistory,'');
        }   
    }
    getUserHistory():void {
        if(window.history && history.length > 1){
            const searchHistory = history.state;
            if(searchHistory && searchHistory.selectedStore){
                const selectedStore = JSON.parse(searchHistory.selectedStore);
                this.storeDetailsComponent.setState({store : selectedStore});
                this.mapComponent.setState({selectedStore: selectedStore}, true, () =>
                    this.mapComponent.selectStore()
                );
                if(searchHistory.stores){
                    this.mapComponent.setState({stores: JSON.parse(searchHistory.stores)}, true, () =>
                    this.mapComponent.emit(MapComponentEvents.STORES_CHANGED)
                );  
                } 
                this.setDetailsView();
                this.mapComponent.selectStoreOnDataOverlay(selectedStore); 
            }
            else {
                if(searchHistory && searchHistory.stores && JSON.parse(searchHistory.stores).length > 1){
                    this.storesListComponent.setState({stores : JSON.parse(searchHistory.stores)})
                    this.setListView();
                    searchHistory.locality &&this.searchComponent.setLocality(searchHistory.locality);  
                    this.mapComponent.setState({stores: JSON.parse(searchHistory.stores)}, true, () =>
                        this.mapComponent.emit(MapComponentEvents.STORES_CHANGED)
                    );                  
                }
                if(searchHistory.selectedStore){
                    const selectedStore = JSON.parse(searchHistory.selectedStore);
                    this.mapComponent.selectStoreOnDataOverlay(selectedStore); 
                }
            }
        }
    }
}

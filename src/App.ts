import {AssetFeatureResponse} from "./types/stores";
import Component from "./components/component";
import MapComponent, {MapComponentEvents, MapLocation} from "./components/map/map";
import SearchComponent, {SearchComponentEvents, SearchLocation} from "./components/search/search";
import StoreDetailsComponent, {StoreDetailsComponentEvents} from "./components/storedetails/store_details";
import StoresListComponent, {StoresListComponentEvents} from "./components/storeslist/stores_list";
import "./styles/main.scss";
import FilterComponent, {FilterComponentEvents} from "./components/filter/filter";
import DirectionsComponent, {DirectionsComponentEvents, IDirections} from "./components/directions/directions";
import {setUserLocale, SYSTEM_LANG} from './helpers/locale';
import {debounce} from "./utils/utils";
import {Configuration, getConfig, setConfig} from "./configuration/config";
import {AllowedParameters, URLParameterManager} from "./components/url_parameter_manager";
import {WoosmapApiClient} from "./services/woosmap_api";
import LatLngLiteral = woosmap.map.LatLngLiteral;

export interface IStoreLocator {
    initialSearch?: string;
    locale?: string;
    padding: woosmap.map.Padding;
    config?: Configuration;
}

export enum StoreLocatorEvents {
    PADDING_CHANGED = "padding_changed"
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
    private urlParameterManager!: URLParameterManager<AllowedParameters>;
    private userLocationMarker!: woosmap.map.Marker | null;

    init(): void {
        this.urlParameterManager = new URLParameterManager();
    }

    render(): void {
        setUserLocale(this.state.locale || SYSTEM_LANG);
        setConfig(this.state.config);
        this.$target.innerHTML = "";
        this.$target.insertAdjacentHTML("afterbegin", this.getHTMLSkeleton());
        this.$sidebarContentContainer = document.getElementById(
            getConfig().selectors.sidebarContentContainerID
        ) as HTMLElement;
        this.styleOnScroll();
        this.searchComponent = new SearchComponent({
            $target: document.getElementById(
                getConfig().selectors.searchWrapperID
            ) as HTMLElement,
            initialState: {
                inputID: getConfig().selectors.searchInputID,
                woosmapPublicKey: getConfig().map.woosmapPublicKey,
                searchOptions: getConfig().search.localitiesConf,
                featuresBtn: ["search", "clear", "geolocate"],
                selectedLocality: undefined,
            },
        });
        this.mapComponent = new MapComponent({
            $target: document.getElementById(getConfig().selectors.mapContainerID) as HTMLElement,
            initialState: {
                woosmapPublicKey: getConfig().map.woosmapPublicKey,
                mapOptions: getConfig().map.mapOptions,
                storesStyle: getConfig().map.storesStyle,
                padding: this.state.padding,
                location: this.urlParameterManager.getLocation()
            },
        });
        this.directionsComponent = new DirectionsComponent({
            $target: document.getElementById(
                getConfig().selectors.directionsContainerID
            ) as HTMLElement,
            initialState: {
                padding: this.state.padding,
                provideRouteAlternatives: getConfig().directions.directionsOptions.provideRouteAlternatives as boolean,
                travelMode: getConfig().directions.directionsOptions.travelMode as woosmap.map.TravelMode,
                unitSystem: getConfig().directions.directionsOptions.unitSystem as woosmap.map.UnitSystem,
                avoid: getConfig().directions.directionsOptions.avoid as string[],
                selectedRouteIndex: 0
            },
        });
        this.storesListComponent = new StoresListComponent({
            $target: document.getElementById(
                getConfig().selectors.listStoresContainerID
            ) as HTMLElement,
            initialState: {},
        });
        this.storeDetailsComponent = new StoreDetailsComponent({
            $target: document.getElementById(
                getConfig().selectors.detailsStoreContainerID
            ) as HTMLElement,
            initialState: {
                store: undefined
            },
        });
        if (getConfig().search.availableServices.length) {
            this.filterComponent = new FilterComponent({
                $target: document.getElementById(
                    getConfig().selectors.filterPanelContainerID
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
                this.urlParameterManager.setLocality(locality)
                this.storeDetailsComponent.setState({store: undefined});
                this.storesListComponent.setState({nearbyLocation: locality.location}, true, () =>
                    this.storesListComponent.emit(StoresListComponentEvents.LOCALITY_CHANGED)
                );
                this.directionsComponent.setState({
                    origin: {location: locality.location, name: locality.name}
                }, true);
                this.setListView();
                this.setUserPosition(locality.location as LatLngLiteral);
            }
        );
        this.searchComponent.on(SearchComponentEvents.SEARCH_CLEAR, () => {
                this.urlParameterManager.setLocality(undefined)
                this.storesListComponent.setState({nearbyLocation: undefined, stores: []});
                this.mapComponent.setState({selectedStore: undefined, nearbyLocation: undefined, stores: []}, true, () =>
                    this.mapComponent.emit(MapComponentEvents.STORES_CHANGED)
                );
                this.directionsComponent.setState({origin: undefined}, true);
                this.setListView();
                this.setUserPosition(undefined);
            }
        );
        this.storesListComponent.on(StoresListComponentEvents.STORES_CHANGED, ({stores, nearbyLocation}) => {
            this.mapComponent.setState({selectedStore: undefined}, true);
            this.mapComponent.setState({stores: stores, nearbyLocation}, true, () =>
                this.mapComponent.emit(MapComponentEvents.STORES_CHANGED)
            );
            this.setListView();
        });
        this.storesListComponent.on(StoresListComponentEvents.STORE_SELECTED, (selectedStore: AssetFeatureResponse) => {
                this.urlParameterManager.setStoreId(selectedStore.properties.store_id)
                this.storeDetailsComponent.setState({store: selectedStore});
                this.mapComponent.setState({selectedStore: selectedStore}, true, () =>
                    this.mapComponent.selectStore()
                );
                this.setDetailsView();
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
            this.setListView();
        });
        this.mapComponent.on(MapComponentEvents.MAP_READY, () => {
            this.directionsComponent.emit(DirectionsComponentEvents.MAP_READY, this.mapComponent.map);
            this.setChildrenInitialState()
        });
        this.mapComponent.on(MapComponentEvents.MAP_IDLE, () => {
            this.emit(MapComponentEvents.MAP_IDLE)
        });
        this.mapComponent.on(MapComponentEvents.LOCATION_CHANGED, (location: MapLocation) => {
            this.urlParameterManager.setLocation(location)
        });
        this.mapComponent.on(MapComponentEvents.STORE_UNSELECTED, () => {
            this.urlParameterManager.setStoreId(undefined)
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
        this.directionsComponent.on(DirectionsComponentEvents.DIRECTIONS_UPDATED, (directionState: IDirections) => {
            this.urlParameterManager.setDirection({
                from: directionState.origin,
                to: directionState.destination
            })
        })
        this.mapComponent.on(MapComponentEvents.STORE_SELECTED, (selectedStore: AssetFeatureResponse) => {
            if (selectedStore) {
                this.urlParameterManager.setStoreId(selectedStore.properties.store_id)
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
                }
            } else {
                this.urlParameterManager.setStoreId(undefined)
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
            if (this.urlParameterManager.getDirection()) {
                this.urlParameterManager.setDirection(undefined)
            }
            if (this.urlParameterManager.getStoreId()) {
                this.setDetailsView();
            } else {
                this.setListView();
            }
        });
        window.addEventListener('resize', debounce(() => {
            this.managePadding();
        }, 100))
        this.managePadding();
    }

    setChildrenInitialState(): void {
        if (this.urlParameterManager.getStoreId()) {
            const api = new WoosmapApiClient({apiKey: getConfig().map.woosmapPublicKey});
            api.stores
                .searchStores({query: `idstore:="${this.urlParameterManager.getStoreId()}"`})
                .then((response) => {
                    const selectedStore = response?.features[0]
                    this.storeDetailsComponent.setState({store: selectedStore});
                    this.setDetailsView()
                    this.mapComponent.setState({selectedStore: selectedStore}, true, () =>
                        this.mapComponent.selectStore()
                    );
                })
                .catch((exception) => {
                    console.error(exception);
                });
        } else if (this.urlParameterManager.getLocality()) {
            this.searchComponent.setState({selectedLocality: this.urlParameterManager.getLocality()}, true, () => {
                this.searchComponent.selectLocality();
            })
        } else if (this.urlParameterManager.getDirection()) {
            const direction = this.urlParameterManager.getDirection();
            let directionState = {};
            if (direction?.from) {
                directionState = {...directionState, origin: direction.from};
            }
            if (direction?.to) {
                directionState = {...directionState, destination: direction.to};
            }
            this.directionsComponent.setState(directionState, true, () => {
                this.directionsComponent.emit(DirectionsComponentEvents.DESTINATION_CHANGED)
                this.setDirectionsView();
            });
        } else {
            this.setListView();
        }
    }

    setUserPosition(position: woosmap.map.LatLngLiteral | undefined): void {
        if (!position && this.userLocationMarker) {
            this.userLocationMarker.setMap(null);
            return;
        }

        if (position) {
            if (!this.userLocationMarker) {
                this.userLocationMarker = new woosmap.map.Marker({
                    position,
                    icon: getConfig().map.userLocationIconOptions
                });
            } else {
                this.userLocationMarker.setPosition(position);
            }
            this.userLocationMarker.setMap(this.mapComponent.map);
        }
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
        getConfig().map.mapPaddings.mobile.bottom = Math.round((document.getElementById(getConfig().selectors.mapContainerID) as HTMLElement).clientHeight * 0.56);
        if (width >= getConfig().map.mobileBreakPoint) {
            this.setState({padding: getConfig().map.mapPaddings.full}, true, () => {
                this.emit(StoreLocatorEvents.PADDING_CHANGED)
            });
        } else {
            this.setState({padding: getConfig().map.mapPaddings.mobile}, true, () => {
                this.emit(StoreLocatorEvents.PADDING_CHANGED)
            });
        }
    }

    getHTMLSkeleton(): string {
        return `
        <div id="${getConfig().selectors.mapContainerID}"></div>
        <div id="${getConfig().selectors.sidebarContainerID}">
           <div id="${getConfig().selectors.searchContainerID}">
              <div id="${getConfig().selectors.searchWrapperID}"></div>
           </div>
           <div id="${getConfig().selectors.sidebarContentContainerID}">
               <div id="${getConfig().selectors.filterPanelContainerID}"></div>
               <div id="${getConfig().selectors.listStoresContainerID}"></div>
               <div id="${getConfig().selectors.detailsStoreContainerID}"></div>
           </div>
        <div id="${getConfig().selectors.directionsContainerID}"></div>   
        <div id="${getConfig().selectors.roadbookContainerID}"></div>
        </div>`;
    }
}

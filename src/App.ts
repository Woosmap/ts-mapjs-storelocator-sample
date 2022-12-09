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
import {debounce} from "./utils/utils";

export interface IStoreLocator {
    initialSearch?: string;
    padding: woosmap.map.Padding;
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
    $sidebarContentContainer!: HTMLElement;

    init(): void {
        this.state = {
            padding: mapPaddings.full
        };
    }

    render(): void {
        this.$target.innerHTML = "";
        this.$target.insertAdjacentHTML("afterbegin", this.getHTMLSkeleton());
        this.$sidebarContentContainer = document.getElementById(
            Selectors.sidebarContentContainerID
        ) as HTMLElement;
        this.styleOnScroll();
        const searchComponent = new SearchComponent({
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
        const mapComponent = new MapComponent({
            $target: document.getElementById(Selectors.mapContainerID) as HTMLElement,
            initialState: {
                woosmapPublicKey: WoosmapPublicKey,
                mapOptions: MapOptions,
                storesStyle: StoresStyle,
                padding: this.state.padding,
            },
        });
        const directionsComponent = new DirectionsComponent({
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
        const storesListComponent = new StoresListComponent({
            $target: document.getElementById(
                Selectors.listStoresContainerID
            ) as HTMLElement,
            initialState: {},
        });
        const storeDetailsComponent = new StoreDetailsComponent({
            $target: document.getElementById(
                Selectors.detailsStoreContainerID
            ) as HTMLElement,
            initialState: {},
        });
        let filterComponent: FilterComponent;
        if (availableServices.length) {
            filterComponent = new FilterComponent({
                $target: document.getElementById(
                    Selectors.filterPanelContainerID
                ) as HTMLElement,
                initialState: {},
            });
            filterComponent.on(FilterComponentEvents.FILTERS_UPDATED, (queryString) => {
                storesListComponent.setState({query: queryString}, true, () =>
                    storesListComponent.emit(StoresListComponentEvents.QUERY_CHANGED)
                );
                mapComponent.setState({query: queryString}, true, () =>
                    mapComponent.emit(MapComponentEvents.FILTERS_UPDATED)
                );
            });
        }
        searchComponent.on(SearchComponentEvents.SELECTED_LOCALITY, (locality: SearchLocation) => {
                storeDetailsComponent.setState({store: undefined});
                storesListComponent.setState({nearbyLocation: locality.location}, true, () =>
                    storesListComponent.emit(StoresListComponentEvents.LOCALITY_CHANGED)
                );
                directionsComponent.setState({
                    origin: {location: locality.location, name: locality.name}
                }, true);
                this.setListView();
            }
        );
        searchComponent.on(SearchComponentEvents.SEARCH_CLEAR, () => {
                storesListComponent.setState({nearbyLocation: undefined, stores: []});
                mapComponent.setState({selectedStore: undefined, stores: []}, true, () =>
                    mapComponent.emit(MapComponentEvents.STORES_CHANGED)
                );
                directionsComponent.setState({origin: undefined}, true);
                this.setListView();
            }
        );
        storesListComponent.on(StoresListComponentEvents.STORES_CHANGED, (stores: GeoJSONFeature[]) => {
            mapComponent.setState({selectedStore: undefined}, true);
            mapComponent.setState({stores: stores}, true, () =>
                mapComponent.emit(MapComponentEvents.STORES_CHANGED)
            );
            this.setListView();
        });
        storesListComponent.on(StoresListComponentEvents.STORE_SELECTED, (selectedStore: AssetFeatureResponse) => {
                storeDetailsComponent.setState({store: selectedStore});
                mapComponent.setState({selectedStore: selectedStore}, true, () =>
                    mapComponent.selectStore()
                );
                this.setDetailsView();
            }
        );
        storesListComponent.on(StoresListComponentEvents.STORE_MOUSEENTER, debounce((selectedStore: AssetFeatureResponse) => {
            mapComponent.selectStoreOnDataOverlay(selectedStore);
        }, 100));
        storesListComponent.on(StoresListComponentEvents.STORE_MOUSELEAVE, debounce(() => {
            if (this.$target.className !== StoreLocatorViews.DETAILS_VIEW) {
                mapComponent.unselectStoreOnDataOverlay();
            }
        }, 100));
        storeDetailsComponent.on(StoreDetailsComponentEvents.BACK, () => {
            mapComponent.setState({selectedStore: undefined}, true, () =>
                mapComponent.emit(MapComponentEvents.STORE_UNSELECTED)
            );
            this.setListView();
        });
        mapComponent.on(MapComponentEvents.MAP_READY, () => {
            directionsComponent.emit(DirectionsComponentEvents.MAP_READY, mapComponent.map);
        });
        mapComponent.on(MapComponentEvents.STORE_UNSELECTED, () => {
            if (this.$target.className === StoreLocatorViews.DETAILS_VIEW) {
                this.setListView();
            }
        });
        storeDetailsComponent.on(StoreDetailsComponentEvents.DIRECTIONS_SHOW, (selectedStore: AssetFeatureResponse) => {
                const destination = {
                    name: selectedStore.properties.name,
                    location: {
                        lat: selectedStore.geometry.coordinates[1],
                        lng: selectedStore.geometry.coordinates[0],
                    },
                };
                if (directionsComponent.checkNeedUpdate({destination: destination})) {
                    directionsComponent.setState({destination: destination}, true, () =>
                        directionsComponent.emit(DirectionsComponentEvents.DESTINATION_CHANGED)
                    );
                } else {
                    directionsComponent.emit(DirectionsComponentEvents.DIRECTIONS_SHOW);
                }
                this.setDirectionsView();
            }
        );
        mapComponent.on(MapComponentEvents.STORE_SELECTED, (selectedStore: AssetFeatureResponse) => {
            if (selectedStore) {
                storeDetailsComponent.setState({store: selectedStore});
                if (this.$target.className === StoreLocatorViews.DIRECTIONS_VIEW || this.$target.className === StoreLocatorViews.ROADBOOK_VIEW) {
                    const destination = {
                        name: selectedStore.properties.name,
                        location: {
                            lat: selectedStore.geometry.coordinates[1],
                            lng: selectedStore.geometry.coordinates[0],
                        },
                    };
                    directionsComponent.setState({destination: destination}, true, () => {
                            directionsComponent.emit(DirectionsComponentEvents.DESTINATION_CHANGED)
                        }
                    );
                } else {
                    this.setDetailsView();
                }
            } else {
                this.setDetailsView();
            }
        });
        this.on(StoreLocatorEvents.PADDING_CHANGED, () => {
            directionsComponent.setState({padding: this.state.padding}, true);
            mapComponent.setState({padding: this.state.padding}, true);
        });

        directionsComponent.on(DirectionsComponentEvents.ROADBOOK_SHOW, () => {
            this.setRoadbookView();
        });
        directionsComponent.on(DirectionsComponentEvents.DIRECTIONS_SHOW, () => {
            this.setDirectionsView();
        });
        directionsComponent.on(DirectionsComponentEvents.CLOSE_DIRECTIONS, () => {
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
}

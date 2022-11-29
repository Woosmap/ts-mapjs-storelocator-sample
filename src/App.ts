import Selectors from "./configuration/selectors.config";
import {WoosmapPublicKey, MapOptions, StoresStyle, mobileBreakPoint, mapPaddings,} from "./configuration/map.config";
import {availableServices, LocalitiesConf,} from "./configuration/search.config";
import {AssetFeatureResponse} from "./types/stores";
import Component from "./components/component";
import MapComponent from "./components/map/map";
import SearchComponent from "./components/search/search";
import StoreDetailsComponent from "./components/storedetails/store_details";
import StoresListComponent from "./components/storeslist/stores_list";
import "./styles/main.scss";
import FilterComponent from "./components/filter/filter";
import GeoJSONFeature = woosmap.map.GeoJSONFeature;
import DirectionsComponent from "./components/directions/directions";
import {directionsOptions} from "./configuration/directions.config";
import {debounce} from "./utils/utils";

export interface IStoreLocator {
    initialSearch?: string;
    padding: woosmap.map.Padding;
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
            filterComponent.on("filters_updated", (queryString) => {
                storesListComponent.setState({query: queryString}, true, () =>
                    storesListComponent.emit("query_changed")
                );
                mapComponent.setState({query: queryString}, true, () =>
                    mapComponent.emit("filters_updated")
                );
            });
        }
        searchComponent.on(
            "selected_locality",
            (locality: woosmap.localities.DetailsResponseItem) => {
                const location: woosmap.map.LatLngLiteral = locality.geometry.location;
                storeDetailsComponent.setState({store: undefined});
                storesListComponent.setState({nearbyLocation: location}, true, () =>
                    storesListComponent.emit("locality_changed")
                );
                this.setListView();
            }
        );
        storesListComponent.on("stores_changed", (stores: GeoJSONFeature[]) => {
            mapComponent.setState({selectedStore: undefined}, true);
            mapComponent.setState({stores: stores}, true, () =>
                mapComponent.emit("stores_changed")
            );
            this.setListView();
        });
        storesListComponent.on("store_selected", (selectedStore: AssetFeatureResponse) => {
                storeDetailsComponent.setState({store: selectedStore});
                mapComponent.setState({selectedStore: selectedStore}, true, () =>
                    mapComponent.selectStore()
                );
                this.setDetailsView();
            }
        );
        storeDetailsComponent.on("back", () => {
            mapComponent.setState({selectedStore: undefined}, true, () =>
                mapComponent.emit("store_unselected")
            );
            this.setListView();
        });
        mapComponent.on("map_ready", () => {
            directionsComponent.emit("map_ready", mapComponent.map);
        });
        storeDetailsComponent.on("directions_show", (selectedStore: AssetFeatureResponse) => {
                const destination = {
                    name: selectedStore.properties.name,
                    location: {
                        lat: selectedStore.geometry.coordinates[1],
                        lng: selectedStore.geometry.coordinates[0],
                    },
                };
                directionsComponent.setState({destination: destination}, true, () =>
                    directionsComponent.emit("destination_changed")
                );
                directionsComponent.emit("directions_show");
                this.setDirectionsView();
            }
        );
        mapComponent.on("store_selected", (selectedStore: AssetFeatureResponse) => {
            if (selectedStore) {
                storeDetailsComponent.setState({store: selectedStore});
                if (this.$target.className === "directions_view" || this.$target.className === "roadbook_view") {
                    const destination = {
                        name: selectedStore.properties.name,
                        location: {
                            lat: selectedStore.geometry.coordinates[1],
                            lng: selectedStore.geometry.coordinates[0],
                        },
                    };
                    directionsComponent.setState({destination: destination}, true, () => {
                            directionsComponent.emit("destination_changed")
                        }
                    );
                } else {
                    this.setDetailsView();
                }
            } else {
                this.setDetailsView();
            }
        });
        this.on("padding_changed", () => {
            directionsComponent.setState({padding: this.state.padding}, true);
            mapComponent.setState({padding: this.state.padding}, true);
        });

        directionsComponent.on("roadbook_show", () => {
            this.setRoadbookView();
        });
        directionsComponent.on("directions_show", () => {
            this.setDirectionsView();
        });
        directionsComponent.on("close_directions", () => {
            this.setDetailsView();
        });
        window.addEventListener('resize', debounce(() => {
            this.managePadding();
        }, 100))
        this.managePadding();
    }

    setDetailsView(): void {
        this.$target.className = "details_view";
    }

    setListView(): void {
        this.$target.className = "list_view";
    }

    setDirectionsView(): void {
        this.$target.className = "directions_view";
    }

    setRoadbookView(): void {
        this.$target.className = "roadbook_view";
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
                this.emit("padding_changed")
            });
        } else {
            this.setState({padding: mapPaddings.mobile}, true, () => {
                this.emit("padding_changed")
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

import Component from "../component";
import TravelModeComponent, {TravelModeComponentEvents} from "./travel_mode";
import SearchComponent, {SearchComponentEvents, SearchLocation} from "../search/search";
import {WoosmapApiClient} from "../../services/woosmap_api";
import {decodePolyline, getTextWidth} from "../../utils/utils";
import RoutesSummaryComponent, {RoutesSummaryComponentEvents} from "./routes_summary";
import RouteRoadbookComponent, {RouteRoadbookComponentEvents} from "./route_roadbook";
import DirectionsOptionsComponent, {DirectionsOptionsComponentEvents} from "./directions_options";
import {getConfig} from "../../configuration/config";

export interface IDirections {
    travelMode: woosmap.map.TravelMode;
    provideRouteAlternatives: boolean;
    unitSystem: woosmap.map.UnitSystem;
    origin?: SearchLocation;
    destination?: SearchLocation;
    directionsResult?: woosmap.map.DirectionResult;
    selectedRouteIndex: number;
    padding: woosmap.map.Padding;
    avoid: string[];
}

export enum DirectionsComponentEvents {
    MAP_READY = "map_ready",
    DIRECTIONS_SHOW = "directions_show",
    DESTINATION_CHANGED = "destination_changed",
    ROUTES_CHANGED = "routes_changed",
    SELECTED_ROUTE_CHANGED = "selected_route_changed",
    CLOSE_DIRECTIONS = 'close_directions',
    ROADBOOK_SHOW = "roadbook_show"
}

export default class DirectionsComponent extends Component<IDirections> {
    private map!: woosmap.map.Map;
    private directionsRenderer!: woosmap.map.DirectionsRenderer;
    private bounds!: woosmap.map.LatLngBounds;
    private api!: WoosmapApiClient;
    private directionMarkers: woosmap.map.Marker[] = [];
    private routesSummaryComponent!: RoutesSummaryComponent;

    init(): void {
        this.$element = document.createElement("div");
        this.$target.appendChild(this.$element);
        this.api = new WoosmapApiClient({apiKey: getConfig().map.woosmapPublicKey});
    }

    render(): void {
        if (this.state && this.$element) {
            this.$element.innerHTML = "";
            this.$target.insertAdjacentHTML("afterbegin", this.getHTMLSkeleton());

            const $closeBtn: HTMLButtonElement = document.createElement("button");
            $closeBtn.className = "closeDirections"
            $closeBtn.addEventListener("click", () => {
                this.emit(DirectionsComponentEvents.CLOSE_DIRECTIONS)
            });
            (document.getElementById("directionsHeader") as HTMLDivElement).append($closeBtn);

            const travelModesComponent = new TravelModeComponent({
                $target: document.getElementById(
                    getConfig().selectors.travelModeContainerID
                ) as HTMLElement,
                initialState: {
                    selectedTravelMode: this.state.travelMode,
                },
            });
            const searchOriginComponent = new SearchComponent({
                $target: document.getElementById("directionsOrigin") as HTMLElement,
                initialState: {
                    inputID: "originInput",
                    woosmapPublicKey: getConfig().map.woosmapPublicKey,
                    searchOptions: getConfig().search.localitiesConf,
                    featuresBtn: ["geolocate", "clear"]
                },
            });
            const searchDestinationComponent = new SearchComponent({
                $target: document.getElementById(
                    "directionsDestination"
                ) as HTMLElement,
                initialState: {
                    inputID: "destinationInput",
                    woosmapPublicKey: getConfig().map.woosmapPublicKey,
                    searchOptions: getConfig().search.localitiesConf,
                    featuresBtn: ["clear"]
                },
            });
            const directionsOptionsComponent = new DirectionsOptionsComponent({
                $target: document.getElementById(
                    "directionsOptionsContainer"
                ) as HTMLElement,
                initialState: {},
            });
            this.routesSummaryComponent = new RoutesSummaryComponent({
                $target: document.getElementById(
                    "directionsRoutesContainer"
                ) as HTMLElement,
                initialState: {
                    routes: [],
                    travelMode: this.state.travelMode,
                    selectedRouteIndex: 0,
                    avoid: this.state.avoid,
                    unitSystem: this.state.unitSystem,
                    isLoading: false
                },
            });
            if (this.state.origin) {
                searchOriginComponent.setLocality(this.state.origin.name);
            }
            if (this.state.destination) {
                searchDestinationComponent.setLocality(this.state.destination.name);
            }

            directionsOptionsComponent.on(DirectionsOptionsComponentEvents.AVOID_UPDATED, (options) => {
                this.setState({avoid: options}, true, () => {
                    this.computeRoute();
                })
            })
            directionsOptionsComponent.on(DirectionsOptionsComponentEvents.UNIT_UPDATED, (unit) => {
                this.setState({unitSystem: unit}, true, () => {
                    this.computeRoute();
                })
            })

            searchOriginComponent.on(SearchComponentEvents.SELECTED_LOCALITY, (locality: SearchLocation) => {
                    this.setState({
                        origin: {
                            location: locality.location,
                            name: locality.name
                        }
                    }, true, () => {
                        if (!this.state.destination) {
                            (document.getElementById('destinationInput') as HTMLInputElement).focus();
                        }
                        this.computeRoute();
                    });
                }
            );
            searchDestinationComponent.on(SearchComponentEvents.SELECTED_LOCALITY, (locality: SearchLocation) => {
                    this.setState({
                        destination: {
                            location: locality.location,
                            name: locality.name
                        }
                    }, true, () => {
                        if (!this.state.origin) {
                            (document.getElementById('originInput') as HTMLInputElement).focus();
                        }
                        this.computeRoute();
                    });
                }
            );
            searchOriginComponent.on(SearchComponentEvents.SEARCH_CLEAR, () => {
                    this.setState({origin: undefined}, true, () => {
                        this.cleanRoutes()
                    });
                }
            );
            searchDestinationComponent.on(SearchComponentEvents.SEARCH_CLEAR, () => {
                    this.setState({destination: undefined}, true, () => {
                        this.cleanRoutes()
                    });
                }
            );
            travelModesComponent.on(TravelModeComponentEvents.TRAVEL_MODE_CHANGED, (travelModeKey: woosmap.map.TravelMode) => {
                    this.setState({travelMode: travelModeKey}, true, () => {
                        this.computeRoute();
                    });
                }
            );
            this.on(DirectionsComponentEvents.MAP_READY, (map: woosmap.map.Map) => {
                this.map = map;
                this.initDirectionRenderer();
            });
            this.on(DirectionsComponentEvents.DESTINATION_CHANGED, () => {
                if (this.state.origin && this.state.destination) {
                    this.computeRoute();
                }
                if (this.state.origin) {
                    searchOriginComponent.setLocality(this.state.origin.name);
                }
                if (this.state.destination) {
                    searchDestinationComponent.setLocality(this.state.destination.name);
                }
            });
            this.on(DirectionsComponentEvents.DIRECTIONS_SHOW, () => {
                if (this.state.directionsResult && this.state.directionsResult.routes && this.state.directionsResult.routes.length) {
                    this.directionsRenderer.setMap(this.map);
                    this.directionMarkers.forEach((marker) => {
                        marker.setMap(this.map);
                    });
                    this.fitToRouteBounds(this.bounds);
                }
            });
            let routeRoadbookComponent: RouteRoadbookComponent;
            this.routesSummaryComponent.on(RoutesSummaryComponentEvents.ROADBOOK_SHOW, () => {
                if (this.state.directionsResult) {
                    if (!routeRoadbookComponent) {
                        routeRoadbookComponent = new RouteRoadbookComponent({
                            $target: document.getElementById(getConfig().selectors.roadbookContainerID) as HTMLElement,
                            initialState: {route: this.state.directionsResult.routes[this.state.selectedRouteIndex]},
                        });
                        routeRoadbookComponent.on(RouteRoadbookComponentEvents.BACK, () => {
                            this.emit(DirectionsComponentEvents.DIRECTIONS_SHOW);
                        });
                    } else {
                        routeRoadbookComponent.setState({route: this.state.directionsResult.routes[this.state.selectedRouteIndex]})
                    }
                }
                this.emit(DirectionsComponentEvents.ROADBOOK_SHOW);
            });
            this.on(DirectionsComponentEvents.ROUTES_CHANGED, () => {
                this.routesSummaryComponent.setState({
                    routes: this.state.directionsResult?.routes || [],
                    travelMode: this.state.travelMode,
                    selectedRouteIndex: this.state.selectedRouteIndex,
                    origin: this.state.origin?.name || "",
                    destination: this.state.destination?.name || "",
                    avoid: this.state.avoid,
                    unitSystem: this.state.unitSystem,
                    error: this.state.directionsResult?.error_message || "",
                    isLoading: false
                })
                this.emit(DirectionsComponentEvents.DIRECTIONS_SHOW);
            });
            this.on(DirectionsComponentEvents.SELECTED_ROUTE_CHANGED, () => {
                this.routesSummaryComponent.selectRoute(this.state.selectedRouteIndex)
                if (this.state.directionsResult && routeRoadbookComponent) {
                    routeRoadbookComponent.setState({route: this.state.directionsResult.routes[this.state.selectedRouteIndex]})
                }
            });
            this.routesSummaryComponent.on(RoutesSummaryComponentEvents.ROUTE_INDEX_CHANGED, (selectedRouteIndex: number) => {
                this.setState({selectedRouteIndex: selectedRouteIndex}, true, () => {
                    this.directionsRenderer.setRouteIndex(this.state.selectedRouteIndex)
                })
            });

            this.on(DirectionsComponentEvents.CLOSE_DIRECTIONS, () => {
                this.cleanRoutes(true);
            })

        }
    }

    initDirectionRenderer(): void {
        this.directionsRenderer = new woosmap.map.DirectionsRenderer({preserveViewport: true});
        this.directionsRenderer.addListener("routeIndex_changed", () => {
            this.setState({selectedRouteIndex: this.directionsRenderer.get("routeIndex")}, true, () => {
                this.emit(DirectionsComponentEvents.SELECTED_ROUTE_CHANGED)
            })
        });
        this.computeRoute();
    }

    computeRoute(): void {
        if (this.state.origin && this.state.destination) {
            this.routesSummaryComponent.setState({isLoading: true});
            this.api.distance.route(
                {
                    origin: `${this.state.origin.location.lat},${this.state.origin.location.lng}`,
                    destination: `${this.state.destination.location.lat},${this.state.destination.location.lng}`,
                    mode: this.state.travelMode,
                    units: this.state.unitSystem,
                    alternatives: this.state.provideRouteAlternatives,
                    avoid: this.state.avoid.join("|"),
                    details: "full",
                })
                .then((response) => {
                    this.setState({
                        directionsResult: response,
                        selectedRouteIndex: 0
                    }, true, () => {
                        this.updateRoutes();
                    });
                })
                .catch((exception) => {
                    console.error(exception);
                    this.setState({
                        directionsResult: {routes: []},
                        selectedRouteIndex: 0
                    }, true);
                    this.cleanRoutes();
                })
                .finally(() => {
                    this.emit(DirectionsComponentEvents.ROUTES_CHANGED);
                })
        }
    }

    cleanRoutes(preserveMarkers?: boolean): void {
        this.directionsRenderer.setMap(null);
        this.removeMarkers();
        if (!preserveMarkers) {
            this.directionMarkers = [];
        }
    }

    updateRoutes(): void {
        if (this.state.directionsResult && this.state.directionsResult.routes && this.state.directionsResult.routes.length) {
            this.cleanRoutes();
            this.bounds = new woosmap.map.LatLngBounds();
            for (let routeIndex = 0; routeIndex < this.state.directionsResult.routes.length; routeIndex++) {
                const route = this.state.directionsResult.routes[routeIndex];
                this.bounds.union(new woosmap.map.LatLngBounds(route.bounds.northeast, route.bounds.southwest));
                if (route.overview_polyline) {
                    const encodedPolyline = route.overview_polyline;
                    const decodedPolyline = decodePolyline(encodedPolyline.points);
                    route.overview_path = decodedPolyline.map((latlng) => new woosmap.map.LatLng(latlng[0], latlng[1]));
                }
            }
            this.directionsRenderer.setDirections(this.state.directionsResult);
            this.directionsRenderer.setMap(this.map);
            this.fitToRouteBounds(this.bounds);
            if (this.state.origin && this.state.destination) {
                this.addMarkerLabel(this.state.origin.location, getConfig().directions.iconsDirections.start, this.state.origin.name);
                this.addMarkerLabel(this.state.destination.location, getConfig().directions.iconsDirections.end, this.state.destination.name);
            }
        } else {
            this.cleanRoutes();
        }
    }

    removeMarkers(): void {
        this.directionMarkers.forEach((marker) => {
            marker.setMap(null);
        });
    }

    addMarkerLabel(positon: woosmap.map.LatLngLiteral, icon: woosmap.map.Icon, label: string): void {
        const iconWidth = (icon.scaledSize as woosmap.map.SizeLiteral).width;
        icon.labelOrigin = new woosmap.map.Point(Math.ceil(getTextWidth(label) / 2 + iconWidth + 2), Math.round(iconWidth / 2));
        this.directionMarkers.push(new woosmap.map.Marker({
            label: {
                text: label,
                className: "markerLabel",
            },
            position: positon,
            icon: icon,
                map: this.map
            }));
    }

    fitToRouteBounds(bounds: woosmap.map.LatLngBounds): void {
        this.map.fitBounds(bounds, this.state.padding);
    }

    getHTMLSkeleton(): string {
        return `
        <div id="directionsInputs">
            <div id="directionsHeader">
                <div id="${getConfig().selectors.travelModeContainerID}"></div>
            </div>
            <div id="odInputs">
                <div>
                    <div id="directionsOrigin">
                    </div>
                    <div id="directionsDestination">
                    </div>
                </div>
            </div>
        </div>
        <div id="directionsOptionsContainer"></div>
        <div id="directionsResults">
            <div id="directionsOptions"></div>
            <div id="directionsRoutesContainer"></div>
        </div>`;
    }
}

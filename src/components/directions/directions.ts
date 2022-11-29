import Component from "../component";
import Selectors from "../../configuration/selectors.config";
import TravelModeComponent from "./travel_mode";
import SearchComponent from "../search/search";
import {WoosmapPublicKey} from "../../configuration/map.config";
import {LocalitiesConf} from "../../configuration/search.config";
import {WoosmapApiClient} from "../../services/woosmap_api";
import {decodePolyline, getTextWidth} from "../../utils/utils";
import RoutesSummaryComponent from "./routes_summary";
import RouteRoadbookComponent from "./route_roadbook";
import {iconsDirections} from "../../configuration/directions.config";

export interface IDirectionInput {
    name: string;
    location: woosmap.map.LatLngLiteral;
}

export interface IDirections {
    travelMode: woosmap.map.TravelMode;
    provideRouteAlternatives: boolean;
    unitSystem: woosmap.map.UnitSystem;
    origin?: IDirectionInput;
    destination?: IDirectionInput;
    directionsResult?: woosmap.map.DirectionResult;
    selectedRouteIndex: number;
    padding: woosmap.map.Padding;
}

export default class DirectionsComponent extends Component<IDirections> {
    private map!: woosmap.map.Map;
    private directionsRenderer!: woosmap.map.DirectionsRenderer;
    private bounds!: woosmap.map.LatLngBounds;
    private api!: WoosmapApiClient;
    private directionMarkers: woosmap.map.Marker[] = [];


    init(): void {
        this.$element = document.createElement("div");
        this.$target.appendChild(this.$element);
        this.api = new WoosmapApiClient({apiKey: WoosmapPublicKey});
    }

    render(): void {
        if (this.state && this.$element) {
            this.$element.innerHTML = "";
            this.$target.insertAdjacentHTML("afterbegin", this.getHTMLSkeleton());

            const $closeBtn: HTMLButtonElement = document.createElement("button");
            $closeBtn.className = "closeDirections"
            $closeBtn.addEventListener("click", () => {
                this.emit("close_directions")
            });
            (document.getElementById("directionsHeader") as HTMLDivElement).append($closeBtn);

            const travelModesComponent = new TravelModeComponent({
                $target: document.getElementById(
                    Selectors.travelModeContainerID
                ) as HTMLElement,
                initialState: {
                    selectedTravelMode: this.state.travelMode,
                },
            });
            const searchOriginComponent = new SearchComponent({
                $target: document.getElementById("directionsOrigin") as HTMLElement,
                initialState: {
                    inputID: "originInput",
                    woosmapPublicKey: WoosmapPublicKey,
                    searchOptions: LocalitiesConf,
                },
            });
            const searchDestinationComponent = new SearchComponent({
                $target: document.getElementById(
                    "directionsDestination"
                ) as HTMLElement,
                initialState: {
                    inputID: "destinationInput",
                    woosmapPublicKey: WoosmapPublicKey,
                    searchOptions: LocalitiesConf,
                },
            });
            const routesSummaryComponent = new RoutesSummaryComponent({
                $target: document.getElementById(
                    "directionsRoutesContainer"
                ) as HTMLElement,
                initialState: {
                    routes: [],
                    travelMode: this.state.travelMode,
                    selectedRouteIndex: 0,
                },
            });
            if (this.state.origin) {
                searchOriginComponent.setLocality(this.state.origin.name);
            }
            if (this.state.destination) {
                searchDestinationComponent.setLocality(this.state.destination.name);
            }
            searchOriginComponent.on("selected_locality", (locality: woosmap.localities.DetailsResponseItem) => {
                    const location: woosmap.map.LatLngLiteral = locality.geometry.location;
                    this.setState({origin: {location: location, name: locality.name || locality.formatted_address}}, true, () => {
                        routesSummaryComponent.setLoading();
                        this.computeRoute();
                    });
                }
            );
            searchDestinationComponent.on("selected_locality", (locality: woosmap.localities.DetailsResponseItem) => {
                    const location: woosmap.map.LatLngLiteral = locality.geometry.location;
                    this.setState({destination: {location: location, name: locality.name || locality.formatted_address}}, true, () => {
                        routesSummaryComponent.setLoading();
                        this.computeRoute();
                    });
                }
            );
            travelModesComponent.on("travelmode_changed", (travelModeKey: woosmap.map.TravelMode) => {
                    this.setState({travelMode: travelModeKey}, true, () => {
                        routesSummaryComponent.setLoading();
                        this.computeRoute();
                    });
                }
            );
            this.on("map_ready", (map: woosmap.map.Map) => {
                this.map = map;
                this.initDirectionRenderer();
            });
            this.on("destination_changed", () => {
                if (this.state.origin && this.state.destination) {
                    routesSummaryComponent.setLoading();
                    this.computeRoute();
                }
                if (this.state.origin) {
                    searchOriginComponent.setLocality(this.state.origin.name);
                }
                if (this.state.destination) {
                    searchDestinationComponent.setLocality(this.state.destination.name);
                }
            });
            this.on("directions_show", () => {
                if (this.state.directionsResult && this.state.directionsResult.routes && this.state.directionsResult.routes.length) {
                    this.directionsRenderer.setMap(this.map);
                    this.directionMarkers.forEach((marker) => {
                        marker.setMap(this.map);
                    });
                    this.fitToRouteBounds(this.bounds);
                }
            });
            let routeRoadbookComponent: RouteRoadbookComponent;
            routesSummaryComponent.on("roadbook_show", () => {
                if (this.state.directionsResult) {
                    if (!routeRoadbookComponent) {
                        routeRoadbookComponent = new RouteRoadbookComponent({
                            $target: document.getElementById(Selectors.roadbookContainerID) as HTMLElement,
                            initialState: {route: this.state.directionsResult.routes[this.state.selectedRouteIndex]},
                        });
                        routeRoadbookComponent.on("back", () => {
                            this.emit("directions_show");
                        });
                    } else {
                        routeRoadbookComponent.setState({route: this.state.directionsResult.routes[this.state.selectedRouteIndex]})
                    }
                }
                this.emit("roadbook_show");
            });
            this.on("routes_changed", () => {
                if (this.state.directionsResult) {
                    routesSummaryComponent.setState({
                        routes: this.state.directionsResult.routes,
                        travelMode: this.state.travelMode,
                        selectedRouteIndex: this.state.selectedRouteIndex,
                        origin: this.state.origin?.name || "",
                        destination: this.state.destination?.name || ""
                    })
                    this.emit("directions_show");
                }
            });
            this.on("selectedroute_changed", () => {
                routesSummaryComponent.selectRoute(this.state.selectedRouteIndex)
                if (this.state.directionsResult && routeRoadbookComponent) {
                    routeRoadbookComponent.setState({route: this.state.directionsResult.routes[this.state.selectedRouteIndex]})
                }
            });
            routesSummaryComponent.on("routeIndex_changed", (selectedRouteIndex: number) => {
                this.setState({selectedRouteIndex: selectedRouteIndex}, true, () => {
                    this.directionsRenderer.setRouteIndex(this.state.selectedRouteIndex)
                })
            });

            this.on("close_directions", () => {
                this.cleanRoutes(true);
            })

        }
    }

    initDirectionRenderer(): void {
        this.directionsRenderer = new woosmap.map.DirectionsRenderer({preserveViewport: true});
        this.directionsRenderer.addListener("routeIndex_changed", () => {
            this.setState({selectedRouteIndex: this.directionsRenderer.get("routeIndex")}, true, () => {
                this.emit("selectedroute_changed")
            })
        });
        this.computeRoute();
    }

    computeRoute(): void {
        if (this.state.origin && this.state.destination) {
            this.api.distance.route(
                {
                    origin: `${this.state.origin.location.lat},${this.state.origin.location.lng}`,
                    destination: `${this.state.destination.location.lat},${this.state.destination.location.lng}`,
                    mode: this.state.travelMode,
                    units: this.state.unitSystem,
                    alternatives: this.state.provideRouteAlternatives,
                    details: "full"
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
                    this.setState({
                        directionsResult: {routes: []},
                        selectedRouteIndex: 0
                    }, true);
                    this.cleanRoutes();
                })
                .finally(() => {
                    this.emit("routes_changed");
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
                this.addMarkerLabel(this.state.origin.location, iconsDirections.start, this.state.origin.name);
                this.addMarkerLabel(this.state.destination.location, iconsDirections.end, this.state.destination.name);
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
                <div id="${Selectors.travelModeContainerID}"></div>
            </div>
            <div id="odInputs">
                <form>
                    <div id="directionsOrigin">
                    </div>
                    <div id="directionsDestination">
                    </div>
                </form>
            </div>
        </div>
        <div id="directionsResults">
            <div id="directionsOptions"></div>
            <div id="directionsRoutesContainer"></div>
        </div>`;
    }
}

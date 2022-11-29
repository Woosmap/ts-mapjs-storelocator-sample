import Component from "../component";
import {travelModes} from "../../configuration/directions.config";
import loaderImage from "../../assets/loader.svg";

export interface IRoutesSummary {
    routes: woosmap.map.DirectionRoute[];
    travelMode: woosmap.map.TravelMode;
    selectedRouteIndex: number;
    origin?: string;
    destination?: string;
}

export default class RoutesSummaryComponent extends Component<IRoutesSummary> {
    init(): void {
        this.$element = <HTMLDivElement>document.createElement("div");
        this.$element.className = "routesSummary";
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            if (this.state.routes && this.state.routes.length) {
                const routesSummary: HTMLDivElement[] = this.state.routes.map(
                    (route: woosmap.map.DirectionRoute, index: number) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const summary = `${route.legs[0].start_address}`
                        const duration = `${route.legs[0].duration.text}`
                        const distance = `${route.legs[0].distance.text}`
                        const travelModeIcon = travelModes.filter(({modeKey}) => modeKey === this.state.travelMode)[0].darkIcon
                        const $routeSummary: HTMLDivElement = document.createElement("div");
                        $routeSummary.className =
                            index === this.state.selectedRouteIndex
                                ? "directionTrip directionTrip__selected"
                                : "directionTrip";
                        $routeSummary.dataset.index = index.toString();
                        $routeSummary.innerHTML = `
                        <img alt="${this.state.travelMode}" src="${travelModeIcon}" class="directionTrip__travelModeIcon">
                        <div class="directionTrip__description">
                            <div class="directionTrip__numbers">
                                <div class="directionTrip__duration">${duration}</div>
                                <div class="directionTrip__distance"> ${distance}</div>
                            </div>
                            <div>
                                <div class="directionTrip__title">via ${summary}</div>
                                <div class="directionTrip__summary">
                                    <div >${duration} sans circulation</div>
                                </div>
                            </div>
                            <div class="directionTrip__detailsMsg" data-detailsindex="{{ rendererIndex }}">Details</div>
                        </div>`;
                        $routeSummary.addEventListener("click", () => {
                            if ($routeSummary.dataset && $routeSummary.dataset.index) {
                                const routeIndex = Number($routeSummary.dataset.index)
                                if (routeIndex === this.state.selectedRouteIndex) {
                                    this.emit("roadbook_show");
                                } else {
                                    this.selectRoute(routeIndex);
                                }
                            }
                        });
                        return $routeSummary;
                    }
                );
                this.$element.replaceChildren(...routesSummary);
            } else {
                this.setEmptyResults();
            }
        }
    }

    setEmptyResults(): void {
        let messageBody;
        const $emptyResult: HTMLDivElement = document.createElement("div");
        messageBody = `Search an origin and destination to see available routes and time travel..`;
        if (this.state.origin && this.state.destination) {
            messageBody = `Sorry, we could not calculate driving directions 
                            from "<strong>${this.state.origin}</strong>" 
                            to "<strong>${this.state.destination}</strong>" 
                            for the travel mode: <strong>${this.state.travelMode}</strong>`;
        }
        $emptyResult.innerHTML = `
                    <div class="directionTrip__empty">
                    <div>${messageBody}</div>
                    <div>`;
        this.$element.replaceChildren($emptyResult);
    }

    setLoading(): void {
        const $loader: HTMLDivElement = document.createElement("div");
        $loader.id = "loader";
        $loader.innerHTML = `<img al="loading..." src=${loaderImage}>`
        this.$element.replaceChildren($loader);
    }

    selectRoute(routeIndex: number): void {
        this.setState(
            {
                selectedRouteIndex: routeIndex,
            },
            true,
            () => {
                const $routeSummary: HTMLDivElement = this.$element.querySelector(`[data-index="${this.state.selectedRouteIndex}"]`) as HTMLDivElement;
                document
                    .querySelectorAll(".directionTrip")
                    .forEach((el) => el.classList.remove("directionTrip__selected"));
                $routeSummary.classList.add("directionTrip__selected");
                this.emit("routeIndex_changed", this.state.selectedRouteIndex);
            }
        );
    }
}

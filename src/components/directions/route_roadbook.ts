import Component from "../component";
import {getLocale} from "../../helpers/locale";
import {getConfig} from "../../configuration/config";

export interface IRouteRoadbook {
    route: woosmap.map.DirectionRoute;
}

export enum RouteRoadbookComponentEvents {
    BACK = "back",
}

export default class RouteRoadbookComponent extends Component<IRouteRoadbook> {
    init(): void {
        this.$element = <HTMLDivElement>document.createElement("div");
        this.$element.className = "routeRoadbook";
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            const originText = `${this.state.route.legs[0].start_address}`
            const destinationText = `${this.state.route.legs[0].end_address}`
            const duration = `${this.state.route.legs[0].duration.text}`
            const distance = `${this.state.route.legs[0].distance.text}`
            const directionLink = this.getDirectionGoogleMapsUrl(this.state.route.legs[0].end_location);

            const $roadbookHeader: HTMLDivElement = document.createElement("div");
            $roadbookHeader.className = "routeRoadbook__header"
            $roadbookHeader.innerHTML = `
                                <span class="routeRoadbook__headerFromTo">
                                    <div class="routeRoadbook__headerWaypoint"> ${getLocale().directions.messages.from} <span class="routeRoadbook__headerFrom">${originText}</span></div>
                                    <div class="routeRoadbook__headerWaypoint"> ${getLocale().directions.messages.to} <span class="routeRoadbook__headerTo">${destinationText}</span></div>
                                </span>`;
            const $roadbookBody: HTMLDivElement = document.createElement("div");
            $roadbookBody.className = "routeRoadbook__body"
            $roadbookBody.innerHTML = `
                                <div class="routeRoadbook__actions">
                                    <a href="${directionLink}" target="_blank" title="${getLocale().directions.messages.openGoogleMaps}"><button class="routeRoadbook__actionsButton"></button></a>
                                </div>
                                <div class="routeRoadbook__summaryHeader">
                                  <span>
                                    <span class="delay" >${duration} </span>
                                    <span class="routeRoadbook__summarySubtitle">(<span >${distance}</span>)</span>
                                  </span>
                                  <span class="routeRoadbook__summaryDescription">${getLocale().directions.messages.via} ${originText}</span>
                                </div>`;
            const $backBtn: HTMLButtonElement = document.createElement("button");
            $backBtn.className = "routeRoadbook__headerBack";
            $backBtn.addEventListener("click", () => this.emit(RouteRoadbookComponentEvents.BACK));
            $roadbookHeader.prepend($backBtn);
            $roadbookBody.appendChild(this.getHTMLInstructions());
            this.$element.replaceChildren(...[$roadbookHeader, $roadbookBody]);
            this.styleOnScroll($roadbookBody);
        }
    }

    getDirectionGoogleMapsUrl(latlng: woosmap.map.LatLngLiteral): string {
        return `https://www.google.fr/maps/dir//${latlng.lat},${latlng.lng}`;
    }

    getDirectionStepIcon(action?: number): string {
        if (action) {
            const stepIconObj = getConfig().directions.stepsIcon.filter(({index}) => index === action)[0];
            if (stepIconObj) {
                const className = (stepIconObj.key as string).endsWith('Right') ? "reverse" : "";
                return `<div class="routeRoadbook__stepIcon routeRoadbook__stepIcon${className}">
                            <img alt="${stepIconObj.key}" src="${stepIconObj.icon}">
                        </div>`;
            } else {
                return `<div class="routeRoadbook__stepIcon routeRoadbook__stepIcon${action}"></div>`;
            }
        }
        return "";
    }

    getDirectionInstructionStep(instructions?: woosmap.map.DirectionStepInstructions): string {
        if (instructions) {
            if (instructions.summary) {
                return `<div class="routeRoadbook__stepBody">
                            <span>${instructions.summary}</span>
                        </div>`;
            }
        }
        return "";
    }

    getDirectionInstructionDistance(distance?: string): HTMLDivElement {
        const $distanceSeperator: HTMLDivElement = document.createElement("div");
        if (distance) {
            $distanceSeperator.className = "routeRoadbook__stepDistance";
            $distanceSeperator.innerHTML = `<div class="routeRoadbook__stepDistanceSeparator"></div>
                    <div class="routeRoadbook__stepDistanceText">${distance}</div>`;
        }
        return $distanceSeperator;
    }

    getWaypoint(address: string): HTMLDivElement {
        const $waypoint: HTMLDivElement = document.createElement("div");
        $waypoint.className = "routeRoadbook__waypoint"
        $waypoint.innerHTML = `<span><h4 class="routeRoadbook__waypointAddress">${address}</h4></span>`;
        return $waypoint;
    }


    getHTMLInstructions(): HTMLDivElement {
        const $instructions: HTMLDivElement = document.createElement("div");
        $instructions.className = "routeRoadbook__steps";
        if (this.state.route.legs[0].steps) {
            const $instructionsSteps: HTMLDivElement[] = this.state.route.legs[0].steps.map((step) => {
                const $step: HTMLDivElement = document.createElement("div");
                const iconStep = this.getDirectionStepIcon(step.instructions.action);
                const instructionStep = this.getDirectionInstructionStep(step.instructions);
                const $distanceStep = this.getDirectionInstructionDistance(step.distance);
                $step.innerHTML = `<div class="routeRoadbook__step">${iconStep}${instructionStep}</div>`;
                $step.appendChild($distanceStep);
                return $step;
            })
            $instructionsSteps.unshift(this.getWaypoint(this.state.route.legs[0].start_address));
            $instructionsSteps.push(this.getWaypoint(this.state.route.legs[0].end_address));
            $instructions.replaceChildren(...$instructionsSteps);
        }
        return $instructions;
    }

    styleOnScroll($roadbookBody: HTMLDivElement): void {
        $roadbookBody?.addEventListener("scroll", () => {
            const scroll = $roadbookBody.scrollTop;
            if (scroll > 0) {
                $roadbookBody.classList.add("active");
            } else {
                $roadbookBody.classList.remove("active");
            }
        });
    }
}

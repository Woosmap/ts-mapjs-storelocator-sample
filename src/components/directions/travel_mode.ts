import Component from "../component";
import {travelModes} from "../../configuration/directions.config";

export interface ITravelModeComponent {
    selectedTravelMode: woosmap.map.TravelMode;
}

export default class TravelModeComponent extends Component<ITravelModeComponent> {
    init(): void {
        this.$element = <HTMLDivElement>document.createElement("div");
        this.$element.className = "travelModeSelector";
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            const travelModesHTML: HTMLDivElement[] = travelModes.map(
                (travelMode) => {
                    const $travelMode: HTMLDivElement = document.createElement("div");
                    $travelMode.dataset.mode = travelMode.modeKey;
                    $travelMode.className =
                        travelMode.modeKey === this.state.selectedTravelMode
                            ? "travelMode travelMode__selected"
                            : "travelMode";
                    $travelMode.innerHTML = `
                                <button role="radio">
                                <img alt="${travelMode.modeKey}" class="iconTravelMode iconTravelMode__${travelMode.modeKey}"
                                     src="${travelMode.defaultIcon}"/>
                                <img alt="${travelMode.modeKey}" class="iconTravelMode iconTravelMode__${travelMode.modeKey}__selected"
                                     src="${travelMode.selectedIcon}"/>
                                </button>`;
                    $travelMode.addEventListener("click", () => {
                        if ($travelMode.dataset && $travelMode.dataset.mode) {
                            this.toggleTravelMode($travelMode);
                        }
                    });
                    return $travelMode;
                }
            );
            this.$element.replaceChildren(...travelModesHTML);
        }
    }

    toggleTravelMode($travelMode: HTMLDivElement): void {
        this.setState(
            {
                selectedTravelMode: $travelMode.dataset.mode as woosmap.map.TravelMode,
            },
            true,
            () => {
                document
                    .querySelectorAll(".travelMode")
                    .forEach((el) => el.classList.remove("travelMode__selected"));
                $travelMode.classList.add("travelMode__selected");
                this.emit("travelmode_changed", this.state.selectedTravelMode);
            }
        );
    }
}

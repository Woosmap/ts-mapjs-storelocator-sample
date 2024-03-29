import Component from "../component";
import {getLabel, getLocale} from "../../helpers/locale";
import {getConfig} from "../../configuration/config";

export interface IDirectionsOptionsComponent {
    avoidOptions?: string[];
    distanceUnit?: woosmap.map.UnitSystem;
}

export enum DirectionsOptionsComponentEvents {
    AVOID_UPDATED = "avoid_updated",
    UNIT_UPDATED = "unit_updated",
}

export default class DirectionsOptionsComponent extends Component<IDirectionsOptionsComponent> {
    init(): void {
        this.$element = <HTMLDivElement>document.createElement("div");
        this.$element.className = "directionsOptionsHeader collapsible";
        this.$element.innerHTML = `<span class="collapsibleTitle">${getLocale().directions.options}</span><div class="collapsibleIcon"></div>`;
        this.$element.addEventListener("click", () => this.toggleActive());
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            const $avoidOptionsContainer: HTMLDivElement = document.createElement("div");
            $avoidOptionsContainer.className = "directionsOptions__list";
            const $avoidOptionsContent: HTMLDivElement = document.createElement("div");
            $avoidOptionsContent.className = "directionsOptions__content";
            $avoidOptionsContent.innerHTML = `<span class='directionsOptions__header'>${getLocale().directions.avoid}</span>`
            const $avoidOptions: HTMLDivElement[] = getConfig().directions.avoidOptions.map((avoidOption) => {
                const $avoidInput: HTMLDivElement = document.createElement("div");
                $avoidInput.className = "directionsOptions__input";
                const checked: string = (getConfig().directions.directionsOptions.avoid as string[]).includes(avoidOption.paramKey) ? 'checked' : '';
                $avoidInput.innerHTML = `
                    <input id="avoid${getLabel(getLocale().directions.avoidOptions, avoidOption.paramKey)}" aria-label="Avoid ${avoidOption.paramKey}" name="avoidParams" type="checkbox" 
                           value="${avoidOption.paramKey}" ${checked}>
                    <label for="avoid${getLabel(getLocale().directions.avoidOptions, avoidOption.paramKey)}">${getLabel(getLocale().directions.avoidOptions, avoidOption.paramKey)}</label>`;
                $avoidInput.addEventListener("click", (event) => {
                    if ((event.target as HTMLElement).nodeName === "INPUT") {
                        this.updateAvoidPreferences();
                    }
                });
                return $avoidInput;
            });
            $avoidOptionsContent.append(...$avoidOptions);
            $avoidOptionsContainer.replaceChildren($avoidOptionsContent);

            const $unitOptionsContainer: HTMLDivElement = document.createElement("div");
            $unitOptionsContainer.className = "directionsOptions__list";
            const $unitOptionsContent: HTMLDivElement = document.createElement("div");
            $unitOptionsContent.className = "directionsOptions__content";
            $unitOptionsContent.innerHTML = `<span class='directionsOptions__header'>${getLocale().directions.units}</span>`
            const $unitOptions: HTMLDivElement[] = getConfig().directions.unitOptions.map((unitOption) => {
                const $unitInput: HTMLDivElement = document.createElement("div");
                $unitInput.className = "directionsOptions__input";
                const checked: string = unitOption.paramKey === getConfig().directions.directionsOptions.unitSystem ? 'checked' : '';
                $unitInput.innerHTML = `
                    <input id="unit${getLabel(getLocale().directions.unitOptions, unitOption.paramKey)}" aria-label="Unit ${unitOption.paramKey}" name="distanceUnits" type="radio" 
                           value="${unitOption.paramKey}" ${checked}>
                    <label for="unit${getLabel(getLocale().directions.unitOptions, unitOption.paramKey)}">${getLabel(getLocale().directions.unitOptions, unitOption.paramKey)}</label>`;
                $unitInput.addEventListener("click", (event) => {
                    if ((event.target as HTMLElement).nodeName === "INPUT") {
                        this.changeDistanceUnits();
                    }
                });
                return $unitInput;
            });
            $unitOptionsContent.append(...$unitOptions);
            $unitOptionsContainer.replaceChildren($unitOptionsContent);

            const $listOptions: HTMLDivElement = document.createElement("div");
            $listOptions.className = "directionsOptions collapsibleContent";

            $listOptions.replaceChildren(...[$avoidOptionsContainer, $unitOptionsContainer]);
            this.$target.appendChild($listOptions);
        }
    }

    toggleActive(): void {
        this.$element.classList.toggle("active");
        const content = this.$element.nextElementSibling as HTMLDivElement;
        if (content?.style.maxHeight && content?.style.maxHeight != "0px") {
            content.style.maxHeight = "0px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    updateAvoidPreferences(): void {
        const avoids: string[] = [];
        const optionsElements = document.querySelectorAll<HTMLInputElement>('input[name="avoidParams"]:checked');
        optionsElements.forEach(($avoidCheckbox) => {
            avoids.push($avoidCheckbox.value);
        });
        this.setState({avoidOptions: avoids}, true, () =>
            this.emit(DirectionsOptionsComponentEvents.AVOID_UPDATED, avoids)
        );
    }

    changeDistanceUnits(): void {
        const distanceUnit = (document.querySelector('input[name="distanceUnits"]:checked') as HTMLInputElement).value as woosmap.map.UnitSystem;
        this.setState({distanceUnit: distanceUnit}, true, () =>
            this.emit(DirectionsOptionsComponentEvents.UNIT_UPDATED, distanceUnit)
        );
    }
}

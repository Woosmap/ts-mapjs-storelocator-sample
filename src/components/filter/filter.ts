import Component from "../component";
import {availableServices} from "../../configuration/search.config";
import {getLabel, getLocale} from "../../helpers/locale";

export interface IFilterComponent {
    activeFilters?: string[];
}

export enum FilterComponentEvents {
    FILTERS_UPDATED = 'filters_updated'
}


export default class FilterComponent extends Component<IFilterComponent> {
    init(): void {
        this.$element = <HTMLDivElement>document.createElement("div");
        this.$element.className = "filterHeader collapsible";
        this.$element.innerHTML = `<span class="collapsibleTitle">${getLocale().filtering.servicesTitle}</span><div class="collapsibleIcon"></div>`;
        this.$element.addEventListener("click", () => this.toggleActive());
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            const $listServices: HTMLUListElement = document.createElement("ul");
            $listServices.className = "filterList collapsibleContent";
            const servicesHTML: HTMLLIElement[] = availableServices.map((service) => {
                const $service: HTMLLIElement = document.createElement("li");
                $service.dataset.servicekey = service.serviceKey;
                $service.dataset.servicename = getLabel(getLocale().filtering.services,service.serviceKey);
                $service.innerHTML = `
                    <button class="button">
                    <div class='iconService iconService__${service.serviceKey}'></div>
                    <div class='filterList__serviceName'>${getLabel(getLocale().filtering.services,service.serviceKey)}</div>
                    <div class="filterList__iconWrapper"></div>
                    </button>`;
                $service.addEventListener("click", () => {
                    $service.classList.toggle("active");
                    this.updateActiveFilters();
                });
                return $service;
            });
            $listServices.replaceChildren(...servicesHTML);
            this.$target.appendChild($listServices);
        }
    }

    toggleActive(): void {
        this.$element.classList.toggle("active");
        const content = this.$element.nextElementSibling as HTMLUListElement;
        if (content?.style.maxHeight && content?.style.maxHeight != "0px") {
            content.style.maxHeight = "0px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    updateActiveFilters(): void {
        const filters: string[] = [];
        const filterElements = document.querySelectorAll<HTMLLIElement>(
            ".filterList .active"
        );
        filterElements.forEach(($filterLI) => {
            if ($filterLI.dataset && $filterLI.dataset.servicekey) {
                filters.push($filterLI.dataset.servicekey);
            }
        });
        const queryString: string = filters
            .map((serviceKey) => `tag:${serviceKey}`)
            .join(" and ");
        this.setState({activeFilters: filters}, true, () =>
            this.emit(FilterComponentEvents.FILTERS_UPDATED, queryString)
        );
    }
}

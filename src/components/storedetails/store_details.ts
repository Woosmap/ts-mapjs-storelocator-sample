import Component from "../component";
import {AssetFeatureResponse, AssetResponse} from "../../types/stores";
import {
    getOpeningLabel,
    getOpeningWeekList,
    getReadableAddress,
    getServicesList,
} from "../../helpers/stores";

export interface IStoreDetailsComponent {
    store?: AssetFeatureResponse;
}

export enum StoreDetailsComponentEvents {
    DIRECTIONS_SHOW = "directions_show",
    BACK = "back",
}

export default class StoreDetailsComponent extends Component<IStoreDetailsComponent> {
    init(): void {
        this.$element = document.createElement("div");
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            if (this.state.store) {
                const properties = this.state.store.properties;
                const htmlElements: HTMLElement[] = [];
                const $backBtn: HTMLDivElement = this.getBackButton();
                const $storeDetailsHeader: HTMLDivElement = this.getDetailsHeader(properties);
                const $storeDetailsActions: HTMLDivElement = this.getActionsButtons(properties);
                const $storeDetails: HTMLDivElement = document.createElement("div");
                $storeDetails.className = "detailsStore";
                $storeDetails.innerHTML = `
                             ${properties.weekly_opening ? `<div class="detailsStore__content detailsStore__listItems"><div class="detailsStore__headerList">Opening hours</div>${getOpeningWeekList(properties.weekly_opening)}</div>` : ""}
                             ${properties.tags?.length ? `<div class="detailsStore__content detailsStore__listItems"><div class="detailsStore__headerList">Services</div>${getServicesList(properties.tags)}</div>` : ""}`;
                htmlElements.push($backBtn, $storeDetailsHeader, $storeDetailsActions, $storeDetails);
                this.$target.replaceChildren(...htmlElements);
            }
        }
    }

    getDetailsHeader(properties: AssetResponse): HTMLDivElement {
        const $storeDetailsHeader: HTMLDivElement = document.createElement("div");
        $storeDetailsHeader.className = "detailsStore";
        $storeDetailsHeader.innerHTML = `
                             <div class="detailsStore__thumbnail"><div class="detailsStore__thumbnailImg"></div></div>
                             <div class="detailsStore__content detailsStore__name">${properties.name}</div>
                             ${properties.types?.length ? `<div class="detailsStore__content detailsStore__types">${properties.types.join(" ,")}</div>` : ""}                             
                             ${properties.open ? `<div class="detailsStore__content detailsStore__opening">${getOpeningLabel(properties)}</div>` : ""}
                             ${properties.address ? `<div class="detailsStore__content detailsStore__address">${getReadableAddress(properties.address)}</div>` : ""}`;

        return $storeDetailsHeader;
    }

    getActionsButtons(properties: AssetResponse): HTMLDivElement {
        const $storeDetailsActions: HTMLDivElement = document.createElement("div");
        $storeDetailsActions.className = "detailsStore__content detailsStore__actions";

        const $directionsBtn: HTMLButtonElement = document.createElement("button");
        $directionsBtn.className = "button";
        $directionsBtn.addEventListener("click", () => this.emit(StoreDetailsComponentEvents.DIRECTIONS_SHOW, this.state.store));
        $directionsBtn.innerHTML = `<div class="buttonIcon directionsButton"></div><span>Directions</span>`;
        $storeDetailsActions.appendChild($directionsBtn)

        if (properties.contact?.phone) {
            const $phoneBtn: HTMLButtonElement = document.createElement("button");
            $phoneBtn.className = "button";
            $phoneBtn.innerHTML = `<div class="buttonIcon phoneButton"></div><span>Call</span>`;
            $phoneBtn.addEventListener("click", () => {
                window.open(`tel:${properties.contact?.phone}`, '_self');
            });
            $storeDetailsActions.appendChild($phoneBtn)
        }
        if (properties.contact?.website) {
            const $websiteBtn: HTMLButtonElement = document.createElement("button");
            $websiteBtn.className = "button";
            $websiteBtn.innerHTML = `<div class="buttonIcon websiteButton"></div><span>Website</span>`;
            $websiteBtn.addEventListener("click", () => {
                window.open(`${properties.contact?.website}`, '_blank');
            });
            $storeDetailsActions.appendChild($websiteBtn)
        }

        return $storeDetailsActions;
    }

    getBackButton(): HTMLDivElement {
        const $headerContainer: HTMLDivElement = document.createElement("div");
        $headerContainer.className = "detailsStore__header"
        const $backBtn: HTMLButtonElement = document.createElement("button");
        $backBtn.className = "backButton";
        $backBtn.addEventListener("click", () => this.emit(StoreDetailsComponentEvents.BACK));
        $backBtn.innerHTML = `<div class="backButton__icon"></div>`;
        $headerContainer.innerHTML = `<div class="detailsStore__headerTitle"></div>`
        $headerContainer.appendChild($backBtn)
        return $headerContainer;
    }
}

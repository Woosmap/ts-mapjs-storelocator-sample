import Component from "../component";
import {AssetFeatureResponse} from "../../types/stores";
import {
    getOpeningLabel,
    getOpeningWeekList,
    getPhoneLink,
    getReadableAddress,
    getServicesList,
    getWebsiteLink,
} from "../../helpers/stores";

export interface IStoreDetailsComponent {
    store?: AssetFeatureResponse;
}

export default class StoreDetailsComponent extends Component<IStoreDetailsComponent> {
    init(): void {
        this.$element = document.createElement("div");
        this.$element.className = "container";
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            if (this.state.store) {
                const properties = this.state.store.properties;
                const htmlElements: HTMLElement[] = [];
                const $backBtn: HTMLButtonElement = document.createElement("button");
                $backBtn.className = "backButton";
                $backBtn.addEventListener("click", () => this.emit("back"));
                $backBtn.innerHTML = `<div class="backButton__icon">Back</div>`;
                const $storeDetails: HTMLDivElement = document.createElement("div");
                $storeDetails.className = "detailsStore";
                $storeDetails.innerHTML = `
                             <div class="detailsStore__name">${properties.name}</div>
                             ${properties.types?.length ? `<div class="detailsStore__types">${properties.types.join(" ,")}</div>` : ""}                             
                             ${properties.open ? `<div class="detailsStore__opening">${getOpeningLabel(properties)}</div>` : ""}
                             ${properties.address ? `<div class="detailsStore__address">${getReadableAddress(properties.address)}</div>` : ""}
                             ${properties.contact?.phone ? `<div class="detailsStore__phone">${getPhoneLink(properties.contact)}</div>` : ""}
                             ${properties.contact?.website ? `<div class="detailsStore__website">${getWebsiteLink(properties.contact)}</div>` : ""}
                             <div class='detailsStore__getDirections'><a class="getDirections" href='#'>Get directions</a></div>                                                        
                             ${properties.weekly_opening ? `<div class="detailsStore__listItems"><div class="detailsStore__headerList">Opening hours</div>${getOpeningWeekList(properties.weekly_opening)}</div>` : ""}
                             ${properties.tags?.length ? `<div class="detailsStore__listItems"><div class="detailsStore__headerList">Services</div>${getServicesList(properties.tags)}</div>` : ""}`;
                htmlElements.push($backBtn, $storeDetails);
                this.$element.replaceChildren(...htmlElements);

                (document.querySelector(".getDirections") as HTMLDivElement).addEventListener("click", () => {
                    this.emit("directions_show", this.state.store)
                });
                this.$target.scrollTo(0, 0);
            }
        }
    }
}

import Component from "../component";
import {AssetFeatureResponse} from "../../types/stores";
import {
    getPhoneLink,
    getReadableAddress,
    getReadableDistance,
} from "../../helpers/stores";
import {SearchAPIParameters} from "../../configuration/search.config";
import {WoosmapApiClient} from "../../services/woosmap_api";
import {WoosmapPublicKey} from "../../configuration/map.config";
import emptyListImage from "../../assets/empty.jpg";
import {getLocale} from "../../helpers/locale";

export interface IStoresListComponent {
    stores?: AssetFeatureResponse[];
    nearbyLocation?: woosmap.map.LatLngLiteral;
    query?: string;
}

export enum StoresListComponentEvents {
    STORES_CHANGED = "stores_changed",
    LOCALITY_CHANGED = "locality_changed",
    QUERY_CHANGED = "query_changed",
    STORE_SELECTED = "store_selected",
    STORE_MOUSEENTER = "store_mouseenter",
    STORE_MOUSELEAVE = "store_mouseleave",
}

export default class StoresListComponent extends Component<IStoresListComponent> {
    private api!: WoosmapApiClient;

    init(): void {
        this.api = new WoosmapApiClient({apiKey: WoosmapPublicKey});
        this.$element = document.createElement("ul");
        this.$target.appendChild(this.$element);
        this.on(StoresListComponentEvents.LOCALITY_CHANGED, () => {
            this.searchStores();
        });
        this.on(StoresListComponentEvents.QUERY_CHANGED, () => {
            this.searchStores();
        });
    }

    render(): void {
        if (this.state && this.$element) {
            if (this.state.stores?.length) {
                const storesElements: HTMLLIElement[] = this.state.stores?.map(
                    (store: AssetFeatureResponse) => {
                        const properties = store.properties;
                        const $storeElement: HTMLLIElement = document.createElement("li");
                        $storeElement.className = "summaryStore";
                        $storeElement.dataset.storeId = store.properties.store_id;
                        $storeElement.innerHTML = `
                            <div class="summaryStore__name">${store.properties.name}</div>
                            ${properties.address ? `<div class="summaryStore__address">${getReadableAddress(properties.address)}</div>` : ""}
                            ${properties.contact?.phone ? `<div class="summaryStore__phone">${getPhoneLink(properties.contact)}</div>` : ""}
                            ${properties.distance ? `<div class="summaryStore__distance">${getReadableDistance(properties.distance)}</div>` : ""}`;
                        $storeElement.addEventListener("click", (e) => {
                            this.emit(StoresListComponentEvents.STORE_SELECTED, store);
                        });
                        $storeElement.addEventListener('mouseenter', () => {
                            this.emit(StoresListComponentEvents.STORE_MOUSEENTER, store);
                        });
                        $storeElement.addEventListener('mouseleave', () => {
                            this.emit(StoresListComponentEvents.STORE_MOUSELEAVE, store);
                        });
                        return $storeElement;
                    }
                );
                this.$element.replaceChildren(...storesElements);
            } else {
                const $emptyResults: HTMLDivElement = document.createElement("div");
                const messageHeader = this.state.stores
                    ? getLocale().stores.messages.emptyHeader
                    : getLocale().stores.messages.initialHeader;
                const messageBody = this.state.stores
                    ? getLocale().stores.messages.emptyBody
                    : getLocale().stores.messages.initialBody;
                $emptyResults.innerHTML = `
                <div class="summaryStore__empty">
                    <div>
                        <img src="${emptyListImage}" width="120">
                    </div>
                    <h3>${messageHeader}</h3>
                    <div>${messageBody}</div>
                <div>`;
                this.$element.replaceChildren($emptyResults);
            }
        }
    }

    searchStores(): void {
        if (this.state.nearbyLocation) {
            let params = Object.assign({}, SearchAPIParameters, {
                lat: this.state.nearbyLocation.lat,
                lng: this.state.nearbyLocation.lng,
            });
            if (this.state.query) {
                params = Object.assign({}, params, {
                    query: this.state.query,
                });
            }
            this.api.stores
                .searchStores(params)
                .then((response) => {
                    const storesList = response?.features.map((store) => store);
                    this.setState({stores: storesList});
                    this.emit(StoresListComponentEvents.STORES_CHANGED, storesList);
                })
                .catch((exception) => {
                    console.error(exception);
                    this.setState({stores: []});
                });
        }
    }
}

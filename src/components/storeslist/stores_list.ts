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

export interface IStoresListComponent {
    stores?: AssetFeatureResponse[];
    nearbyLocation?: woosmap.map.LatLngLiteral;
    query?: string;
}

export default class StoresListComponent extends Component<IStoresListComponent> {
    private api!: WoosmapApiClient;

    init(): void {
        this.api = new WoosmapApiClient({apiKey: WoosmapPublicKey});
        this.$element = document.createElement("ul");
        this.$target.appendChild(this.$element);
        this.on("locality_changed", () => {
            this.searchStores();
        });
        this.on("query_changed", () => {
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
                        $storeElement.addEventListener("click", () => {
                            this.emit("store_selected", store);
                        });
                        return $storeElement;
                    }
                );
                this.$target.scrollTo(0, 0);
                this.$element.replaceChildren(...storesElements);
            } else {
                const $emptyResults: HTMLDivElement = document.createElement("div");
                const messageHeader = this.state.stores
                    ? "No Stores Returned"
                    : "Start by Searching a Locality";
                const messageBody = this.state.stores
                    ? "Please Search a locality elsewhere or unselect your filters"
                    : "Or click on the Map to select a store";
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
                    this.emit("stores_changed", storesList);
                    this.setState({stores: storesList});
                })
                .catch((exception) => {
                    console.error(exception);
                });
        }
    }
}

import Component from '../component';
import {AssetFeatureResponse} from "../../types/stores/asset_response";
import {getPhoneLink, getReadableAddress, getReadableDistance} from "../../utils/stores_utils";

export interface IStoresListComponent {
    stores: AssetFeatureResponse[];
}

export default class StoresListComponent extends Component<IStoresListComponent> {
    init(): void {
        this.$element = document.createElement('ul');
        this.$target.appendChild(this.$element);
        this.styleOnScroll();
    }

    render(): void {
        if (this.state && this.$element) {
            const storesElements: HTMLLIElement[] = this.state.stores
                ?.map((store: AssetFeatureResponse) => {
                    const $storeElement: HTMLLIElement = document.createElement('li');
                    $storeElement.className = "summaryStore";
                    $storeElement.dataset.storeId = store.properties.store_id;
                    $storeElement.innerHTML = `
                             <div class="summaryStore__name">${store.properties.name}</div>
                             <div class="summaryStore__address">${getReadableAddress(store.properties.address)}</div>
                             <div class="summaryStore__phone">${getPhoneLink(store.properties.contact)}</div>
                             <div class="summaryStore__distance">${getReadableDistance(store.properties.distance)}</div>`
                    $storeElement.addEventListener('click', () => {
                        this.emit('selected_store', store)
                    });
                    return $storeElement;
                })
            this.$target.scrollTo(0, 0);
            this.$element.replaceChildren(...storesElements)
        }
    }

    styleOnScroll(): void {
        this.$target.addEventListener('scroll', () => {
            const scroll = this.$target.scrollTop;
            if (scroll > 0) {
                this.$target.classList.add('active');
            } else {
                this.$target.classList.remove("active");
            }
        });
    }

}

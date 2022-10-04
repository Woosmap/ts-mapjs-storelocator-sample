import Component from '../component';
import {AssetFeatureResponse} from "../../types/stores/asset_response";
import {getPhoneLink, getReadableAddress, getReadableDistance} from "../../helpers/stores";

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
                    const properties = store.properties;
                    const $storeElement: HTMLLIElement = document.createElement('li');
                    $storeElement.className = "summaryStore";
                    $storeElement.dataset.storeId = store.properties.store_id;
                    $storeElement.innerHTML = `
                             <div class="summaryStore__name">${store.properties.name}</div>
                             ${properties.address ? `<div class="summaryStore__address">${getReadableAddress(properties.address)}</div>` : ''}
                             ${properties.contact?.phone ? `<div class="summaryStore__phone">${getPhoneLink(properties.contact)}</div>` : ''}
                             ${properties.distance ? `<div class="summaryStore__distance">${getReadableDistance(properties.distance)}</div>` : ''}`
                    $storeElement.addEventListener('click', () => {
                        this.emit('store_selected', store)
                    });
                    return $storeElement;
                })
            this.$target.scrollTo(0, 0);
            this.$element.replaceChildren(...storesElements)
            this.show();
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

    hide(): void {
        this.$target.setAttribute('style', 'display:none');
    }

    show(): void {
        this.$target.setAttribute('style', '');
    }

}

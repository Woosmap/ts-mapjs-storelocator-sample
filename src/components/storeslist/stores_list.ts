import Component from '../component';
import {AssetAddress, AssetFeatureResponse, AssetResponse} from "../../types/stores/asset_response";

export interface IStoresListComponent {
    stores: AssetFeatureResponse[];
}

export default class StoresListComponent extends Component<IStoresListComponent> {
    init(): void {
        this.$element = document.createElement('ul');
        this.$element.className = 'container';
        this.$target.appendChild(this.$element);
    }

    render() {
        if (this.state && this.$element) {
            let storesElements: HTMLLIElement[] = this.state.stores
                ?.map((store: AssetFeatureResponse) => {
                    let $storeElement: HTMLLIElement = document.createElement('li');
                    $storeElement.className = "summaryStore";
                    $storeElement.dataset.storeId = store.properties?.store_id;
                    $storeElement.innerHTML = `
                             <h4 class="SummaryStore__name">${store.properties?.name}</h4>
                             <p class="SummaryStore__address">${this.getReadableAddress(store.properties?.address!)}</p>
                             <p class="SummaryStore__distance">${this.getReadableDistance(store.properties?.distance!)}</p>`
                    $storeElement.addEventListener('click', (e) => {
                        this.emit('selected_store', store)
                    });
                    return $storeElement;
                })
            this.$element.append(...storesElements)
            this.styleOnScroll();
        }
    }

    getReadableAddress(address: AssetAddress) {
        return address.lines?.join(', ');
    }

    getReadableDistance(distance: number, unitSystem = 'metric') {
        const meterToYard = 1.09361;
        const value = {
            'metric': {unit: 'km', smallUnit: 'm', factor: 1000},
            'imperial': {unit: 'mi', smallUnit: 'yd', factor: 1760}
        };
        const system = value['metric'];
        if (unitSystem === 'imperial') {
            distance *= meterToYard;
        }
        if (distance < system.factor) {
            return Math.round(distance) + '\u00A0' + system.smallUnit;
        } else {
            return parseFloat((distance / system.factor).toFixed(1)) + '\u00A0' + system.unit;
        }
    }

    styleOnScroll() {
        this.$target.addEventListener('scroll', () => {
            var scroll = this.$target.scrollTop;
            if (scroll > 0) {
                this.$target.classList.add('active');
            } else {
                this.$target.classList.remove("active");
            }
        });
    }

}

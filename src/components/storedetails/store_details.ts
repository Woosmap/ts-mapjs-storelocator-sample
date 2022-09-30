import Component from '../component';
import {AssetFeatureResponse} from "../../types/stores/asset_response";

export interface IStoreDetailsComponent {
    store: AssetFeatureResponse;
}

export default class StoreDetailsComponent extends Component<IStoreDetailsComponent> {
    init(): void {
        this.$element = document.createElement('div');
        this.$element.className = 'container';
        this.$element.innerHTML = "<p> THIS IS IT </p>"
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            const $storeElement: HTMLDivElement = document.createElement('div');
            $storeElement.className = "summaryStore";
            this.$target.scrollTo(0, 0);
            this.$element.replaceChildren()
        }
    }
}

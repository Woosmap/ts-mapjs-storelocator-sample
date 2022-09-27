import Map from './components/map/Map';
import Selectors from './configuration/selectors.config';
import {WoosmapPublicKey} from './configuration/map.config';


import "./styles/main.scss";

export default class StoreLocator {
    private state = {};

    constructor(private $storelocator: Element) {
        window.addEventListener('DOMContentLoaded', () => {
            this.$storelocator.innerHTML = '';
            new Map({
                $target: this.$storelocator,
                initialState: {
                    containerId: Selectors.mapContainerID,
                    woosmapPublicKey: WoosmapPublicKey
                },
            })
        });
    }

    setState(nextState: {}) {
        this.state = {...this.state, ...nextState};
        this.render();
    }

    render() {
    }
}

import StoreLocator from "./src/App";
import {mapPaddings} from "./src/configuration/map.config";

declare global {
    interface Window {
        Cypress?: Record<string, unknown>;
        woosmapStoreLocator: StoreLocator;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const $storelocator = document.querySelector<HTMLDivElement>(
        "#StoreLocator"
    ) as HTMLElement;
    if ($storelocator) {
        const storeLocator = new StoreLocator({
            $target: $storelocator,
            initialState: {padding: mapPaddings.full}
        });
        if (window.Cypress) {
            window.woosmapStoreLocator = storeLocator;
        }
    }
});

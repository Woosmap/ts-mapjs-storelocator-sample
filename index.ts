import StoreLocator from "./src/App";
import {mapPaddings} from "./src/configuration/map.config";

window.addEventListener("DOMContentLoaded", () => {
    const $storelocator = document.querySelector<HTMLDivElement>(
        "#StoreLocator"
    ) as HTMLElement;
    if ($storelocator)
        new StoreLocator({$target: $storelocator, initialState: {padding: mapPaddings.full}});
});

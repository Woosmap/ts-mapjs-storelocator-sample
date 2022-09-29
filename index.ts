import StoreLocator from './src/store_locator';

const $storelocator = document.querySelector<HTMLDivElement>('#StoreLocator');
if ($storelocator) new StoreLocator($storelocator);

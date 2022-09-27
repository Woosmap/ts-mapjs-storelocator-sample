import StoreLocator from './src/StoreLocator';

const $storelocator = document.querySelector<HTMLDivElement>('#StoreLocator');
if ($storelocator) new StoreLocator($storelocator);

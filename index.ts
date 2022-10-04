import StoreLocator from './src/App';

const $storelocator = document.querySelector<HTMLDivElement>('#StoreLocator') as HTMLElement;
if ($storelocator) new StoreLocator({$target: $storelocator, initialState: {}});

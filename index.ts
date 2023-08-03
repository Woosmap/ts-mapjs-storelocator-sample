import StoreLocator from "./src/App";

declare global {
    export type woosmapLocator = StoreLocator;
    export const woosmapLocator: typeof StoreLocator;

    interface Window {
        Cypress?: Record<string, unknown>;
        woosmapStoreLocator: StoreLocator;
    }
}

(window as any).woosmapLocator = StoreLocator;

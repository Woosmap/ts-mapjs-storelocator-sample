export {};

declare global {
  namespace woosmap.localities {
    class Autocomplete {
      constructor(inputId: string, options?: AutocompleteParameters);

      addListener(eventName: string, handler: (...args: any[]) => any): void;

      getSelectedSuggestionDetails(): DetailsResponseItem;
    }

    export interface DetailsResponseItem {
      public_id: string;
      name: string;
      formatted_address: string;
      geometry: {
        location: woosmap.map.LatLngLiteral;
        viewport: woosmap.map.LatLngBounds;
      };
    }

    interface AutocompleteParameters {
      minLength?: number;
      customDescription?: string;
      components?: ComponentRestrictions;
      types?: string | string[];
      data?: string;
      extended?: string;
      language?: string;
      firstTabIndex?: number;
      debounceTime?: number;
    }

    interface ComponentRestrictions {
      country: string | string[];
    }
  }
}

import Component from "../component";
import Urls from "../../configuration/urls.config";
import {loadScript} from "../../utils/load_script";
import GeolocateComponent, {GeolocateComponentEvents} from "./geolocate";
import {GenericPosition} from "../../services/geolocation";
import {loadCss} from "../../utils/load_css";

export interface SearchLocation {
    name: string;
    location: woosmap.map.LatLngLiteral;
}

export interface ISearchComponent {
    inputID: string;
    woosmapPublicKey: string;
    searchOptions: woosmap.localities.AutocompleteParameters;
    selectedLocality?: SearchLocation;
    featuresBtn: string[];
}

export enum SearchComponentEvents {
    SELECTED_LOCALITY = "selected_locality",
    SEARCH_CLEAR = "search_clear",
}

export default class SearchComponent extends Component<ISearchComponent> {
    private localitiesWidget!: woosmap.localities.Autocomplete;

    init(): void {
        this.$element = <HTMLInputElement>document.createElement("input");
        this.$element.className = "search__input";
        this.$element.setAttribute("placeholder", "Search an address...");
        this.$element.id = this.state.inputID;
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            loadScript({url: Urls.localitiesWidgetJS, params: {key: this.state.woosmapPublicKey}})
                .then(() => loadCss(Urls.localitiesWidgetCSS))
                .then(() => this.initSearchView())
                .catch((error) => {
                    console.error(
                        "failed to load the Woosmap Localities JS Widget script",
                        error
                    );
                });
        }
    }

    initSearchView(): void {
        this.localitiesWidget = new woosmap.localities.Autocomplete(
            this.state.inputID,
            this.state?.searchOptions
        );
        this.localitiesWidget.addListener("selected_suggestion", () => {
            const locality: woosmap.localities.DetailsResponseItem = this.localitiesWidget.getSelectedSuggestionDetails();
            const searchLocation: SearchLocation = {
                name: locality.name || locality.formatted_address,
                location: locality.geometry.location
            }
            this.setState({selectedLocality: searchLocation}, true)
            this.emit(SearchComponentEvents.SELECTED_LOCALITY, searchLocation);
        });
        const $inputContainer = (document.getElementById(this.state.inputID) as HTMLElement).parentElement as HTMLElement;
        this.state.featuresBtn.forEach((feature: string) => {
            if (feature === 'search') {
                this.manageSearchButton($inputContainer);
            }
            if (feature === 'clear') {
                this.manageClearButton($inputContainer);
            }
            if (feature === 'geolocate') {
                this.manageGeolocateButton($inputContainer);
            }
        });
    }

    manageSearchButton($inputContainer: HTMLElement): void {
        const $searchBtn = document.createElement("div");
        $searchBtn.className = "search__searchBtn";
        $searchBtn.innerHTML = `<button type="button" aria-label="Search"></button>`
        $searchBtn.addEventListener("click", () => {
            if (this.state.selectedLocality) {
                this.emit(SearchComponentEvents.SELECTED_LOCALITY, this.state.selectedLocality);
            } else {
                this.$element.focus();
            }
        });
        $inputContainer.appendChild($searchBtn);
    }

    manageClearButton($inputContainer: HTMLElement): void {
        const $clearBtn = document.createElement("div");
        $clearBtn.className = "search__clearBtn";
        $clearBtn.innerHTML = `<button type="button" aria-label="Clear Search"></button>`
        $clearBtn.addEventListener("click", (e) => {
            const $emptyButton = $inputContainer.querySelector(".localities-empty-button") as HTMLDivElement
            if ($emptyButton) {
                $emptyButton.click();
                $clearBtn.style.display = 'none';
            } else {
                (this.$element as HTMLInputElement).value = "";
                $clearBtn.style.display = 'none';
                this.$element.focus();
            }
            this.emit(SearchComponentEvents.SEARCH_CLEAR);
        });
        ['input', 'locality_changed'].forEach(evt =>
            this.$element.addEventListener(evt, () => {
                if ((this.$element as HTMLInputElement).value.length === 0) {
                    $clearBtn.style.display = 'none';
                } else {
                    $clearBtn.style.display = 'block';
                }
            })
        );
        $clearBtn.style.display = 'none';
        $inputContainer.appendChild($clearBtn);
    }

    manageGeolocateButton($inputContainer: HTMLElement): void {
        const geolocateComponent = new GeolocateComponent({
            $target: $inputContainer,
            initialState: {},
        });
        geolocateComponent.on(GeolocateComponentEvents.GEOLOCATION_FOUND, (geolocation: GenericPosition) => {
            if (geolocation) {
                const searchLocation: SearchLocation = {
                    name: geolocation.name,
                    location: {
                        lat: geolocation.latitude,
                        lng: geolocation.longitude,
                    }
                }
                this.setLocality("Your location");
                this.setState({selectedLocality: searchLocation}, true)
                this.emit(SearchComponentEvents.SELECTED_LOCALITY, searchLocation);
            }
        })
    }


    loadWidgetStylesheet(): void {
        const newLink: HTMLLinkElement = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.href = Urls.localitiesWidgetCSS;
        document.head.insertBefore(newLink, document.head.firstElementChild);
    }

    setLocality(name: string): void {
        (this.$element as HTMLInputElement).value = name;
        (this.$element as HTMLInputElement).dispatchEvent(new Event('locality_changed'))
    }
}

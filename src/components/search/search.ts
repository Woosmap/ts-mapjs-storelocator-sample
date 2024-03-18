import Component from "../component";
import {loadScript} from "../../utils/load_script";
import GeolocateComponent, {GeolocateComponentEvents} from "./geolocate";
import {GenericPosition} from "../../services/geolocation";
import {loadCss} from "../../utils/load_css";
import {getLocale, getLocaleLang} from "../../helpers/locale";
import {merge, replace} from "../../utils/utils";
import {getConfig} from "../../configuration/config";

export interface SearchLocation {
    name?: string;
    publicId?: string;
    location?: woosmap.map.LatLngLiteral;
}

export interface ISearchComponent {
    inputID: string;
    woosmapPublicKey: string;
    searchOptions: woosmap.localities.AutocompleteParameters;
    selectedLocality?: SearchLocation;
    featuresBtn: string[];
    searchText?: string;
}

export enum SearchComponentEvents {
    SELECTED_LOCALITY = "selected_locality",
    SEARCH_CLEAR = "search_clear",
}

export default class SearchComponent extends Component<ISearchComponent> {
    private localitiesWidget!: woosmap.localities.Autocomplete;

    init(): void {
        this.$element = document.createElement("input");
        this.$element.className = "search__input";
        this.$element.setAttribute("placeholder", getLocale().search.placeholder);
        this.$element.setAttribute("aria-label", getLocale().search.placeholder);
        this.$element.setAttribute("aria-autocomplete", "list");
        this.$element.setAttribute("autocomplete", "off");
        this.$element.id = this.state.inputID;
        this.$target.appendChild(this.$element);
    }

    render(): void {
        if (this.state && this.$element) {
            loadScript({
                url: getConfig().urls.localitiesWidgetJS,
                params: {key: this.state.woosmapPublicKey}
            })
                .then(() => loadCss(getConfig().urls.localitiesWidgetCSS))
                .then(() => this.initSearchView())
                .catch((error) => {
                    console.error(
                        replace(getLocale().errors.loadingLibrary, {'library': "Woosmap Localities JS Widget"}),
                        error
                    );
                });
        }
    }

    initSearchView(): void {
        const searchOptions = merge({...this.state.searchOptions}, {language: getLocaleLang().toLowerCase()})
        this.localitiesWidget = new woosmap.localities.Autocomplete(
            this.state.inputID,
            searchOptions
        );
        this.localitiesWidget.addListener("selected_suggestion", () => {
            const locality: woosmap.localities.DetailsResponseItem = this.localitiesWidget.getSelectedSuggestionDetails();
            const searchLocation: SearchLocation = {
                name: locality.formatted_address || locality.name,
                publicId: locality.public_id,
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

    selectLocality(): void {
        if (this.state.selectedLocality) {
            this.emit(SearchComponentEvents.SELECTED_LOCALITY, this.state.selectedLocality);
            this.setLocality(this.state.selectedLocality.name || '');
        }
    }

    manageSearchButton($inputContainer: HTMLElement): void {
        const $searchBtn = document.createElement("div");
        $searchBtn.className = "search__searchBtn";
        $searchBtn.innerHTML = `<button type="button" aria-label="${getLocale().search.submitLabel}"></button>`
        $searchBtn.addEventListener("click", () => {
            if (this.state.selectedLocality) {
                this.emit(SearchComponentEvents.SELECTED_LOCALITY, this.state.selectedLocality);
            } else {
                this.$element.focus();
            }
        });
        $inputContainer.appendChild($searchBtn);
    }

    handleClearBtnClick = ($clearBtn: HTMLElement, $inputContainer: HTMLElement) => {
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
    }

    handleInputChange = ($clearBtn: HTMLElement) => {
        if ((this.$element as HTMLInputElement).value.length === 0) {
            $clearBtn.style.display = 'none';
        } else {
            $clearBtn.style.display = 'block';
        }
    }

    manageClearButton($inputContainer: HTMLElement): void {
        const $clearBtn = document.createElement("div");
        $clearBtn.className = "search__clearBtn";
        $clearBtn.innerHTML = `<button type="button" aria-label="${getLocale().search.clearLabel}"></button>`
        $clearBtn.addEventListener("click", () => this.handleClearBtnClick($clearBtn, $inputContainer));
        ['input', 'locality_changed'].forEach(evt => this.$element.addEventListener(evt, () => this.handleInputChange($clearBtn)));
        $clearBtn.style.display = 'none';
        $inputContainer.appendChild($clearBtn);
    }

    setLocality(name: string): void {
        (this.$element as HTMLInputElement).value = name;
        const $clearBtn = document.querySelector(".search__clearBtn") as HTMLElement;
        if ($clearBtn) {
            this.handleInputChange($clearBtn);
        }

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
                this.setLocality(getLocale().search.yourLocation);
                this.setState({selectedLocality: searchLocation}, true)
                this.emit(SearchComponentEvents.SELECTED_LOCALITY, searchLocation);
            }
        })
    }
}

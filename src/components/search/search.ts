import Component from '../component';
import Urls from "../../configuration/urls.config";
import {loadScript} from '../../utils/load_script';
import Selectors from "../../configuration/selectors.config";

export interface ISearchComponent {
    woosmapPublicKey: string;
    searchOptions: woosmap.localities.AutocompleteParameters;
    selectedLocality?: woosmap.localities.DetailsResponseItem;
}

export default class SearchComponent extends Component<ISearchComponent> {
    private localitiesWidget!: woosmap.localities.Autocomplete;

    init(): void {
        this.$element = <HTMLInputElement>document.createElement('input');
        this.$element.className = 'search';
        this.$element.id = Selectors.searchInputID;
        this.$target.appendChild(this.$element);
    }

    render() {
        if (this.state && this.$element) {
            loadScript({url: Urls.localitiesWidgetJS, attributes: {"key": this.state!.woosmapPublicKey}})
                .then(() => {
                    this.initSearchView();
                    this.loadWidgetStylesheet();
                })
                .catch((error) => {
                    console.error("failed to load the Woosmap Localities JS Widget script", error);
                });
        }
    }

    initSearchView() {
        this.localitiesWidget = new woosmap.localities.Autocomplete(this.$element!.id, this.state?.searchOptions);
        this.localitiesWidget.addListener('selected_suggestion', () => {
            const locality: woosmap.localities.DetailsResponseItem = this.localitiesWidget.getSelectedSuggestionDetails();
            this.emit('selected_locality', locality)
        });
    }

    loadWidgetStylesheet() {
        const newLink: HTMLLinkElement = document.createElement("link");
        newLink.rel = 'stylesheet';
        newLink.href = Urls.localitiesWidgetCSS;
        document.head.insertBefore(newLink, document.head.firstElementChild);
    }
}

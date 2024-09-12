import 'deep-chat';
import {Signals} from 'deep-chat/dist/types/handler';
import Component from "../component";
import {DeepChat} from "deep-chat";
import {SearchLocation} from "../search/search";
import { GeolocationService} from "../../services/geolocation";
import {getLocale} from "../../helpers/locale";
import {getConfig} from "../../configuration/config";

export interface IChatbotComponent {
    messages?: { text: string, sender: string }[];
}

export enum ChatbotComponentEvents {
    FIND_NEARBY_STORES = "find_nearby_stores"
}

interface Action {
    action: string;
    parameters: {
        search?: string;
        [key: string]: any;
    };
}

export default class ChatbotComponent extends Component<IChatbotComponent> {
    private botButton!: HTMLElement;
    private localitiesRequest: woosmap.map.localities.LocalitiesGeocodeRequest = {};
    private localitiesService!: woosmap.map.LocalitiesService;


    init(): void {
        this.$element = document.createElement("div") as HTMLDivElement;
        this.$element.classList.add("chatWrapper", "chatWrapper__hidden");
        this.botButton = this.createBotButton();
        this.$target.append(this.$element, this.botButton);
        this.render();
    }

    render(): void {
        if (this.state && this.$element) {
            const chatHeader = this.createChatHeader();
            const chatElement = this.createChatElement();
            this.$element.replaceChildren(chatHeader, chatElement);
        }
    }

    createChatHeader(): HTMLDivElement {
        const createElement = (tag: string, className: string, textContent?: string): HTMLElement => {
            const element = document.createElement(tag);
            element.className = className;
            if (textContent) {
                element.textContent = textContent;
            }
            return element;
        };

        const chatHeader = createElement('div', 'chatbot-header') as HTMLDivElement;
        const headerTitleElement = createElement('span', 'chatbot-header__title', 'Chatbot');
        const minimizeBtn = createElement('button', 'chatbot-header__minimize') as HTMLButtonElement;
        minimizeBtn.addEventListener("click", () => this.toggle(this.$element, this.botButton));
        chatHeader.append(headerTitleElement, minimizeBtn);

        return chatHeader;
    }

    createBotButton(): HTMLElement {
        const botBtnElement = document.createElement('div');
        botBtnElement.classList.add('botButton', 'botButton__avatar');
        botBtnElement.addEventListener('click', () => this.toggle(this.$element, botBtnElement));
        return botBtnElement;
    }

    async handleGeocode(latlng: woosmap.map.LatLngLiteral | null, search: string | null): Promise<woosmap.map.localities.LocalitiesGeocodeResult | null> {
        this.localitiesService = this.localitiesService ?? new woosmap.map.LocalitiesService();
        if (latlng) {
            this.localitiesRequest.latLng = latlng;
            delete this.localitiesRequest.address;
        } else if (search && search !== "") {
            this.localitiesRequest.address = search;
            delete this.localitiesRequest.latLng;
        }

        if (this.localitiesRequest.latLng || this.localitiesRequest.address) {
            try {
                const localities = await this.localitiesService.geocode(this.localitiesRequest);
                return localities.results[0] || null;
            } catch (error) {
                console.error("Error geocoding localities:", error);
                return null;
            }
        }

        return null;
    }

    private async handleFindNearestStores(action: Action): Promise<void> {
        if (!action.parameters.search) {
            console.log("Search parameter is undefined");
            return;
        }

        let result: woosmap.map.localities.LocalitiesGeocodeResult | null = null;
        let searchLocation: SearchLocation | null = null;
        let position: GeolocationPosition | null = null;

        switch (action.parameters.search) {
            case "user_location":
                position = await GeolocationService.getCurrentPosition();
                if (position) {
                    searchLocation = {
                        name: getLocale().search.yourLocation,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                    };
                    this.emit(ChatbotComponentEvents.FIND_NEARBY_STORES, searchLocation);
                } else {
                    console.log("Unable to get user's location");
                }
                break;
            case "map_center":
                break;
            default:
                result = await this.handleGeocode(null, action.parameters.search);
                if (result) {
                    const searchLocation: SearchLocation = {
                        name: result.formatted_address,
                        publicId: result.public_id,
                        location: result.geometry?.location
                    };
                    this.emit(ChatbotComponentEvents.FIND_NEARBY_STORES, searchLocation);
                } else {
                    console.log(`No localities found for search: ${action.parameters.search}`);
                }
        }
    }

    private handleGetDirections(action: Action): void {
        console.log(`Getting directions to: ${action.parameters.search}`);
    }

    private handleFilterStores(action: Action): void {
        console.log(`filtering stores: ${action.parameters.search}`);
    }

    private handleMoveMap(action: Action): void {
        console.log(`Moving map: ${action.parameters.search}`);
    }

    private handleUnknownAction(action: Action): void {
        console.log(`Unknown action: ${action.action}`);
    }

    private processActions(actions: Action[]): void {
        actions.forEach((action: Action) => {
            switch (action.action) {
                case "find_nearest_stores":
                    this.handleFindNearestStores(action);
                    break;
                case "get_directions":
                    this.handleGetDirections(action);
                    break;
                case "filter_stores":
                    this.handleFilterStores(action);
                    break;
                case "move_map":
                    this.handleMoveMap(action);
                    break;
                default:
                    this.handleUnknownAction(action);
            }
        });
    }

    createChatElement(): DeepChat {
        const chatElement: DeepChat = document.createElement("deep-chat");
        chatElement.setAttribute("id", getConfig().chat.elementId);
        chatElement.setAttribute("style", getConfig().chat.elementStyle);
        chatElement.avatars = getConfig().chat.avatars;
        chatElement.textInput = getConfig().chat.textInput;
        chatElement.introMessage = getConfig().chat.introMessage;

        chatElement.connect = {
            handler: async (body: Request, signals: Signals) => {
                try {
                    const response = await fetch(getConfig().chat.apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    });
                    const data = await response.json();
                    let answer;
                    try {
                        answer = JSON.parse(data["text"]);
                    } catch (e) {
                        answer = {text: data["text"]};
                    }
                    signals.onResponse({text: answer["assistant"] || answer["text"]});
                    if (answer["actions"] && answer["actions"].length > 0) {
                        this.processActions(answer["actions"]);
                    }
                } catch (e) {
                    signals.onResponse({error: 'Error retrieving response'});
                }
            }
        };

        return chatElement;
    }

    toggle(chatWrapper: HTMLElement, botButton: HTMLElement): void {
        if (chatWrapper !== null && botButton !== null) {
            if (chatWrapper.classList.contains("chatWrapper__hidden")) {
                chatWrapper.classList.remove("chatWrapper__hidden");
                botButton.classList.add("hidden");
                chatWrapper.classList.add("animation-scale-in");
                chatWrapper.addEventListener("animationend", () => this.dialogueDisplayed(chatWrapper), {once: true});
            } else {
                chatWrapper.classList.add("animation-scale-out");
                chatWrapper.addEventListener("animationend", () => {
                    chatWrapper.classList.add("chatWrapper__hidden");
                    botButton.classList.remove("hidden");
                    chatWrapper.classList.remove("animation-scale-in");
                    chatWrapper.classList.remove("animation-scale-out");
                }, {once: true});
            }
        }
    }

    dialogueDisplayed(element: HTMLElement): void {
        if (element !== null) {
            element.focus();
        }
    }

}
import 'deep-chat';
import {Signals} from 'deep-chat/dist/types/handler';
import Component from "../component";
import {DeepChat} from "deep-chat";
import {getConfig} from "../../configuration/config";
import {handleFindNearestStores, handleGetDirections} from "./chatbotActions";
import aiBotImg from "../../assets/ai.svg"
import {SearchLocation} from "../search/search";
import StoreOpeningHours = woosmap.map.stores.StoreOpeningHours;

export interface IChatbotComponent {
    messages?: { text: string, sender: string }[];
}

export enum ChatbotComponentEvents {
    FIND_NEARBY_STORES = "find_nearby_stores",
    GET_DIRECTIONS = "get_directions",
    FILTER_STORES = "filter_stores",
    MOVE_MAP = "move_map",
    NEARBY_STORES_RETRIEVED = "nearby_stores_retrieved",
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
    private localitiesService!: woosmap.map.LocalitiesService;
    private chatElement!: DeepChat;
    private context: any

    init(): void {
        this.$element = document.createElement("div") as HTMLDivElement;
        this.$element.classList.add("chatWrapper", "chatWrapper__hidden");
        this.botButton = this.createBotButton();
        this.$target.append(this.$element, this.botButton);
    }

    render(): void {
        if (this.state && this.$element) {
            const chatHeader = this.createChatHeader();
            this.chatElement = this.createChatElement();
            this.handleChatInterceptors();
            this.$element.replaceChildren(chatHeader, this.chatElement);
        }
    }

    private async handleSummarizeResults() {
        let message;
        message = {text: "Summarizing store details..."}
        this.chatElement.addMessage(message, false)
        const body = {
            "role": "user",
            "content": [
                {
                    "text": JSON.stringify(this.context)
                }
            ]
        }
        const summaryResponse = await fetch(getConfig().chat.summarizeResultsAPIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({messages: [body]})
        })
        message = await summaryResponse.json();
        this.chatElement.addMessage(message, false)
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

    private async handleActions(actions: Action[]): Promise<void> {
        this.localitiesService = this.localitiesService ?? new woosmap.map.LocalitiesService();
        for (const action of actions) {
            let searchLocation, directions = null;
            switch (action.action) {
                case ChatbotComponentEvents.FIND_NEARBY_STORES:
                    searchLocation = await handleFindNearestStores(this.localitiesService, action);
                    this.emit(ChatbotComponentEvents.FIND_NEARBY_STORES, searchLocation);
                    break;
                case ChatbotComponentEvents.GET_DIRECTIONS:
                    directions = await handleGetDirections(this.localitiesService, action);
                    this.emit(ChatbotComponentEvents.GET_DIRECTIONS, directions);
                    break;
                case ChatbotComponentEvents.FILTER_STORES:
                    if (action.parameters.search) {
                        searchLocation = await handleFindNearestStores(this.localitiesService, action);
                        this.emit(ChatbotComponentEvents.FIND_NEARBY_STORES, searchLocation);
                    }
                    if (action.parameters.services) {
                        this.emit(ChatbotComponentEvents.FILTER_STORES, action.parameters.services);
                    }
                    break;
                case ChatbotComponentEvents.MOVE_MAP:
                    searchLocation = await handleFindNearestStores(this.localitiesService, action);
                    this.emit(ChatbotComponentEvents.FIND_NEARBY_STORES, searchLocation);
                    break;
                default:
                    console.warn(`Unknown action: ${action.action}`);
                // Optionally handle unknown actions
                // await this.handleUnknownAction(action);
            }
        }
    }

    createChatElement(): DeepChat {
        const chatElement: DeepChat = document.createElement("deep-chat");
        this.configureChatElement(chatElement);
        chatElement.connect = {
            handler: async (body: any, signals: Signals) => {
                await this.handleChatConnect(body, signals, chatElement);
            }
        };
        return chatElement;
    }

    private configureChatElement(chatElement: DeepChat): void {
        chatElement.setAttribute("id", getConfig().chat.elementId);
        chatElement.setAttribute("style", getConfig().chat.elementStyle);
        const avatarsConf = getConfig().chat.avatars;
        avatarsConf.ai.src = aiBotImg;
        chatElement.avatars = avatarsConf;
        chatElement.textInput = getConfig().chat.textInput;
        chatElement.introMessage = getConfig().chat.introMessage;
        chatElement.history = [];
    }

    private async handleChatConnect(body: any, signals: Signals, chatElement: DeepChat): Promise<void> {
        try {
            const response = await fetch(getConfig().chat.generateActionAPIUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            const answer = this.parseResponse(data);
            signals.onResponse({text: answer["assistant"] || answer["text"]});
            chatElement.history?.push({text: answer["assistant"] || answer["text"], role: "ai"});

            if (answer["actions"] && answer["actions"].length > 0) {
                await this.handleActions(answer["actions"]);
                const eventHandler = async ({stores, locality}: {
                    stores: woosmap.map.stores.StoreResponse[],
                    locality: SearchLocation
                }) => {
                    const storesProperties = this.extractStoreProperties(stores);
                    this.context = {
                        answer: answer["assistant"] || answer["text"],
                        search: locality,
                        stores: storesProperties
                    };
                    await this.handleSummarizeResults();
                    this.off(ChatbotComponentEvents.NEARBY_STORES_RETRIEVED, eventHandler);
                };
                this.once(ChatbotComponentEvents.NEARBY_STORES_RETRIEVED, eventHandler);
            }
        } catch (e) {
            signals.onResponse({error: 'Error retrieving response'});
        }
    }

    private parseResponse(data: any): { [key: string]: any } {
        try {
            return JSON.parse(data["text"]);
        } catch (e) {
            return {text: data["text"]};
        }
    }

    private extractStoreProperties(stores: woosmap.map.stores.StoreResponse[]): {
        name: string,
        opening_hours: StoreOpeningHours | null,
        distance: number | undefined,
        tags: string[]
    }[] {
        return stores.map((store: woosmap.map.stores.StoreResponse) => {
            return {
                name: store.properties.name,
                opening_hours: store.properties.opening_hours,
                distance: store.properties.distance,
                tags: store.properties.tags,
            };
        });
    }

    handleChatInterceptors(): void {
        if (!this.chatElement) {
            console.error('Chat element is not initialized.');
            return;
        }

        this.chatElement.requestInterceptor = (originalRequest: any) => {
            try {
                const messages = originalRequest.body?.messages;
                if (!messages || messages.length === 0) {
                    console.error('No messages found in the request body.');
                    return originalRequest;
                }
                this.chatElement.history?.push(messages[0])
                const transformedPayload = this.chatElement.history?.map(item => {
                    return {
                        role: item.role === 'ai' ? 'assistant' : item.role,
                        content: [
                            {
                                text: item.text
                            }
                        ]
                    };
                });
                originalRequest.body = {messages: transformedPayload};
                return originalRequest;
            } catch (error) {
                console.error('Error intercepting request:', error);
                return originalRequest;
            }
        };
    }

    toggle(chatWrapper: HTMLElement, botButton: HTMLElement): void {
        if (chatWrapper !== null && botButton !== null) {
            if (chatWrapper.classList.contains("chatWrapper__hidden")) {
                chatWrapper.classList.remove("chatWrapper__hidden");
                botButton.classList.add("hidden");
                chatWrapper.classList.add("animation-scale-in");
                chatWrapper.addEventListener("animationend", () => this.dialogueDisplayed(), {once: true});
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

    dialogueDisplayed(): void {
        if (this.chatElement) {
            this.chatElement.focusInput();
        }
    }

}
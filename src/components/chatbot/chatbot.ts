import 'deep-chat';
import {Signals} from 'deep-chat/dist/types/handler';
import Component from "../component";
import {DeepChat} from "deep-chat";
import {getConfig} from "../../configuration/config";
import {handleFindNearestStores, handleGetDirections} from "./chatbotActions";
import aiBotImg from "../../assets/ai.svg"

export interface IChatbotComponent {
    messages?: { text: string, sender: string }[];
}

export enum ChatbotComponentEvents {
    FIND_NEARBY_STORES = "find_nearby_stores",
    GET_DIRECTIONS = "get_directions",
    MOVE_MAP = "move_map",
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
            this.chatElement = this.createChatElement();
            this.handleChatInterceptors();
            this.$element.replaceChildren(chatHeader, this.chatElement);
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
                case "filter_stores":
                    searchLocation = await handleFindNearestStores(this.localitiesService, action);
                    this.emit(ChatbotComponentEvents.FIND_NEARBY_STORES, searchLocation);
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
        chatElement.setAttribute("id", getConfig().chat.elementId);
        chatElement.setAttribute("style", getConfig().chat.elementStyle);
        const avatarsConf = getConfig().chat.avatars;
        avatarsConf.ai.src = aiBotImg;
        chatElement.avatars = avatarsConf;
        chatElement.textInput = getConfig().chat.textInput;
        chatElement.introMessage = getConfig().chat.introMessage;
        chatElement.history = [];
        chatElement.connect = {
            handler: async (body: any, signals: Signals) => {
                try {
                    const response = await fetch(getConfig().chat.apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                    const data = await response.json();
                    let answer;
                    try {
                        answer = JSON.parse(data["text"]);
                    } catch (e) {
                        answer = {text: data["text"]};
                    }
                    signals.onResponse({text: answer["assistant"] || answer["text"]});
                    chatElement.history?.push({text: answer["assistant"] || answer["text"], role: "ai"})
                    if (answer["actions"] && answer["actions"].length > 0) {
                        await this.handleActions(answer["actions"]);
                    }
                } catch (e) {
                    signals.onResponse({error: 'Error retrieving response'});
                }
            }
        };

        return chatElement;
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
                const transformedPayload = this.chatElement.history?.map(item => ({
                    role: item.role === 'ai' ? 'assistant' : item.role,
                    content: [
                        {
                            text: item.text
                        }
                    ]
                }));

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
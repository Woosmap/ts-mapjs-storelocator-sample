import 'deep-chat';
import {Signals} from 'deep-chat/dist/types/handler';
import aiBot from "../../assets/ai.svg";
import Component from "../component";
import {DeepChat} from "deep-chat";

export interface IChatbotComponent {
    messages?: { text: string, sender: string }[];
}

export enum ChatbotComponentEvents {
    MESSAGE_SENT = "message_sent",
    MESSAGE_RECEIVED = "message_received",
}

interface Action {
    action: string;
    parameters: {
        search?: string;
        [key: string]: any;
    };
}

export default class ChatbotComponent extends Component<IChatbotComponent> {
    init(): void {
        this.$element = <HTMLDivElement>document.createElement("div");
        this.$element.classList.add("chatWrapper", "chatWrapper__hidden");
        const botButton = this.createBotButton();
        this.$target.append(this.$element, botButton);
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
        minimizeBtn.addEventListener("click", () => this.toggle(this.$element));
        chatHeader.append(headerTitleElement, minimizeBtn);

        return chatHeader;
    }

    createBotButton(): HTMLElement {
        const botBtnElement = document.createElement('div');
        botBtnElement.classList.add('botButton');
        botBtnElement.classList.add('botButton__avatar');
        botBtnElement.addEventListener('click', () => this.toggle(this.$element));
        return botBtnElement;
    }

    createChatElement(): DeepChat {
        const chatElement: DeepChat = document.createElement("deep-chat");
        chatElement.setAttribute("id", "chat-element");
        chatElement.setAttribute("style", "border: none");
        chatElement.avatars = {
            "default": {
                "styles": {
                    "avatar": {"height": "30px", "width": "30px"},
                    "container": {"marginTop": "8px"}
                }
            },
            "ai": {"src": aiBot, "styles": {"avatar": {"marginLeft": "-3px"}}}
        };
        chatElement.textInput = {"placeholder": {"text": "Welcome!"}};
        chatElement.setAttribute(
            "introMessage",
            JSON.stringify({
                text: "Welcome to our Store Locator! I'm your AI assistant, here to help you find the nearest stores and answer any questions you may have.",
            })
        );

        chatElement.connect = {
            handler: (body: Request, signals: Signals) => {
                console.log(body);
                try {
                    fetch('https://8iaxcc0rti.execute-api.us-east-1.amazonaws.com/dev/generate-action/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    }).then((response) => response.json())
                        .then((data) => {
                            let answer;
                            try {
                                answer = JSON.parse(data["text"]);
                            } catch (e) {
                                answer = {text: data["text"]};
                            }
                            signals.onResponse({text: answer["assistant"] || answer["text"]});
                            if (answer["actions"] && answer["actions"].length > 0) {
                                answer["actions"].forEach((action: Action) => {
                                    switch (action.action) {
                                        case "find_nearest_stores":
                                            console.log(`Searching for stores near: ${action.parameters.search}`);
                                            break;
                                        case "get_directions":
                                            console.log(`Getting directions to: ${action.parameters.search}`);
                                            break;
                                        case "filter_stores":
                                            console.log(`Filtering stores`);
                                            break;
                                        case "move_map":
                                            console.log(`Moving map`);
                                            break;
                                        default:
                                            console.log(`Unknown action: ${action.action}`);
                                    }
                                });
                            }
                        })
                        .catch((e) => {
                            signals.onResponse({error: e}); // displays an error message
                        });
                } catch (e) {
                    signals.onResponse({error: 'Error'}); // displays an error message
                }
            }
        };

        return chatElement;
    }


    toggle(element: HTMLElement): void {
        if (element !== null) {
            element.classList?.remove("chatWrapper__hidden");
            if (element.classList.contains("animation-scale-in")) {
                element.classList.remove("animation-scale-in");
                element.classList.add("animation-scale-out");
            } else if (element.classList.contains("animation-scale-out")) {
                element.classList.remove("animation-scale-out");
                element.classList.add("animation-scale-in");
                element.addEventListener("animationend", () => this.dialogueDisplayed(element));
            } else {
                element.classList.add("animation-scale-in");
                element.addEventListener("animationend", () => this.dialogueDisplayed(element));
            }
        }
    }

    dialogueDisplayed(element: HTMLElement): void {
        if (element !== null) {
            element.removeEventListener("animationend", () => this.dialogueDisplayed(element));
            element.focus();
        }
    }
}

const chatConfig = {
    elementId: "chat-element",
    elementStyle: "border: none",
    avatars: {
        "default": {
            "styles": {
                "avatar": {"height": "30px", "width": "30px"},
                "container": {"marginTop": "8px"}
            }
        },
        "ai": {"src": "", "styles": {"avatar": {"marginLeft": "-3px"}}}
    },
    textInput: {"placeholder": {"text": "Welcome!"}},
    introMessage: {
        text: "Welcome to our Store Locator! I'm your AI assistant, here to help you find the nearest stores and answer any questions you may have."
    },
    generateActionAPIUrl: "https://8iaxcc0rti.execute-api.us-east-1.amazonaws.com/dev/generate-action/",
    summarizeResultsAPIUrl: "https://dpvqg0cg58.execute-api.us-east-1.amazonaws.com/dev/summarize-woosmap/",
    speechToText: {
        webSpeech: {"language": "en-US"},
    }
};

export default chatConfig;
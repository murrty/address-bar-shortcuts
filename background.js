browser.omnibox.setDefaultSuggestion({
    description: "Address Bar Shortcuts"
});

const baseReddit = "https://reddit.com/";
const base4chan = "https://boards.4chan.org/";
const base8chan = "https://8kun.top/";

function getMatchingProperties(input, type) {
    var result = [];
    var inputContent = input.split(' ');
    if (inputContent.length > 1) {
        var baseUrl = "http://localhost/";
        switch (type) {
            case 0:
                baseUrl = baseReddit + "r/" + inputContent[1];
                break;
            case 1:
                baseUrl = baseReddit + "u/" + inputContent[1];
                break;
            case 2:
                baseUrl = base4chan + inputContent[1];
                break;
            case 3:
                baseUrl = base8chan + inputContent[1] + "/index.html";
                break;
        }
        
        let suggestion = {
            content: baseUrl,
            description: input
        }
        result.push(suggestion);
    }
    return result;
}

browser.omnibox.onInputChanged.addListener((input, suggest) => {
    var inputContent = input.split(' ');
    if (inputContent.length > 1) {        
        switch(inputContent[0]) {
            case "r":
                suggest(getMatchingProperties(input, 0));
                break;
            case "u": case "user":
                suggest(getMatchingProperties(input, 1));
                break;
            case "b":
                suggest(getMatchingProperties(input, 2));
                break;
            case "b8":
                suggest(getMatchingProperties(input, 3));
                break;
        }
    }
});

browser.omnibox.onInputEntered.addListener((url, disposition) => {
    var inputContent = url.split(' ');
    if (inputContent.length > 1) {
        switch(inputContent[0]) {
            case "r":
                browser.tabs.update({
                    url : baseReddit + "r/" + inputContent[1]
                });
                break;
            case "u": case "user":
                browser.tabs.update({
                    url : baseReddit + "u/" + inputContent[1]
                });
                break;
            case "b":
                browser.tabs.update({
                    url : base4chan + inputContent[1]
                });
                break;
            case "b8":
                browser.tabs.update({
                    url : base8chan + inputContent[1] + "/index.html"
                });
                break;
        }
    }
});
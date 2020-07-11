browser.omnibox.setDefaultSuggestion({
    description: "Address Bar Shortcuts (4chan)"
});

const baseUrl = "https://boards.4chan.org/";
const baseUrlHint = "http://boards.4chan[nel].org/";

function getMatchingProperties(input) {
    var result = [];
    var suggestedUrl = baseUrlHint + input + "/";
    let suggestion = {
        content: suggestedUrl,
        description: input
    }
    result.push(suggestion);
    return result;
}

browser.omnibox.onInputChanged.addListener((input, suggest) => {
    suggest(getMatchingProperties(input));
});

browser.omnibox.onInputEntered.addListener((url, disposition) => {
    browser.tabs.update({
        url : baseUrl + url + "/"
    });
});
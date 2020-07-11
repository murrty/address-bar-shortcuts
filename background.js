browser.omnibox.setDefaultSuggestion({
    description: "Address Bar Shortcuts (subreddit)"
});

const baseUrl = "https://reddit.com/r/";

function getMatchingProperties(input) {
    var result = [];
    var suggestedUrl = baseUrl + input + "/";
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
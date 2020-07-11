browser.omnibox.setDefaultSuggestion({
    description: "Address Bar Shortcuts (8chan)"
});

const baseUrl = "https://8kun.top/";

function getMatchingProperties(input) {
    var result = [];
    var suggestedUrl = baseUrl + input + "/index.html";
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
        url : baseUrl + url + "/index.html"
    });
});
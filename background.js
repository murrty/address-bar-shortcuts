browser.omnibox.setDefaultSuggestion({
    description: "Address Bar Shortcuts (8chan)"
});

const baseUrl = "https://8kun.top/";
var useCatalog = false;

function getMatchingProperties(input) {
    var result = [];
    var suggestedUrl;
    
    if (useCatalog) { suggestedUrl = baseUrl + input + "/catalog.html"; }
    else { suggestedUrl = baseUrl + input + "/index.html"; }
    
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
    var navUrl = baseUrl + url;
    if (useCatalog) {navUrl = baseUrl + url + "/catalog.html"; }
    else {navUrl = baseUrl + url + "/index.html"; }
    
    browser.tabs.update({
        url : navUrl
    });
});

browser.omnibox.onInputStarted.addListener(() => {
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    function onGot(item) {
        useCatalog = item.catalog;
    }

    let getting = browser.storage.local.get("catalog");
    getting.then(onGot, onError);
});
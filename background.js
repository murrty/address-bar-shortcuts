browser.omnibox.setDefaultSuggestion({
    description: "Address Bar Shortcuts (r, u, b, b8)"
});

const baseReddit = "https://reddit.com/";
const base4chan = "https://boards.4chan.org/";
const base8chan = "https://8kun.top/";

var redirect4chan = true;
var redirect8chan = true;
var redirectRedditSub = true;
var redirectRedditUser = true;

var use8chanCatalog = false;

function getMatchingProperties(input, type) {
    var result = [];
    var inputContent = input.split(' ');
    if (inputContent.length > 1) {
        var baseUrl = "";
        switch (type) {
            case 0:
                if (redirectRedditSub){                    
                    baseUrl = baseReddit + "r/" + inputContent[1];
                }
                break;
            case 1:
                if (redirectRedditUser) {
                    baseUrl = baseReddit + "u/" + inputContent[1];
                }
                break;
            case 2:
                if (redirect4chan) {
                    baseUrl = base4chan + inputContent[1];
                }
                break;
            case 3:
                if (redirect8chan) {
                    if (use8chanCatalog) {
                        baseUrl = base8chan + inputContent[1] + "/catalog.html";
                    }
                    else {
                        baseUrl = base8chan + inputContent[1] + "/index.html";
                    }
                }
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
                if (redirectRedditSub) {                    
                    browser.tabs.update({
                        url : baseReddit + "r/" + inputContent[1]
                    });
                }
                break;
            case "u": case "user":
                if (redirectRedditUser){                
                    browser.tabs.update({
                        url : baseReddit + "u/" + inputContent[1]
                    });
                }
                break;
            case "b":
                if (redirect4chan) {                    
                    browser.tabs.update({
                        url : base4chan + inputContent[1]
                    });
                }
                break;
            case "b8":
                if (redirect8chan) {     
                    var redirectUrl;
                    if (use8chanCatalog) {
                        redirectUrl = base8chan + inputContent[1] + "/catalog.html";
                    }
                    else {
                        redirectUrl = base8chan + inputContent[1] + "/index.html";
                    }
                    browser.tabs.update({
                        url : redirectUrl
                    });
                }
                break;
        }
    }
});

browser.omnibox.onInputStarted.addListener(() => {
    function onError(error) {
        console.log(`Error: ${error}`);
    }

    function onGot(item) {
        use8chanCatalog = item.catalog8ch;
        redirect4chan = item.enable4chan;
        redirect8chan = item.enable8chan;
        redirectRedditSub = item.enableRedditSub;
        redirectRedditUser = item.enableRedditUser;
    }

    let getting = browser.storage.local.get();
    getting.then(onGot, onError);
    
    console.log("input started");
});
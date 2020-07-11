browser.omnibox.setDefaultSuggestion({
    description: "Address Bar Shortcuts"
});

const baseReddit = "https://reddit.com/";
const base4chan = "https://boards.4chan.org/";
const base8chan = "https://8kun.top/";

function getMatchingProperties(input, type) {
    var result = [];
    console.log(input);
    if (input.split(' ').count > 1) {
        console.log("count > 1")
        var baseUrl = "http://localhost/";
        switch (type) {
            case 0:
                baseUrl = baseReddit + "r/" + input.split(' ')[1];
                break;
            case 1:
                baseUrl = baseReddit + "u/" + input.split(' ')[1];
                break;
            case 2:
                baseUrl = base4chan + input.split(' ')[1];
                break;
            case 3:
                baseUrl = base8chan + input.split(' ')[1] + "/index.html";
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
    var inputKeyword = "";
    if (input.split(' ').count > 1) {
        inputKeyword = input.split(' ')[0];
    }
    else {
        inputKeyword = input;
    }
    switch(inputKeyword) {
        case "r": // 0
            suggest(getMatchingProperties(input, 0));
            break;
        case "u": case "user": // 1
            suggest(getMatchingProperties(input, 1));
            break;
        case "b": // 2
            suggest(getMatchingProperties(input, 2));
            break;
        case "b8": // 3
            suggest(getMatchingProperties(input, 3));
            break;
    }
});

    browser.omnibox.onInputEntered.addListener((url, disposition) => {
        var newUrl = "http://localhost/";
        switch(url.split(' ')[0]) {
            case "r": // 0
                newUrl = baseReddit + "r/" + url.split(' ')[1];
                break;
            case "u": case "user": // 1
                newUrl = baseReddit + "u/" + url.split(' ')[1];
                break;
            case "b": // 2
                newUrl = base4chan + url.split(' ')[1];
                break;
            case "b8": // 3
                newUrl = base8chan + url.split(' ')[1] + "/index.html";
                break;
        }
    
    browser.tabs.update({
    url : newUrl
    });
});
var redirectRedditSub = true;
var redirectRedditUser = true;
var redirect4chan = true;
var redirect8chan = true;
var use8chanCatalog = false;

function addressShortcut( details ) {
	var linkElement = document.createElement('a');
	linkElement.href = details.url;
    
    console.log("called addressShortcut");

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    function onGot(item) {
        redirect4chan = item.enable4chan || true;
        redirect8chan = item.enable8chan || true;
        redirectRedditSub = item.enableRedditSub || true;
        redirectRedditUser = item.enableRedditUser || true;
        use8chanCatalog = item.catalog8ch || false;
    }

    let getting = browser.storage.local.get();
    getting.then(onGot, onError);
    
    switch (linkElement.hostname){
        case "r":
            if (redirectRedditSub) {
                browser.tabs.update( {
                        url: 'https://reddit.com/r' + linkElement.pathname
                    }
                );
            }
            break;
        case "u": case "user":
            if (redirectRedditUser) {
                browser.tabs.update( {
                        url: 'https://reddit.com/user' + linkElement.pathname
                    }
                );
            }
            break;
        case "b":
            if (redirect4chan) {
                browser.tabs.update( {
                        url: 'https://boards.4chan.org' + linkElement.pathname
                    }
                );
            }
            break;
        case "b8":
            if (redirect8chan) {
                var baseUrl;
                if (use8chanCatalog) {
                    baseUrl = "https://8kun.top" + linkElement.pathname + "/index.html";
                }
                else {
                    baseUrl = "https://8kun.top" + linkElement.pathname + "/catalog.html";
                }
                browser.tabs.update({
                    url: baseUrl
                });
            }
            break;
    }
}

browser.webNavigation.onBeforeNavigate.addListener(
	addressShortcut, {
		url: [ {hostPrefix: "r"},
               {hostPrefix: "u"},
               {hostPrefix: "user"},
               {hostPrefix: "b"},
               {hostPrefix: "b8"}
             ]
	}
);
var redirectRedditSub = true;
var redirectRedditUser = true;
var redirect4chan = true;
var redirect8chan = true;
var outputDebug = false;

function addressShortcut( details ) {
	var linkElement = document.createElement( 'a' );
	linkElement.href = details.url;
    if (outputDebug) {
        console.log("details.url: " + details.url);
        console.log("linkElement.href: " + linkElement.href);
    }
    
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
                browser.tabs.update( {
                        url: 'https://8kun.top' + linkElement.pathname + '/index.html'
                    }
                );
            }
            break;
    }
}

browser.webNavigation.onBeforeNavigate.addListener(
	addressShortcut, {
		url: [ {
				urlMatches: '.*'
			}
		]
	}
);
var redirectToCatalog = document.querySelector("#use-catalog");

function saveOptions(e) {
    e.preventDefault();
    var checkStatus = "false";
    if (redirectToCatalog.checked == true) { checkStatus = "true"; }
    browser.storage.local.set({
        catalog: checkStatus
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        if (result.catalog == "true") { redirectToCatalog.checked = true; }
        else { redirectToCatalog.checked = false; }
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("catalog");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll('input').forEach(element => element.addEventListener('change', saveOptions));
var redirectToCatalog = document.querySelector("#use-catalog");

function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        catalog: redirectToCatalog.checked
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        redirectToCatalog.checked = result.catalog;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("catalog");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll('input').forEach(element => element.addEventListener('change', saveOptions));
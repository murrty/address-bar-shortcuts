/*
Internal settings names:
enable4chan
enable8chan
enableRedditSub
enableRedditUser

catalog8ch
*/

var redirect4chan = document.querySelector("#redirect4chan");
var redirect8chan = document.querySelector("#redirect8chan");
var redirectRedditSub = document.querySelector("#redirectRedditSub");
var redirectRedditUser = document.querySelector("#redirectRedditUser");
var redirectToCatalog8ch = document.querySelector("#redirectToCatalog8ch");

function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        enable4chan: redirect4chan.checked,
        enable8chan: redirect8chan.checked,
        enableRedditSub: redirectRedditSub.checked,
        enableRedditUser: redirectRedditUser.checked,
        catalog8ch: redirectToCatalog8ch.checked
    });
}

function restoreOptions() {
    function onGot(result) {
        redirect4chan.checked = result.enable4chan || true;
        redirect8chan.checked = result.enable8chan || true;
        redirectRedditSub.checked = result.enableRedditSub || true;
        redirectRedditUser.checked = result.enableRedditUser || true;
        
        redirectToCatalog8ch.checked = result.catalog8ch || false;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }
    
    var getting = browser.storage.local.get();
    getting.then(onGot, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll('input').forEach(element => element.addEventListener('change', saveOptions));
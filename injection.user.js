// ==UserScript==
// @name         UWP Helper
// @namespace    http://tampermonkey.net/
// @version      2024-02-03
// @description  Universal Web Panel Helper
// @author       aminought
// @match        https://*/*web_panel.html
// @match        file:///*/*web_panel.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // debugger;

    function runTweaks(root, domain) {
        console.log('running tweaks...');
        if (domain.includes('translated.turbopages.org')) {
            root.getElementsByClassName('tr-stripe__main-row')[0].remove();
            console.log('custom tweaks executed')
            console.log('tweaks executed');
            return;
        }
        if (domain.includes('300.ya.ru')) {
            root.getElementsByClassName('banner')[0].remove();
            root.getElementsByClassName('main-input')[0].remove();
            root.getElementsByClassName('user-badge')[0].remove();
            root.getElementsByClassName('layout__logo')[0].remove();
            root.getElementsByClassName('layout')[0].style.paddingTop = '0px';
        }
        console.log('tweaks executed');
    }

    function getContentTitle(content) {
        const title = content.getElementsByTagName('title')[0];
        if (!title) return 'Universal Web Panel';
        return title.innerText;
    }

    function extractDomain(url) {
        return url.match(/([\w-]+\.)+([\w-]+)/)[0];
    }

    function fixUrl(url) {
        return url + (url.includes('?') ? '&' : '?') + 'uwp_action=web_panel.html';
    }

    function openUrl(url) {
        console.log(`loading page ${url}...`);
        window.open(fixUrl(url), '_self');
        console.log(`page ${url} loaded`);
    }

    function showHtml(input, root) {
        console.log('rendering html...');
        root.innerHTML = input;
        document.title = getContentTitle(root);
        console.log('html rendered');
    }

    function addVisibilityListener(inputField) {
        console.log('adding visibility event listener...');
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') {
                inputField.focus();
            }
        });
        console.log('visibility event listener added');
    }

    function addInputListener(inputField) {
        console.log('adding input event listener...');
        inputField.addEventListener('input', function () {
            execute();
        });
        console.log('input event listener added');
    }

    function addClickListener() {
        console.log('adding click event listener...');
        window.addEventListener('click', function(event) {
            var target = event.target;
            if (target.parentElement.tagName.toLowerCase() === "a") {
                target = target.parentElement;
            }
            if (target.tagName.toLowerCase() === "a") {
                var href = target.getAttribute("href");
                target.setAttribute("href", fixUrl(href));
            }
        });
        console.log('click event listener added');
    }

    function addEventListeners(inputField) {
        console.log('adding event listeners...');
        addVisibilityListener(inputField);
        addInputListener(inputField);
        addClickListener();
        console.log('event listeners added');
    }

    function insertInput() {
        console.log('inserting input field...');
        const inputHtml = `
            <input type="text" id="input" placeholder="Paste your link or html"
            autofocus style="width: 100%; padding: 12px 20px;
            margin: 8px 0; display: inline-block; border: 1px solid #ccc;
            border-radius: 4px; box-sizing: border-box; position: fixed;
            top: 0; left: 0; z-index: 999999;"><br>
        `
        document.body.insertAdjacentHTML('afterbegin', inputHtml);
        var inputField = document.getElementById('input');
        inputField.focus();
        console.log('input field inserted');
        return inputField;
    }

    function handleInput(input) {
        console.log('handling input...');
        if (input.startsWith('http://') || input.startsWith('https://')) {
            openUrl(input);
        } else {
            showHtml(input, document.documentElement);
        }
        console.log('input handled');
    }

    function execute() {
        console.log('executing...');
        var inputField = document.getElementById('input');
        handleInput(inputField.value);
        console.log('executed');
    }


    window.addEventListener('load', function() {
        console.log('UWP injection...');
        var inputField = insertInput();
        const domain = extractDomain(location.href);
        runTweaks(document.documentElement, domain);
        addEventListeners(inputField);
        console.log('UWP injected');
    });
})();
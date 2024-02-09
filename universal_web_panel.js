(function universal_web_panel() {
    'use strict';

    const BUTTON_NUMBER = 0;
    const WEBPANEL_NUMBER = 0;

    const DEFAULT_TITLE = 'Universal Web Panel';
    const DEFAULT_ICON =
        'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgY2xhc3M9Imljb24iIHZpZXdCb3g9IjAgMCAyMC40OCAyMC40OCI+PGcgc3R5bGU9InN0cm9rZS13aWR0aDoxLjAwMDg2O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSI+PHBhdGggZmlsbD0iI2Y5YzBjMCIgZD0iTTI0OS41IDcwMC42YzE0LjUgMTM1LjUgMTMyLjYgMjQxLjEgMjc2IDI0MS4xczI2MS41LTEwNS42IDI3Ni0yNDEuMXoiIHN0eWxlPSJzdHJva2Utd2lkdGg6MS4wMDA4NjtzdHJva2UtZGFzaGFycmF5Om5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uODk0IC0uOTI0KSBzY2FsZSguMDIxNzQpIi8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTUxMiA5NTcuM2MtNzkuNiAwLTE1NC41LTI4LjctMjEwLjgtODAuOC01Ni41LTUyLjItODcuNi0xMjEuNy04Ny42LTE5NS43IDAtNTkuNyAyMC4yLTExNi41IDU4LjQtMTY0LjMgMzYuMi00NS4zIDg1LjQtNzguOCAxNDIuNi05Ny4xVjIwNi4xaC00Ni4xYy0xMS4yIDAtMjAuNC05LjEtMjAuNC0yMC40di0xNy4xYzAtMTEuMiA5LjEtMjAuNCAyMC40LTIwLjRoMjg3LjJjMTEuMiAwIDIwLjQgOS4xIDIwLjQgMjAuNHYxNy4xYzAgMTEuMi05LjEgMjAuNC0yMC40IDIwLjRoLTQ2LjF2MjEzLjRjNTcuMSAxOC4zIDEwNi4zIDUxLjggMTQyLjYgOTcuMSAzOC4yIDQ3LjggNTguNCAxMDQuNiA1OC40IDE2NC4zIDAgNzQtMzEuMSAxNDMuNS04Ny42IDE5NS43LTU2LjUgNTItMTMxLjQgODAuNy0yMTEgODAuN3pNMzY4LjQgMTYzLjJjLTMgMC01LjQgMi40LTUuNCA1LjR2MTcuMWMwIDMgMi40IDUuNCA1LjQgNS40aDYxLjF2MjM5LjVsLTUuMyAxLjZjLTU2LjUgMTctMTA1LjEgNDkuNC0xNDAuNSA5My43LTM2IDQ1LjEtNTUuMSA5OC43LTU1LjEgMTU0LjkgMCA2OS43IDI5LjQgMTM1LjMgODIuOCAxODQuN0MzNjUgOTE1IDQzNi4yIDk0Mi4zIDUxMiA5NDIuM3MxNDcuMS0yNy4zIDIwMC42LTc2LjhjNTMuNC00OS40IDgyLjgtMTE1IDgyLjgtMTg0LjcgMC01Ni4yLTE5LTEwOS44LTU1LjEtMTU0LjktMzUuNC00NC40LTg0LTc2LjgtMTQwLjUtOTMuN2wtNS4zLTEuNlYxOTEuMWg2MS4xYzMgMCA1LjQtMi40IDUuNC01LjR2LTE3LjFjMC0zLTIuNC01LjQtNS40LTUuNHoiIHN0eWxlPSJzdHJva2Utd2lkdGg6MS4wMDA4NjtzdHJva2UtZGFzaGFycmF5Om5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uODk0IC0uOTI0KSBzY2FsZSguMDIxNzQpIi8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTIyMC43IDY3Ni44aDU4MS45djhIMjIwLjdabTE5Mi4zLTQ4NmgzOS42djhINDEzWm04Mi41IDBoMTA2LjF2OEg0OTUuNVoiIHN0eWxlPSJzdHJva2Utd2lkdGg6MS4wMDA4NjtzdHJva2UtZGFzaGFycmF5Om5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uODk0IC0uOTI0KSBzY2FsZSguMDIxNzQpIi8+PHBhdGggZmlsbD0iI2NlMDIwMiIgZD0iTTQ1Mi43IDY0NS43Yy0xNCAwLTI1LjQtMTEuNC0yNS40LTI1LjQgMC0xNCAxMS40LTI1LjQgMjUuNC0yNS40IDE0IDAgMjUuNCAxMS40IDI1LjQgMjUuNCAwIDE0LTExLjQgMjUuNC0yNS40IDI1LjR6bTAtNDIuOWMtOS42IDAtMTcuNCA3LjgtMTcuNCAxNy40IDAgOS42IDcuOCAxNy40IDE3LjQgMTcuNCA5LjYgMCAxNy40LTcuOCAxNy40LTE3LjQgMC05LjYtNy44LTE3LjQtMTcuNC0xNy40em0xMTguOS00NmMtMjcuNiAwLTUwLjEtMjIuNS01MC4xLTUwLjFzMjIuNS01MC4xIDUwLjEtNTAuMSA1MC4xIDIyLjUgNTAuMSA1MC4xLTIyLjUgNTAuMS01MC4xIDUwLjF6bTAtOTIuMmMtMjMuMiAwLTQyLjEgMTguOS00Mi4xIDQyLjEgMCAyMy4yIDE4LjkgNDIuMSA0Mi4xIDQyLjEgMjMuMiAwIDQyLjEtMTguOSA0Mi4xLTQyLjEgMC0yMy4yLTE4LjktNDIuMS00Mi4xLTQyLjF6bS04MC40LTE0Ny45Yy0xNyAwLTMwLjgtMTMuOC0zMC44LTMwLjhzMTMuOC0zMC44IDMwLjgtMzAuOCAzMC44IDEzLjggMzAuOCAzMC44LTEzLjggMzAuOC0zMC44IDMwLjh6bTAtNTMuNmMtMTIuNiAwLTIyLjggMTAuMi0yMi44IDIyLjggMCAxMi42IDEwLjIgMjIuOCAyMi44IDIyLjggMTIuNiAwIDIyLjgtMTAuMiAyMi44LTIyLjggMC0xMi42LTEwLjItMjIuOC0yMi44LTIyLjh6bTUyLTE1MGMtMTIgMC0yMS43LTkuNy0yMS43LTIxLjdzOS43LTIxLjcgMjEuNy0yMS43IDIxLjcgOS43IDIxLjcgMjEuNy05LjcgMjEuNy0yMS43IDIxLjd6bTAtMzUuNGMtNy41IDAtMTMuNyA2LjEtMTMuNyAxMy43czYuMSAxMy43IDEzLjcgMTMuNyAxMy43LTYuMSAxMy43LTEzLjctNi4xLTEzLjctMTMuNy0xMy43eiIgc3R5bGU9InN0cm9rZS13aWR0aDoxLjAwMDg2O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLS44OTQgLS45MjQpIHNjYWxlKC4wMjE3NCkiLz48L2c+PC9zdmc+';

    const PANEL_CHANGE_OBSERVER = new MutationObserver((records) => {
        records.forEach((record) => {
            if (record.type === 'attributes') {
                const targetClasses = record.target.classList;
                if (
                    targetClasses.contains('visible') &&
                    targetClasses.contains('webpanel')
                ) {
                    addUniversalInputToolbar(record.target);
                }
            } else if (record.type === 'childList') {
                record.addedNodes.forEach((node) => {
                    if (node.classList && node.classList.contains('webpanel')) {
                        addUniversalInputToolbar(node);
                    }
                });
            }
        });
    });

    const WEBVIEW_CHANGE_OBSERVER = new MutationObserver((records) => {
        records.forEach((record) => {
            var src = record.target.getAttribute('src');
            if (src === 'about:blank') {
                src = null;
                const titleSpan = record.target.parentElement.parentElement
                    .querySelector('.webpanel-title')
                    .querySelector('span');
                setTimeout(() => (titleSpan.innerText = DEFAULT_TITLE), 300);
            }
            setButtonIcon(src);
        });
    });

    function focusInput(input, delay = 100) {
        setTimeout(() => input.focus(), delay);
    }

    function setButtonIcon(url) {
        const buttons = document.querySelectorAll('.button-toolbar-webpanel');
        const button = buttons[BUTTON_NUMBER];
        const img = button.querySelector('img');
        img.removeAttribute('srcset');
        const src = (() => {
            if (url) {
                url = encodeURIComponent(url);
                return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}u&size=16`;
            } else {
                return `data:image/svg+xml;base64,${DEFAULT_ICON}`;
            }
        })();
        img.setAttribute('src', src);
    }

    function showWebview(panel, webview) {
        if (webview.style.display === 'none') {
            const htmlView = panel.querySelector('#htmlview');
            htmlView.remove();
            webview.style.display = '';
        }
    }

    function hideWebview(webview) {
        webview.style.display = 'none';
    }

    function openUrl(url, panel, webview) {
        showWebview(panel, webview);
        webview.src = url;
    }

    function getOrCreateHtmlView(panel) {
        var htmlView = panel.querySelector('#htmlview');
        if (!htmlView) {
            htmlView = document.createElement('div');
            htmlView.id = 'htmlview';
            htmlView.style.height = '100%';
            htmlView.style.overflow = 'auto';
        }
        return htmlView;
    }

    function showHtml(html, panel, webview) {
        hideWebview(webview);

        const content = panel.querySelector('.webpanel-content');
        const htmlView = getOrCreateHtmlView(panel);
        htmlView.innerHTML = html;
        content.appendChild(htmlView);

        const title = panel
            .querySelector('.webpanel-title')
            .querySelector('span');
        title.innerText = DEFAULT_TITLE;
        setButtonIcon();
    }

    function executeScript(script, panel, webview) {
        showWebview(panel, webview);
        webview.executeScript({ code: script });
    }

    function createUniversalInput(panel) {
        const input = document.createElement('input');
        input.className = 'universal-input';
        input.type = 'text';
        input.placeholder = 'Paste your link, html or javascript';
        input.style.width = '100%';
        input.style.height = '24px';
        input.style.padding = '10px';

        input.addEventListener('input', () => {
            const webview = panel.querySelector('webview');
            const value = input.value.trim();
            if (
                value.startsWith('http://') ||
                value.startsWith('https://') ||
                value.startsWith('file://') ||
                value.startsWith('vivaldi://') ||
                value === 'about::blank'
            ) {
                openUrl(value, panel, webview);
            } else if (value.startsWith('(()') && value.endsWith(')()')) {
                executeScript(value, panel, webview);
            } else {
                showHtml(value, panel, webview);
            }
            input.value = '';
        });

        return input;
    }

    function checkWebPanel(panel) {
        return panel.parentElement.children[WEBPANEL_NUMBER] === panel;
    }

    function checkUniversalInput(panel) {
        const input = panel.querySelector('.universal-input');
        if (input) {
            focusInput(input);
            return true;
        }
        return false;
    }

    function createUniversalInputToolbar(panel) {
        const universalInputToolbar = document.createElement('div');
        universalInputToolbar.className =
            'panel-universal-input toolbar-default full-width';
        universalInputToolbar.width = '100%';
        universalInputToolbar.style.height = '24px';
        universalInputToolbar.style.width = '100%';
        universalInputToolbar.style.height = '24px';
        universalInputToolbar.style.paddingRight = '1px';
        universalInputToolbar.style.marginTop = '2px';

        const input = createUniversalInput(panel);
        focusInput(input);
        universalInputToolbar.appendChild(input);

        return universalInputToolbar;
    }

    function addButtonsEvents(panel, webview) {
        const buttons = panel.querySelectorAll('button.button-toolbar');
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                showWebview(panel, webview);
            });
        });
    }

    function addUniversalInputToolbar(panel) {
        if (!checkWebPanel(panel)) return;

        const webview = panel.querySelector('webview');
        setTimeout(() => addButtonsEvents(panel, webview), 300);

        const hasUniversalInput = checkUniversalInput(panel);
        if (hasUniversalInput) return;

        beginWebviewObservation(webview);
        const universalInputToolbar = createUniversalInputToolbar(panel);
        panel.appendChild(universalInputToolbar);
    }

    function beginWebviewObservation(webview) {
        WEBVIEW_CHANGE_OBSERVER.observe(webview, {
            attributes: true,
            attributeFilter: ['src'],
            childList: false,
            subtree: false,
        });
    }

    function beginPanelsObservation(webPanelStack) {
        PANEL_CHANGE_OBSERVER.observe(webPanelStack, {
            attributes: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true,
        });
    }

    function initMod() {
        const webPanels = document.querySelector('#panels');
        if (webPanels) {
            beginPanelsObservation(webPanels);
            const alreadyOpenPanel = document.querySelector(
                '.panel.webpanel.visible'
            );
            if (alreadyOpenPanel) {
                addUniversalInputToolbar(alreadyOpenPanel);
            }
        } else {
            setTimeout(initMod, 500);
        }
    }

    setTimeout(initMod, 500);
})();

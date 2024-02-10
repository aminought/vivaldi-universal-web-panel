(function universal_web_panel() {
  "use strict";

  const BUTTON_NUMBER = 0;
  const WEBPANEL_NUMBER = 0;

  const DEFAULT_TITLE = "Universal Web Panel";
  const DEFAULT_ICON =
    "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgY2xhc3M9Imljb24iIHZpZXdCb3g9IjAgMCAyMC40OCAyMC40OCI+PGcgc3R5bGU9InN0cm9rZS13aWR0aDoxLjAwMDg2O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSI+PHBhdGggZmlsbD0iI2Y5YzBjMCIgZD0iTTI0OS41IDcwMC42YzE0LjUgMTM1LjUgMTMyLjYgMjQxLjEgMjc2IDI0MS4xczI2MS41LTEwNS42IDI3Ni0yNDEuMXoiIHN0eWxlPSJzdHJva2Utd2lkdGg6MS4wMDA4NjtzdHJva2UtZGFzaGFycmF5Om5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uODk0IC0uOTI0KSBzY2FsZSguMDIxNzQpIi8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTUxMiA5NTcuM2MtNzkuNiAwLTE1NC41LTI4LjctMjEwLjgtODAuOC01Ni41LTUyLjItODcuNi0xMjEuNy04Ny42LTE5NS43IDAtNTkuNyAyMC4yLTExNi41IDU4LjQtMTY0LjMgMzYuMi00NS4zIDg1LjQtNzguOCAxNDIuNi05Ny4xVjIwNi4xaC00Ni4xYy0xMS4yIDAtMjAuNC05LjEtMjAuNC0yMC40di0xNy4xYzAtMTEuMiA5LjEtMjAuNCAyMC40LTIwLjRoMjg3LjJjMTEuMiAwIDIwLjQgOS4xIDIwLjQgMjAuNHYxNy4xYzAgMTEuMi05LjEgMjAuNC0yMC40IDIwLjRoLTQ2LjF2MjEzLjRjNTcuMSAxOC4zIDEwNi4zIDUxLjggMTQyLjYgOTcuMSAzOC4yIDQ3LjggNTguNCAxMDQuNiA1OC40IDE2NC4zIDAgNzQtMzEuMSAxNDMuNS04Ny42IDE5NS43LTU2LjUgNTItMTMxLjQgODAuNy0yMTEgODAuN3pNMzY4LjQgMTYzLjJjLTMgMC01LjQgMi40LTUuNCA1LjR2MTcuMWMwIDMgMi40IDUuNCA1LjQgNS40aDYxLjF2MjM5LjVsLTUuMyAxLjZjLTU2LjUgMTctMTA1LjEgNDkuNC0xNDAuNSA5My43LTM2IDQ1LjEtNTUuMSA5OC43LTU1LjEgMTU0LjkgMCA2OS43IDI5LjQgMTM1LjMgODIuOCAxODQuN0MzNjUgOTE1IDQzNi4yIDk0Mi4zIDUxMiA5NDIuM3MxNDcuMS0yNy4zIDIwMC42LTc2LjhjNTMuNC00OS40IDgyLjgtMTE1IDgyLjgtMTg0LjcgMC01Ni4yLTE5LTEwOS44LTU1LjEtMTU0LjktMzUuNC00NC40LTg0LTc2LjgtMTQwLjUtOTMuN2wtNS4zLTEuNlYxOTEuMWg2MS4xYzMgMCA1LjQtMi40IDUuNC01LjR2LTE3LjFjMC0zLTIuNC01LjQtNS40LTUuNHoiIHN0eWxlPSJzdHJva2Utd2lkdGg6MS4wMDA4NjtzdHJva2UtZGFzaGFycmF5Om5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uODk0IC0uOTI0KSBzY2FsZSguMDIxNzQpIi8+PHBhdGggZmlsbD0iIzk5OSIgZD0iTTIyMC43IDY3Ni44aDU4MS45djhIMjIwLjdabTE5Mi4zLTQ4NmgzOS42djhINDEzWm04Mi41IDBoMTA2LjF2OEg0OTUuNVoiIHN0eWxlPSJzdHJva2Utd2lkdGg6MS4wMDA4NjtzdHJva2UtZGFzaGFycmF5Om5vbmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0uODk0IC0uOTI0KSBzY2FsZSguMDIxNzQpIi8+PHBhdGggZmlsbD0iI2NlMDIwMiIgZD0iTTQ1Mi43IDY0NS43Yy0xNCAwLTI1LjQtMTEuNC0yNS40LTI1LjQgMC0xNCAxMS40LTI1LjQgMjUuNC0yNS40IDE0IDAgMjUuNCAxMS40IDI1LjQgMjUuNCAwIDE0LTExLjQgMjUuNC0yNS40IDI1LjR6bTAtNDIuOWMtOS42IDAtMTcuNCA3LjgtMTcuNCAxNy40IDAgOS42IDcuOCAxNy40IDE3LjQgMTcuNCA5LjYgMCAxNy40LTcuOCAxNy40LTE3LjQgMC05LjYtNy44LTE3LjQtMTcuNC0xNy40em0xMTguOS00NmMtMjcuNiAwLTUwLjEtMjIuNS01MC4xLTUwLjFzMjIuNS01MC4xIDUwLjEtNTAuMSA1MC4xIDIyLjUgNTAuMSA1MC4xLTIyLjUgNTAuMS01MC4xIDUwLjF6bTAtOTIuMmMtMjMuMiAwLTQyLjEgMTguOS00Mi4xIDQyLjEgMCAyMy4yIDE4LjkgNDIuMSA0Mi4xIDQyLjEgMjMuMiAwIDQyLjEtMTguOSA0Mi4xLTQyLjEgMC0yMy4yLTE4LjktNDIuMS00Mi4xLTQyLjF6bS04MC40LTE0Ny45Yy0xNyAwLTMwLjgtMTMuOC0zMC44LTMwLjhzMTMuOC0zMC44IDMwLjgtMzAuOCAzMC44IDEzLjggMzAuOCAzMC44LTEzLjggMzAuOC0zMC44IDMwLjh6bTAtNTMuNmMtMTIuNiAwLTIyLjggMTAuMi0yMi44IDIyLjggMCAxMi42IDEwLjIgMjIuOCAyMi44IDIyLjggMTIuNiAwIDIyLjgtMTAuMiAyMi44LTIyLjggMC0xMi42LTEwLjItMjIuOC0yMi44LTIyLjh6bTUyLTE1MGMtMTIgMC0yMS43LTkuNy0yMS43LTIxLjdzOS43LTIxLjcgMjEuNy0yMS43IDIxLjcgOS43IDIxLjcgMjEuNy05LjcgMjEuNy0yMS43IDIxLjd6bTAtMzUuNGMtNy41IDAtMTMuNyA2LjEtMTMuNyAxMy43czYuMSAxMy43IDEzLjcgMTMuNyAxMy43LTYuMSAxMy43LTEzLjctNi4xLTEzLjctMTMuNy0xMy43eiIgc3R5bGU9InN0cm9rZS13aWR0aDoxLjAwMDg2O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLS44OTQgLS45MjQpIHNjYWxlKC4wMjE3NCkiLz48L2c+PC9zdmc+";

  class UWP {
    #panel;
    #panelChangeObserver;

    constructor(panel) {
      this.#panel = panel;
      this.#panelChangeObserver = this.#createPanelChangeObserver();
      this.#register();
    }

    #register() {
      if (this.#isVisible && !this.#input) {
        this.webviewChangeObserver = this.#createWebviewChangeObserver();
        this.#createInputToolbarAndInput();
        this.#addInputEvents();
        this.#addButtonsEvents();
      }
      this.#focusInput();
    }

    // listeners

    #createPanelChangeObserver() {
      const panelChangeObserver = new MutationObserver((records) => {
        records.forEach(() => this.#handlePanelChange());
      });
      panelChangeObserver.observe(this.#panel, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return panelChangeObserver;
    }

    #createWebviewChangeObserver() {
      const webviewChangeObserver = new MutationObserver((records) => {
        records.forEach((record) => this.#handleWebviewChange(record));
      });
      webviewChangeObserver.observe(this.#webview, {
        attributes: true,
        attributeFilter: ["src"],
        childList: false,
        subtree: false,
      });
      return webviewChangeObserver;
    }

    #addButtonsEvents() {
      this.#buttonsToolbar.forEach((button) => {
        button.addEventListener("click", () => this.#showWebview());
      });
    }

    #addInputEvents() {
      this.#input.addEventListener("input", () => this.#handleInput());
    }

    // builders

    #createInputToolbarAndInput() {
      const input = this.#createInput();
      const inputToolbar = this.#createInputToolbar();
      inputToolbar.appendChild(input);
      this.#panel.appendChild(inputToolbar);
    }

    #createInputToolbar() {
      const inputToolbar = document.createElement("div");
      inputToolbar.className =
        "panel-universal-input toolbar-default full-width";
      inputToolbar.width = "100%";
      inputToolbar.style.height = "24px";
      inputToolbar.style.width = "100%";
      inputToolbar.style.height = "24px";
      inputToolbar.style.paddingRight = "1px";
      inputToolbar.style.marginTop = "2px";
      return inputToolbar;
    }

    #createInput() {
      const input = document.createElement("input");
      input.className = "universal-input";
      input.type = "text";
      input.placeholder = "Paste your link, html or javascript";
      input.style.width = "100%";
      input.style.height = "24px";
      input.style.padding = "10px";
      return input;
    }

    #createHtmlview() {
      const htmlview = document.createElement("div");
      htmlview.id = "htmlview";
      htmlview.style.height = "100%";
      htmlview.style.overflow = "auto";
      return htmlview;
    }

    // getters

    get #content() {
      return this.#panel.querySelector(".webpanel-content");
    }

    get #titleSpan() {
      return this.#panel.querySelector(".webpanel-title").querySelector("span");
    }

    get #htmlview() {
      return this.#panel.querySelector("#htmlview");
    }

    get #webview() {
      return this.#panel.querySelector("webview");
    }

    get #input() {
      return this.#panel.querySelector(".universal-input");
    }

    get #buttonsToolbar() {
      return this.#panel.querySelectorAll("button.button-toolbar");
    }

    get #buttonImg() {
      const panelsButtons = document.querySelectorAll(
        ".button-toolbar-webpanel",
      );
      const panelButton = panelsButtons[BUTTON_NUMBER];
      return panelButton.querySelector("img");
    }

    get #isVisible() {
      return this.#panel.classList.contains("visible");
    }

    // setters

    set #title(title) {
      setTimeout(() => (this.#titleSpan.innerText = title), 300);
    }

    set #buttonImg(image) {
      this.#buttonImg.removeAttribute("srcset");
      const src = (() => {
        if (image.startsWith("http://") || image.startsWith("https://")) {
          const url = encodeURIComponent(image);
          return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}u&size=16`;
        } else {
          return `data:image/svg+xml;base64,${image}`;
        }
      })();
      this.#buttonImg.setAttribute("src", src);
    }

    // handlers

    #handleInput() {
      const value = this.#input.value.trim();
      if (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("file://") ||
        value.startsWith("vivaldi://") ||
        value === "about::blank"
      ) {
        this.#openUrl(value);
      } else if (value.startsWith("(()") && value.endsWith(")()")) {
        this.#executeScript(value);
      } else {
        this.#showHtml(value);
      }
      this.#clearInput();
    }

    #openUrl(url) {
      this.#showWebview();
      this.#webview.src = url;
    }

    #executeScript(script) {
      this.#showWebview();
      this.#webview.executeScript({ code: script });
    }

    #showHtml(html) {
      this.#hideWebview();
      if (!this.#htmlview) {
        const htmlview = this.#createHtmlview();
        this.#content.appendChild(htmlview);
      }
      this.#htmlview.innerHTML = html;
      this.title = DEFAULT_TITLE;
      this.#buttonImg = DEFAULT_ICON;
    }

    #handleWebviewChange(record) {
      var src = record.target.getAttribute("src");
      if (src === "about:blank") {
        src = DEFAULT_ICON;
        this.#title = DEFAULT_TITLE;
      }
      this.#buttonImg = src;
    }

    #handlePanelChange() {
      this.#register();
    }

    // actions

    #showWebview() {
      if (this.#webview.style.display === "none") {
        this.#htmlview.remove();
        this.#webview.style.display = "";
      }
    }

    #hideWebview() {
      this.#webview.style.display = "none";
    }

    #clearInput() {
      this.#input.value = "";
    }

    #focusInput(delay = 100) {
      setTimeout(() => this.#input.focus(), delay);
    }
  }

  function getPanels() {
    return document.querySelector(".webpanel-stack");
  }

  function getPanel(panels) {
    return panels.children[WEBPANEL_NUMBER];
  }

  function initMod() {
    const panels = getPanels();
    if (panels) {
      const panel = getPanel(panels);
      window.uwp = new UWP(panel);
    } else {
      setTimeout(initMod, 500);
    }
  }

  setTimeout(initMod, 500);
})();

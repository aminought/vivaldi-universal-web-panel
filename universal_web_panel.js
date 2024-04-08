(function universal_web_panel() {
  "use strict";

  const PANEL_ID = "WEBPANEL_uwp00000-0000-0000-0000-000000000000";
  const TITLE = "Universal Web Panel";

  const USE_DEFAULT_ICON = false;
  const FAVORITES = []; // [{caption: "Vivaldi", url: "https://vivaldi.net"}, ...]

  const ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="padding: 4px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  const ICON_HTML = `<span class="button-icon">${ICON_SVG}</span>`;
  const ICON_DATA_URL = `data:image/svg+xml, ${ICON_SVG}`;

  const HTML = '<title>Universal Web Panel</title>';

  const STYLE = `
    button[name="${PANEL_ID}"] img {
      display:none;
    }

    button[name="${PANEL_ID}"]:before {
      width: 16px;
      height: 16px;
      content: "";
      background-color: var(--colorFg);
      -webkit-mask-box-image: url('${JSON.stringify(ICON_DATA_URL)}');
    }

    .color-behind-tabs-off .toolbar-mainbar button[name="${PANEL_ID}"]:before {
      background-color: var(--colorAccentFg);
    }

    .button-toolbar:active button[name="${PANEL_ID}"]:before {
      transform: scale(0.9);
    }
  `;

  const TOOLBAR_HEIGHT = "28px";
  const INPUT_BORDER_RADIUS = "10px";

  const TOOLBARS = [
    'vivaldi.toolbars.panel',
    'vivaldi.toolbars.navigation',
    'vivaldi.toolbars.status',
    'vivaldi.toolbars.mail',
    'vivaldi.toolbars.mail_message',
    'vivaldi.toolbars.mail_composer'
  ];

  class Preferences {
    async get(path) {
      return await vivaldi.prefs.get(path);
    }

    async set({path, value}) {
      await vivaldi.prefs.set({path, value});
    }

    async getWebpanels() {
      return await vivaldi.prefs.get('vivaldi.panels.web.elements');
    }

    async setWebpanels(webpanels) {
      await vivaldi.prefs.set({path: 'vivaldi.panels.web.elements', value: webpanels});
    }

    async getPanelToolbar() {
      return await vivaldi.prefs.get('vivaldi.toolbars.panel');
    }

    async setPanelToolbar(toolbar) {
      await vivaldi.prefs.set({path: 'vivaldi.toolbars.panel', value: toolbar});
    }

    async addOnWebpanelsChangedListner(cb) {
      vivaldi.prefs.onChanged.addListener(async event => {
        if (event.path === 'vivaldi.panels.web.elements') {
          await cb();
        }
      });
    }
  };

  class UWP {
    prefs = new Preferences();
    #observers = [];

    constructor() {
      // this.#addStyle();
      this.#createWebPanel().then(() => {
        if (this.#panel) {
          this.#observers.push(this.#createPanelChangeObserver());
          this.#register();
        } else {
          this.#observers.push(this.#createPanelStackChangeObserver());
        }
      });
    }

    #register() {
      this.#isVisible ? this.#registerVisible() : this.#registerInvisible();
    }

    #registerVisible() {
      if (!this.#input) {
        this.#createUwpToolbar();
        this.#addInputEvents();
        this.#addWebviewEvents();
        this.#addFavoritesSelectEvents();
      }
      this.#focusInput();
      if (this.#isBlank) {
        this.#title = TITLE;
        this.#buttonImg = ICON_DATA_URL;
      } else if (USE_DEFAULT_ICON) {
        this.#buttonImg = ICON_DATA_URL;
      }
    }

    #registerInvisible() {
      this.#buttonImg =
        this.#isBlank || USE_DEFAULT_ICON ? ICON_DATA_URL : this.#webview.src;
    }

    // listeners

    #createPanelStackChangeObserver() {
      const panelStackChangeObserver = new MutationObserver((records) => {
        records.forEach(() => this.#handlePanelStackChange());
      });
      panelStackChangeObserver.observe(this.#panelStack, { childList: true });
      return panelStackChangeObserver;
    }

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

    #addInputEvents() {
      this.#input.addEventListener("input", () =>
        this.#handleInput(this.#input.value.trim()),
      );
    }

    #addFavoritesSelectEvents() {
      if (this.#isfavoritesEnabled) {
        this.#favoritesSelect.addEventListener("input", () => {
          this.#handleInput(this.#favoritesSelect.value.trim());
          this.#resetFavoritesSelect();
        });
      }
    }

    #addWebviewEvents() {
      this.#webview.addEventListener("contentload", () => {
        this.#showWebview();
        if (this.#isBlank) {
          this.#title = TITLE;
          this.#buttonImg = ICON_DATA_URL;
        } else if (USE_DEFAULT_ICON) {
          this.#buttonImg = ICON_DATA_URL;
        } else {
          this.#buttonImg = this.#webview.src;
        }
      });
    }

    // builders

    #createStyle() {
        const style = document.createElement('style');
        style.innerHTML = STYLE;
        return style;
    }

    async #createWebPanel() {
      const toolbarElements = document.querySelectorAll('.toolbar');
      for (toolbar of toolbarElements) {
        const observer = new MutationObserver(() => {
            const button = toolbar.querySelector(`button[name="${PANEL_ID}"]`);
            if (button) button.innerHTML = ICON_HTML;
        });
        observer.observe(toolbar, {childList: true});
        this.#observers.push(observer);
      }

      const browser = document.querySelector('#browser');
      const browserObserver = new MutationObserver(() => {
          const button = document.querySelector(`.toolbar-editor button[name="${PANEL_ID}"]`);
          if (button) button.innerHTML = ICON_HTML;
      });
      browserObserver.observe(browser, {childList: true});
      this.#observers.push(browserObserver);

      const webpanels = await this.prefs.getWebpanels()
      var webpanel = webpanels.find((p) => p.id == PANEL_ID);
      if (!webpanel) {
        webpanel = {
          activeUrl: 'data:text/html,' + encodeURIComponent(HTML),
          faviconUrl: ICON_DATA_URL,
          faviconUrlValid: true,
          id: PANEL_ID,
          mobileMode: true,
          origin: 'user',
          resizable: false,
          title: TITLE,
          url: 'vivaldi://universal-web-panel',
          width: -1,
          zoom: 1
        }
        webpanels.push(webpanel);
        await this.prefs.setWebpanels(webpanels);
      }
      
      const toolbars = await Promise.all(TOOLBARS.map(path => this.prefs.get(path)));
      const hasUwp = toolbars.some(toolbar => toolbar.some(id => id === PANEL_ID));

      if (!hasUwp) {
        const panelToolbar = toolbars[0];
        const panelIndex = panelToolbar.findIndex(panel => panel.startsWith('WEBPANEL_'));
        panelToolbar.splice(panelIndex, 0, PANEL_ID);
        await this.prefs.setPanelToolbar(panelToolbar);
      }

      const button = document.querySelector(`button[name="${PANEL_ID}"]`);
      if (button) button.innerHTML = ICON_HTML;
    }

    async reset() {
      var webpanels = await this.prefs.getWebpanels();
      var webpanel = webpanels.find((p) => p.id == PANEL_ID);
      if (webpanel) {
        webpanels = webpanels.filter(w => w.id !== PANEL_ID);
        await this.prefs.setWebpanels(webpanels);
      }

      for (const path of TOOLBARS) {
        var toolbar = await this.prefs.get(path);
        if (toolbar.includes(PANEL_ID)) {
          toolbar = toolbar.filter(id => id !== PANEL_ID);
          await this.prefs.set({path: path, value: toolbar});
        }
      }
    }

    #createUwpToolbar() {
      const uwpToolbar = this.#createEmptyUwpToolbar();
      const input = this.#createInput();
      uwpToolbar.appendChild(input);

      if (this.#isfavoritesEnabled) {
        const favoritesSelect = this.#createFavoritesSelect();
        uwpToolbar.appendChild(favoritesSelect);
      }

      this.#panel.appendChild(uwpToolbar);
    }

    #createEmptyUwpToolbar() {
      const uwpToolbar = document.createElement("div");
      uwpToolbar.className = "uwp-toolbar toolbar-default full-width";
      uwpToolbar.width = "100%";
      uwpToolbar.style.height = TOOLBAR_HEIGHT;
      uwpToolbar.style.width = "100%";
      uwpToolbar.style.marginTop = "2px";
      uwpToolbar.style.display = "flex";
      uwpToolbar.style.gap = "2px";
      return uwpToolbar;
    }

    #createInput() {
      const input = document.createElement("input");
      input.className = "uwp-input";
      input.type = "text";
      input.placeholder = "Paste your link, html or javascript";
      input.style.flex = 3;
      input.style.height = TOOLBAR_HEIGHT;
      input.style.padding = "10px";
      input.style.borderRadius = INPUT_BORDER_RADIUS;
      input.style.outline = 'none';
      input.style.borderWidth = '0px';
      return input;
    }

    #createFavoritesSelect() {
      const favoritesSelect = document.createElement("select");
      favoritesSelect.className = "uwp-favorites-select";
      favoritesSelect.style.width = "25px";
      favoritesSelect.style.padding = "5px";
      favoritesSelect.style.backgroundColor = "transparent";
      favoritesSelect.style.backgroundImage = "none";
      favoritesSelect.style.borderWidth = "0px";
      favoritesSelect.style.outline = "none";

      // Create a default option
      const defaultOption = document.createElement("option");
      defaultOption.textContent = "🤍";
      defaultOption.selected = true;
      defaultOption.disabled = true;
      defaultOption.style.backgroundColor = "var(--colorBg)";
      defaultOption.setAttribute("value", 0);
      favoritesSelect.appendChild(defaultOption);

      FAVORITES.forEach((favorite) => {
        const option = document.createElement("option");
        option.value = favorite.url;
        option.textContent = favorite.caption;
        option.style.backgroundColor = "var(--colorBg)";
        favoritesSelect.appendChild(option);
      });

      return favoritesSelect;
    }

    #createHtmlview() {
      const htmlview = document.createElement("div");
      htmlview.id = "htmlview";
      htmlview.style.height = "100%";
      htmlview.style.overflow = "auto";
      return htmlview;
    }

    // getters

    get #head() {
      return document.querySelector("head");
    }

    get #panelStack() {
      return document.querySelector(".webpanel-stack");
    }

    get #panel() {
      const selector = `webview[tab_id^="${PANEL_ID}"], webview[vivaldi_view_type^="${PANEL_ID}"`;
      return document.querySelector(selector)?.parentElement?.parentElement;
    }

    get #button() {
      return document.querySelector(`button[name="${PANEL_ID}"]`);
    }

    get #content() {
      return this.#panel.querySelector(".webpanel-content");
    }

    get #title() {
      return this.#panel.querySelector(".webpanel-title").querySelector("span");
    }

    get #htmlview() {
      return this.#panel.querySelector("#htmlview");
    }

    get #webview() {
      return this.#panel.querySelector("webview");
    }

    get #input() {
      return this.#panel.querySelector(".uwp-input");
    }

    get #favoritesSelect() {
      return this.#panel.querySelector(".uwp-favorites-select");
    }

    get #buttonImg() {
      return this.#button.querySelector("img");
    }

    get #isVisible() {
      return this.#panel.classList.contains("visible");
    }

    get #isBlank() {
      return this.#webview.src === "about:blank";
    }

    get #isfavoritesEnabled() {
      return FAVORITES && FAVORITES.length;
    }

    // setters

    set #title(title) {
      setTimeout(() => (this.#title.innerText = title), 100);
    }

    set #buttonImg(url) {
      this.#buttonImg.removeAttribute("srcset");
      const src =
        url && (url.startsWith("http://") || url.startsWith("https://"))
          ? `chrome://favicon/size/16@1x/${url}`
          : url;
      this.#buttonImg.setAttribute("src", src);
    }

    // handlers

    #handleInput(value) {
      if (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("file://") ||
        value.startsWith("vivaldi://") ||
        value === "about:blank"
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
      this.#title = TITLE;
      this.#buttonImg = ICON_DATA_URL;
    }

    #handlePanelStackChange() {
      if (this.#panel) {
        this.#observers.push(this.#createPanelChangeObserver());
        this.#register();
      }
    }

    #handlePanelChange() {
      if (this.#isVisible) {
        this.#registerVisible();
      }
    }

    // actions

    #addStyle() {
        this.#head.appendChild(this.#createStyle());
    }

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

    #focusInput() {
      setTimeout(() => this.#input.focus(), 100);
    }

    #resetFavoritesSelect() {
      this.#favoritesSelect.value = 0;
    }
  }

  var interval = setInterval(() => {
      if (document.querySelector('#browser')) {
        window.uwp = new UWP();
        clearInterval(interval);
      }
  }, 100);
})();

function fixLink(link, domain) {
    if (link) {
        if (link.startsWith('//')) {
            return 'https:' + link;
        } else if (!link.startsWith('http')) {
            return 'https://' + domain + link;
        }
    }
    return link;
}

function fixSrcSet(srcset, domain) {
    if (srcset) {
        var results = [];
        srcset.split(', ').forEach(src => {
            results.push(fixLink(src, domain));
        });
        return results.join(', ');
    }
    return srcset;
}

function fixLinks(content, attribute, domain) {
    elements = content.querySelectorAll('[' + attribute + ']')
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i].getAttribute(attribute);
        if (attribute == 'srcset') {
            elements[i].setAttribute(attribute, fixSrcSet(e, domain));
            continue;
        }
        elements[i].setAttribute(attribute, fixLink(e, domain))
    }
}

function runTweaks(root, domain) {
    console.log('running tweaks...');
    console.log('running custom tweaks...');
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
    console.log('custom tweaks executed')

    fixLinks(root, 'src', domain);
    fixLinks(root, 'href', domain);
    fixLinks(root, 'srcset', domain);
    console.log('tweaks executed');
}

function getContentTitle(content) {
    title = content.getElementsByTagName('title')[0];
    if (!title) return 'Universal Web Panel';
    return title.innerText;
}

function extractDomain(url) {
    return url.match(/([\w-]+\.)+([\w-]+)/)[0];
}

function openUrl(url, root) {
    console.log(`loading page ${url}...`);
    fetch('https://cors-anywhere.herokuapp.com/' + url).then(response => {
        return response.text();
    }).then(data => {
        const domain = extractDomain(url);
        root.innerHTML = data;
        runTweaks(root, domain);
        console.log(`page ${url} loaded`);
    });
}

function showHtml(input, root) {
    console.log('rendering html...');
    root.innerHTML = input;
    document.title = getContentTitle(root);
    console.log('html rendered');
}

function showHTMLWithUrl(input, root) {
    console.log('rendering html with url...');
    const json = JSON.parse(input);
    const url = json['url'];
    const html = json['html'];
    const domain = extractDomain(url);

    document.documentElement.innerHTML = html;
    runTweaks(root, domain);
    console.log('html with url rendered');
}

function handleInput(input) {
    console.log('handling input...');
    var root = document.documentElement;

    if (input.startsWith('http://') || input.startsWith('https://')) {
        openUrl(input, root);
    } else if (input.startsWith('{')) {
        showHTMLWithUrl(input, root);
    } else {
        showHtml(input, root);
    }

    setTimeout(() => insertInput(), 2000);
    setTimeout(() => document.title = getContentTitle(root), 2000);
    console.log('input handled');
}

function execute() {
    console.log('executing...');
    const key = 'uwpContent';
    const input = localStorage.getItem(key);

    if (input) {
        handleInput(input);
        localStorage.removeItem(key);
    } else {
        var inputField = document.getElementById('input');
        if (!inputField) {
            insertInput();
        } else if (inputField && inputField.value) {
            localStorage.setItem(key, inputField.value);
            location.reload();
        }
    }
    console.log('executed');
}

function addEventListeners(inputField) {
    console.log('adding event listeners...');
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            inputField.focus();
        }
    });
    console.log('event listeners added');
}

function insertInput() {
    console.log('inserting input field...');
    inputHtml = `
        <input type="text" id="input" placeholder="Paste your link or html"
        autofocus oninput="execute()" style="width: 100%; padding: 12px 20px;
        margin: 8px 0; display: inline-block; border: 1px solid #ccc;
        border-radius: 4px; box-sizing: border-box; position: fixed;
        top: 0; left: 0; z-index: 999999;"><br>
    `
    document.body.insertAdjacentHTML('afterbegin', inputHtml);
    var inputField = document.getElementById('input');
    inputField.focus();
    addEventListeners(inputField);
    console.log('input field inserted');
}

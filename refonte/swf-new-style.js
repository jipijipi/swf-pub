function loadExternalCSS(filePath) {
    const body = document.body;
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = filePath;

    body.appendChild(link);
}

function appendToHead(elementType, attributes) {
    // Create the new element
    var element = document.createElement(elementType);

    // Add any passed attributes to the element
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    // Append the element to the head of the document
    document.head.appendChild(element);
}




function delayFunction(fn, delay) {
    setTimeout(fn, delay);
}


function triggerOnCertainURLs(allowedURLs, callback, partialMatch = false) {


    const urlMatch = partialMatch
        ? allowedURLs.some(allowedUrl => window.location.href.includes(allowedUrl))
        : allowedURLs.includes(window.location.href);

    if (urlMatch) {
        // Call the provided function if there's a match
        callback();
    } else {
        console.log('URL does not match. Callback not triggered.');
    }

}



function replaceImageByQuerySelector(selector, src) {
    var imgElements = document.querySelectorAll(selector);

    if (imgElements.length === 0) {
        console.warn(`No images found for selector: ${selector}`);
        return;
    }

    imgElements.forEach(function (imgElement) {
        imgElement.src = src;
        imgElement.srcset = src;
    });
}



function resizeImage(selector, newWidth = 300, newHeight = 300) {
    var img = document.querySelector(selector);
    if (img) {
        img.width = newWidth;
        img.height = newHeight;
    } else {
        console.warn(`No image found for selector: ${selector}`);
    }
}

function replaceAndResizeImage(selector, src, width, height) {
    replaceImageByQuerySelector(selector, src);
    resizeImage(selector, width, height);
}

function removeClassFromDivByPath(path, className) {
    let elements = document.querySelectorAll(path);

    elements.forEach((element) => {
        element.classList.remove(className);
    });
}


function addClassToSelector(selector, className) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
        element.classList.add(className);
    });
}


function insertHTML(selector, html, position = 'afterbegin', checkById = true) {
    let elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
        console.warn('No elements found for the provided selector.');
        return;
    }

    let shouldInsert = true;

    if (checkById) {
        // Extract id from the provided HTML string
        const idMatch = html.match(/id="([^"]+)"/);
        if (idMatch && idMatch[1]) {
            const id = idMatch[1];
            const existingElement = document.getElementById(id);
            if (existingElement) {
                shouldInsert = false;  // Don't insert if element with this ID already exists
            }
        }
    }

    elements.forEach(element => {
        if (shouldInsert) {
            element.insertAdjacentHTML(position, html);
        }

        console.log(`${selector} found ${elements.length} times`);
    });
}


function removeElementsBySelector(selector) {
    var elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
        console.warn(`No elements found for selector: ${selector}`);
        return;
    }

    for (var i = 0; i < elements.length; i++) {
        elements[i].parentNode.removeChild(elements[i]);
        console.info(`Element ${elements[i]} removed`);

    }
}

function moveElement(sourceSelector, destinationSelector, appendToEnd = true) {
    const sourceElement = document.querySelector(sourceSelector);
    const destinationElement = document.querySelector(destinationSelector);

    if (!sourceElement || !destinationElement) {
        console.warn("Source or destination element not found.");
        return;
    }

    if (appendToEnd) {
        destinationElement.appendChild(sourceElement);
        console.warn("Element moved");

    } else {
        destinationElement.insertBefore(sourceElement, destinationElement.firstChild);
        console.warn("Element moved");
    }
}

//GLOBAL

//remove stylesheet
removeElementsBySelector('link[href*="sowefund.min.css"]');
//remove social list side
removeElementsBySelector('body > ul.fixed-panel-layout.list-unstyled.print-hidden');


//NAVBAR

//change main logo
replaceImageByQuerySelector('img[alt~="logo"]', 'https://storage.googleapis.com/swf-bucket/files/swf-new-logo-v1.png');

//removes main link navbar
removeClassFromDivByPath('.mainLink', 'mainLink');



//FICHES

//fiches startups

replaceImageByQuerySelector('.macaron-last-days', 'https://storage.googleapis.com/swf-bucket/files/last-days-macaron-anim-8.svg')



//HOME

function homeChanges() {
    //images home

    replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(3) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-impact-investing@2x.png?v=2');

    replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(4) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-defiscaliser-utile@2x.png');

    replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(5) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-investir-librement@2x.png');

    replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(6) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-entreprises-qualite@2x.png');

    replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(7) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-conseiller-agree@2x.png');

    //Remove elements
    removeElementsBySelector('.container > .row-layout > h1.text-center');
    removeElementsBySelector('#carousel-home');
    removeElementsBySelector('#mobile-content-video');
    removeElementsBySelector('.box-block');

    //Header home
    // insertHTML('#content-page', '<div class="row full-viewport" id="track-record" height = 150px><div class="portrait"></div><div class="portrait"></div></div>');
    insertHTML('#content-page', '<div class="row " id="cta-home"><div class="text-center row"><a href="/startups" class="btn btn-primary btn-xl upper">Investir dès maintenant</a><br></div></div>');
    insertHTML('#content-page', '<div id="hero-container"><div id="hero"><h1 class="font-xxxl" ><span class="highlight">Investir</span> dans les <br>entreprises de demain</h1><p class = "font-md">Devenez actionnaire des startups les plus innovantes <br>aux côtés des professionnels de l’investissement. </p></div></div>');
    insertHTML('.bg-info:nth-of-type(2)', `<div class="row box-block"><h2 class="upper col-md-offset-1">Ils Aiment Sowefund</h2><br><div class="row"><div class="col-md-6 testimonial"><img class="lazyload" src="https://d3i3cp443mmogz.cloudfront.net/public/entrepreneur/logo-extracadabra.svg" alt="Logo Extracadabra" width="200px"><blockquote>" Cette levée de fonds a permis à Extracadabra de bénéficier de la forte communauté d'investisseurs engagés de Sowefund tout en permettant à nos clients restaurateurs de prendre part à cette belle aventure. Nous avons réuni plus de 400K€ en moins de 2 mois, en co-investissement avec les fonds Side Capital et Bpifrance via son fonds tourisme. Un succès rapide et efficace ! "<br><br><footer>Frederic Nardon, Extracadabra</footer></blockquote></div><div class="col-md-6 testimonial"><img class="lazyload" src="https://d3i3cp443mmogz.cloudfront.net/public/entrepreneur/logo-ekwateur.svg" alt="Logo Ekwateur" width="200px"><blockquote>" L’opération faite avec Sowefund était pour nous une évidence dans l’esprit collaboratif d’ekWateur. Ce que nous n’avions pas anticipé par contre, c’est l’engouement que cette campagne allait créer. On a plus que doublé l’objectif, avec 1,12 M€ levés alors qu’on tablait sur 0,5M€ ! "<br><br><footer>Julien Tchernia, Ekwateur</footer></blockquote></div></div></div>`);


}

triggerOnCertainURLs(['https://sowefund.com/'], homeChanges, false);



//PROJETS

function projectChanges() {

    removeElementsBySelector('.onglet');
    addClassToSelector('h1', '.arrow-frame-diagonal-bottom');

}

triggerOnCertainURLs(['https://sowefund.com/projet'], projectChanges, true);


//QSN

function QsnChanges() {
    moveElement('#content-page > section', '#content-page', false)
}

triggerOnCertainURLs(['https://sowefund.com/qui-sommes-nous'], QsnChanges, true);


//favicons
appendToHead('link', { 'rel': 'manifest', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/manifest.webmanifest' });
appendToHead('link', { 'rel': 'icon', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/favicon.ico', 'sizes': '32x32' });
appendToHead('link', { 'rel': 'icon', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/icon.svg', 'type': 'image/svg+xml' });
appendToHead('link', { 'rel': 'apple-touch-icon', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/apple-touch-icon.png' });


//load the css
loadExternalCSS('https://jipijipi.github.io/swf-pub/refonte/swf-new-style.css');



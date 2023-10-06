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

function insertHTML(selector, html, position = 'afterbegin') {
    let elements = document.querySelectorAll(selector);

    if (elements.length === 0) {
        console.warn('No elements found for the provided selector.');
        return;
    }

    elements.forEach(element => {
        element.insertAdjacentHTML(position, html);
        console.log(`${selector} found ${elements.length} times`)
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
    }
}

//GLOBAL

//remove stylesheet
removeElementsBySelector('link[href="https://d10ib5h62k7mu8.cloudfront.net/assets/css/7f00b3a26d0c1e22fd7c20785de84702-sowefund.min.css"]');
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

    //Header home
    // insertHTML('#content-page', '<div class="row full-viewport" id="track-record" height = 150px><div class="portrait"></div><div class="portrait"></div></div>');
    insertHTML('#content-page', '<div class="row " id="cta-home"><div class="text-center row"><a href="/startups" class="btn btn-primary btn-xl upper">Investir dès maintenant</a><br></div></div>');
    insertHTML('#content-page', '<div id="hero-container"><div id="hero"><h1 class="font-xxxl" ><span class="highlight">Investir</span> dans les <br>entreprises de demain</h1><p class = "font-md">Devenez actionnaire des startups les plus innovantes <br>aux côtés des professionnels de l’investissement. </p></div></div>');



}

triggerOnCertainURLs(['https://sowefund.com/'], homeChanges, false);



//PROJETS

function projectChanges() {

    removeElementsBySelector('.onglet');

}

triggerOnCertainURLs(['https://sowefund.com/projet'], projectChanges, true);


//favicons
appendToHead('link', { 'rel': 'manifest', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/manifest.webmanifest' });
appendToHead('link', { 'rel': 'icon', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/favicon.ico', 'sizes': '32x32' });
appendToHead('link', { 'rel': 'icon', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/icon.svg', 'type': 'image/svg+xml' });
appendToHead('link', { 'rel': 'apple-touch-icon', 'href': 'https://storage.googleapis.com/swf-bucket/favicon/apple-touch-icon.png' });


//load the css
loadExternalCSS('https://jipijipi.github.io/swf-pub/refonte/swf-new-style.css');

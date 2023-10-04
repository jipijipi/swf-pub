function loadExternalCSS(filePath) {
    const body = document.body;
    const link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = filePath;

    body.appendChild(link);
}


function delayFunction(fn, delay) {
    setTimeout(fn, delay);
}


function replaceImageByQuerySelector(selector, src) {
    var imgElement = document.querySelector(selector);

    if (img) {
        imgElement.src = src;
        imgElement.srcset = src;
    } else {
        console.warn(`No image found for selector: ${selector}`);
    }


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
    });
}



//change main logo
replaceImageByQuerySelector('img[alt~="logo"]', 'https://storage.googleapis.com/swf-bucket/files/swf-new-logo-v1.png');

//images home

replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(3) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-impact-investing@2x.png?v=2');

replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(4) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-defiscaliser-utile@2x.png');

replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(5) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-investir-librement@2x.png');

replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(6) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-entreprises-qualite@2x.png');

replaceAndResizeImage('#content-page > section:nth-child(1) > div > div:nth-child(7) > div > img', 'https://storage.googleapis.com/swf-bucket/home/sowefund-conseiller-agree@2x.png');

//Header home
insertHTML('#content-page', '<div id="hero-container"><div id="hero"><h1 class="font-xxxl" ><span class="highlight">Investir</span> dans les <br>entreprises de demain</h1><p class = "font-m">Avec Sowefund, investissez et défiscalisez librement <br>dans les startups européennes les plus prometteuses </p></div></div>');

//fiche startups

//delayFunction(replaceImageByQuerySelector('.macaron-last-days','https://storage.googleapis.com/swf-bucket/files/last-days-macaron-anim-8.svg'), 5000)



//removes main link navbar
removeClassFromDivByPath('.mainLink', 'mainLink');

//load the css
loadExternalCSS('https://jipijipi.github.io/swf-pub/refonte/swf-new-style.css');
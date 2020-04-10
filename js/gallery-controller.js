'use strict'


function renderGallery() {
    var imgs = getImgs()
    var imgsHTMLs = imgs.map(getImgsHTMLs)

    var elGallery = document.querySelector('.gallery');
    elGallery.innerHTML = imgsHTMLs.join('')
}
/**Helpers Gallery render function */
function getImgsHTMLs(img, idx) {
    return `
    <div class="img-gallery-box">
        <img src="${img.url}" alt="img-gallery" onclick="onImgGallery(${idx})"/>
    </div>`
}

/**  Image-gallery handler */
function onImgGallery(imgIdx) {
    createMeme(imgIdx)
    unDisableBtn(".btn-gallery")
    disableBtn('.btn-memes')
    changeScreen()
    renderCanvas()
    renderLinesDOM()
}

'use strict'


function renderGallery(imgs = getImgs()) {
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
    createImgObj(imgIdx)
    setCanvasSizeByImg(getImgMeme())
    createMeme(imgIdx)
    unDisableBtn(".btn-gallery")
    disableBtn('.btn-memes')
    changeScreen()
    renderCanvas()
    renderLine()
}

function onSearchInput(input) {
    if (!input) renderGallery()
    var imgsForRender = getImgsToRenderByKeyword(input)
    renderGallery(imgsForRender)
}


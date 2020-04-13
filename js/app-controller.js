'use strict'

/* CANVAS */
var gCanvas;
var gCtx;
var gIsDownload

const GALLERY = '.container-gallery'
const CREATOR = '.meme-creator'
const MEMES = '.memes'

const BTN_GALLERY = '.btn-gallery'
const BTN_CREATOR = '.btn-creator'
const BTN_MEMES = '.btn-memes'

function init() {
    InitializeCanvas()
    renderGallery()
    gIsDownload = false
    var meme = getMeme()
    if (meme) {
        unDisableBtn('.btn-creator')
    }
}


/***  Canvas functions ***/
/** */
function InitializeCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    setCanvasSize(700, 700)

}
function setCanvasSize(width, height) {
    gCtx.canvas.width = width;
    gCtx.canvas.height = height;
}
/**Canvas render */
function renderCanvas() {
    var meme = getMeme()
    var imgObj = getImgMeme()

    gCtx.drawImage(imgObj, 0, 0, gCanvas.width, gCanvas.height)
    if (!gIsDownload) renderLineMarker()
    meme.lines.forEach(renderLineCanvas)
}

/**Helpers for 'renderCanvas()' function */
function renderLineCanvas(line) {
    // Render canvas 
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.lineWidth = 4
    gCtx.strokeStyle = line.stroke
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    gCtx.fillStyle = line.color;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
}
function renderLineMarker() {
    var line = getLineClicked()
    if (!line) return
    gCtx.fillStyle = 'rgba(220, 220, 220, 0.6)';
    gCtx.fillRect(0, line.pos.y - line.size + 2, gCanvas.width, line.size + 10);
}


function renderLine() {
    var line = getLineClicked()
    var lineIdx = getLineClickedIdx()

    var lineHTML = line ? getHTMLLineDOM(line, lineIdx) : `Click '+' button to add text`;
    document.querySelector('.line').innerHTML = lineHTML
}

/** Render DOM - line */
function renderLinesDOM() {
    var lines = getLines()
    var strHTMLs = lines.map(getHTMLLineDOM)
    document.querySelector('.line').innerHTML = strHTMLs.join('');
}
/** helpers for on renderLinesDOM**/
function getHTMLLineDOM(line, idx) {
    return ` 
    <div class="panel-row line-${idx}">
        <textarea  class="txt-line" onclick="onLine(${idx})" 
            oninput="onLineProperty('txt', this.value)">${line.txt}</textarea>
        <button class="btn-delete-line btn-panel icon-background" onclick="onDeleteLine(${idx})"></button>
    </div>`
}


/* header handles */
function onCreator() {
    changeScreen(CREATOR)
    disableBtn(BTN_CREATOR)
    unDisableBtn(BTN_GALLERY)
    unDisableBtn(BTN_MEMES)

    createImgObj(getMeme().selectedLineIdx)
    setCanvasSizeByImg(getImgMeme())
    renderCanvas()
    renderLine()
}
function onGallery() {
    changeScreen(GALLERY)
    disableBtn(BTN_GALLERY)
    if (getMeme()) unDisableBtn(BTN_CREATOR)
    unDisableBtn(BTN_MEMES)
}
function onMemes() {
    var memes = getMemes()
    renderMemes(memes)
    disableBtn(BTN_MEMES)
    if (getMeme()) unDisableBtn(BTN_CREATOR)
    unDisableBtn(BTN_GALLERY)
    changeScreen(MEMES)
}

function renderMemes(memes) {
    var elGalleryMemes = document.querySelector('.memes-gallery')
    elGalleryMemes.innerHTML = (memes.length) ? memes.map(getMemesHTMLs).join('') : 'You don\'t have any saved memes yet'
}
function getMemesHTMLs(memeObj, idx) {
    var img = memeObj.img
    return `
        <div class="meme-gallery-box">
            <img class="img-meme" src="${img}" onclick="onMemeBox(${idx})" />
            <button class="btn-meme-delete" onclick="onDeleteMeme()"></button>
        </div>
    `
}
function onMemeBox(idx) {
    var memes = loadMemesFromStorage()
    var meme = memes[idx].gMeme
    setMeme(meme)
    createImgObj(meme.selectedImgId)
    setCanvasSizeByImg(getImgMeme())
    setLineClicked(0)
    renderCanvas()
    unDisableBtn(BTN_MEMES)
    changeScreen(CREATOR)
}


function changeScreen(screenShow) {
    var screens = [GALLERY, CREATOR, MEMES]
    screens.forEach(screen => {
        if (screen === screenShow) {
            document.querySelector(screen).classList.remove('hidden')
        } else {
            document.querySelector(screen).classList.add('hidden')
        }
    })
}
function disableBtn(selector) {
    document.querySelector(selector).disabled = true
}
function unDisableBtn(selector) {
    document.querySelector(selector).disabled = false
}


function onLine(idxLine) {
    setLineClicked(idxLine)
    renderCanvas()
}
function onAddLine() {
    addLine()
    setLineClicked(getLines().length - 1)
    renderLine()
    renderCanvas()
    document.querySelector('.line textarea').focus();
}
function onDeleteLine(idxLine) {
    deleteLine(idxLine)
    renderLine()
    renderCanvas()
}
function onChange() {
    if (!getLineClicked()) return

    changeLineClicked()
    var idxLine = getLineClickedIdx()
    var elLine = document.querySelector(`.line-${idxLine}`);
    renderLine()
    renderCanvas()
}

function onPropertyTouch(keyProp, value, ev) {
    ev.preventDefault()
    onLineProperty(keyProp, value)
}
function onLineProperty(keyProp, value) {
    if (!getLineClicked()) return

    changeLineProperty(keyProp, value)
    renderCanvas()
}
function onStrokePickerColor(picker) {
    onLineProperty('stroke', '#' + picker)
}
function onPickerColor(picker) {
    onLineProperty('color', '#' + picker)
}

function getCanvasSize() {
    return {
        width: gCanvas.width,
        height: gCanvas.height
    }
}


function onSave(el) {
    gIsDownload = true
    renderCanvas()
    save(el)
    gIsDownload = false
    renderCanvas()
}

function onSelectImg(ev) {
    loadImageFromInput(ev, loadSelectedImg)
}
function loadSelectedImg(img) {
    setImgMeme(img)
    createMeme(-1)
    setCanvasSizeByImg(img)
    unDisableBtn(BTN_GALLERY)
    disableBtn(BTN_CREATOR)
    changeScreen(CREATOR)
    renderCanvas()
    renderLine()
}
function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function showMenu() {
    document.body.classList.toggle('show-menu');
}


function onDownload(elLink) {
    gIsDownload = true
    renderCanvas()
    downloadMeme(elLink)
    gIsDownload = false
    renderCanvas()
}

function onFacebookShare() {

}

'use strict'

/* CANVAS */
var gCanvas;
var gCtx;
var gIsDownload



function init() {
    InitializeCanvas()
    renderGallery()
    gIsDownload = false
    var meme = getMeme()
    if (meme) {
        unDisableBtn('.btn-memes')
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
    console.log(imgObj);

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
function onMemes() {
    changeScreen()
    disableBtn('.btn-memes')
    unDisableBtn('.btn-gallery')
    createImgObj(getMeme().selectedLineIdx)
    setCanvasSizeByImg(getImgMeme())
    renderCanvas()
    renderLine()
}
function onGallery() {
    changeScreen()
    disableBtn('.btn-gallery')
    unDisableBtn('.btn-memes')
}


function changeScreen() {
    document.querySelector('.container-gallery').classList.toggle('hidden')
    document.querySelector('.meme-creator').classList.toggle('hidden')
}
function disableBtn(selector) {
    document.querySelector(selector).disabled = true
}
function unDisableBtn(selector) {
    document.querySelector(selector).disabled = false
}


/** line meme handles */
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

function getCanvasSize() {
    return {
        width: gCanvas.width,
        height: gCanvas.height
    }
}


function onStrokePickerColor(picker) {
    console.log(picker);
    onLineProperty('stroke', '#' + picker)
}
function onPickerColor(picker) {
    onLineProperty('color', '#' + picker)
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

function onSave() {
    save()
}
function showMenu() {
    document.body.classList.toggle('show-menu');
}


function onSelectImg(ev) {
    loadImageFromInput(ev, loadSelectedImg)
}
function loadSelectedImg(img) {
    setImgMeme(img)
    createMeme(-1)
    setCanvasSizeByImg(img)
    unDisableBtn(".btn-gallery")
    disableBtn('.btn-memes')
    changeScreen()
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

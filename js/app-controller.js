'use strict'

/* CANVAS */
var gCanvas;
var gCtx;



function init() {
    console.log('Appd woring');

    InitializeCanvas()
    renderGallery()
}


/***  Canvas functions ***/
/** */
function InitializeCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')

    gCtx.canvas.width = 500;
    gCtx.canvas.height = 500;
}
/**Canvas render */
function renderCanvas() {
    var meme = getMeme()
    var imgMeme = getItemByIdx(meme.selectedLineIdx, getImgs())

    var imgObj = new Image()
    imgObj.src = imgMeme.url

    imgObj.onload = () => {
        gCtx.drawImage(imgObj, 0, 0, gCanvas.width, gCanvas.height)
        renderLineMarker()
        gMeme.lines.forEach(renderLineCanvas)
    }

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

/** Render DOM - lines */
function renderLinesDOM() {
    var lines = getLines()
    var strHTMLs = lines.map(getHTMLLineDOM)
    document.querySelector('.lines').innerHTML = strHTMLs.join('');
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
    renderLinesDOM()
    renderCanvas()
}
function onDeleteLine(idxLine) {
    deleteLine(idxLine)
    renderLinesDOM()
    renderCanvas()
}
function onChange() {
    if (!getLineClicked()) return

    changeLineClicked()
    var idxLine = getLineClickedIdx()
    var elLine = document.querySelector(`.line-${idxLine}`);
    elLine.querySelector('textarea').focus()
    renderCanvas()
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

function showMenu() {
    document.body.classList.toggle('show-menu');
}

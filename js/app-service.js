'use strict'

const keyMeme = 'meme'
const keyImgMeme = 'imgMeme'
const keyImgSrc = 'imgSrc'
/* line-text meme*/
var gLineClicked;//The last line clicked
var gLineClickedIdx;

/* MODAL */
var gMeme = loadMemeFromStorage();
var gImgMeme;

/**Create new meme */
function createMeme(imgIdx) {
    gMeme = {}

    gMeme.selectedImgId = (imgIdx === -1) ? -1 : gImgs[imgIdx].id
    gMeme.selectedLineIdx = imgIdx

    gMeme.lines = []

    var canvasSize = getCanvasSize() //Get width and hight of the canvas

    //Set line position coordinates
    var linePos = {
        x: canvasSize.width / 2,
        y: 50
    }
    addLine(linePos.x, linePos.y)

    //Add another line
    linePos = {
        x: canvasSize.width / 2,
        y: canvasSize.height - 10
    }
    addLine(linePos.x, linePos.y)
    setLineClicked(0)
}

/*** gMeme functions ***/
function addLine(xPos, yPos) {
    var canvasSize = getCanvasSize()

    if (!xPos) xPos = canvasSize.width / 2
    if (!yPos) yPos = canvasSize.height / 2

    /*Default properties line*/
    var newLine = {
        txt: 'Enter text',
        font: 'Impact',
        size: 50, align: 'center',
        stroke: 'black',
        color: 'white',
        pos: {
            x: xPos,
            y: yPos
        }
    }
    gMeme.lines.push(newLine)
}

function deleteLine(idxLine) {
    var linesMeme = getLines()
    linesMeme.splice(idxLine, 1)
    changeLineClicked()
}
function changeLineProperty(keyProp, value) {
    if (keyProp === 'pos') {
        var deff = 5
        gLineClicked.pos.y += value * deff

    } else {
        if (keyProp === 'size') {
            var deff = 5
            value = gLineClicked.size + (deff * value)
        }

        gLineClicked[keyProp] = value
    }//END ELSE
}//END FUNCTION 'changeLineProperty'
function changeLineClicked() {
    var lines = getLines()
    var idxLine;
    if (!lines.length) {
        idxLine = null
    } else {
        idxLine = (idxLine === null) ? 0 : gLineClickedIdx + 1
        if (idxLine >= lines.length) idxLine = 0
    }
    setLineClicked(idxLine)
}
function setLineClicked(idxLine) {
    gLineClickedIdx = idxLine
    //Must to do (idxLine === null) because idxLine can also be equal to 0 (i went gLineClicked=null only if there is no index )
    gLineClicked = (idxLine === null) ? null : gMeme.lines[idxLine]
}
function getLineClickedIdx() {
    return gLineClickedIdx
}
function getLineClicked() {
    return gLineClicked
}

/*** Getters functions ***/

function getMeme() {
    return gMeme
}
function getLines() {
    return gMeme.lines
}


/** Gets item-id and items-array(objects array) and returns item with the same index  */
function getItemById(itemId, arr) {
    return arr.find(item => item.id === itemId)
}
/**  */
function getItemByIdx(idx, arry) {
    return arry[idx]
}

function downloadMeme(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
}


function setImgMeme(img) {
    gImgMeme = img
    saveToStorage(keyImgMeme, gImgMeme)
}
function getImgMeme() {
    return gImgMeme
}

function createImgObj(imgIdx) {
    if (imgIdx === -1) {
        loadImgMemeFromStorage()
    } else {
        var imgs = getImgs()
        var img = imgs[imgIdx]

        var imgObj = new Image()
        imgObj.src = img.url
        setImgMeme(imgObj)
    }
}

function setCanvasSizeByImg(imgObj) {
    var canvasSize = getCanvasSize()
    var ratio = imgObj.height / imgObj.width
    //Determines the height of the canvas according to the aspect ratio of the image
    var heightCanvas = imgObj.height + (canvasSize.width - imgObj.width) * ratio;
    setCanvasSize(canvasSize.width, heightCanvas)
}

function saveMemeToStorage() {
    saveToStorage(keyMeme, gMeme)
}
function saveImgMemeToStorage() {
    saveToStorage(keyImgMeme, gImgMeme)
}

function loadMemeFromStorage() {
    var meme = loadFromStorage(keyMeme)
    if (!meme) return null
    gMeme = meme
    setLineClicked(0)
    return meme
}

function loadImgMemeFromStorage() {
    gImgMeme = loadFromStorage(keyImgMeme)
    return getImgMeme
}

function save() {
    saveMemeToStorage()
    saveImgMemeToStorage()
}

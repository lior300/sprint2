'use strict'
/* MODAL */
var gKeywords = { 'happy': 12, 'funny puk': 1 }


var gCountImg = 18;
var gMeme;

/* line-text meme*/
var gLineClicked;//The last line clicked
var gLineClickedIdx;



/**Create new meme */
function createMeme(imgIdx) {
    var canvasSize = getCanvasSize()
    gMeme = {}

    gMeme.selectedImgId = gImgs[imgIdx].id
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
    addLine(canvasSize.width / 2, canvasSize.height - 10)

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
    if (idxLine === gLineClickedIdx) changeLineClicked()
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
    if (!gLineClicked) return
    var idxLine;
    var lines = getLines()

    if (!lines.length) {
        idxLine = null
    } else {
        idxLine = gLineClickedIdx + 1
        if (idxLine === lines.length) idxLine = 0
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


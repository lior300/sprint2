'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'img/meme-imgs-full-size/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/meme-imgs-full-size/2.jpg', keywords: ['happy2'] },
    { id: 3, url: 'img/meme-imgs-full-size/3.jpg', keywords: ['happy3'] },
    { id: 4, url: 'img/meme-imgs-full-size/4.jpg', keywords: ['happy4'] },
    { id: 5, url: 'img/meme-imgs-full-size/5.jpg', keywords: ['happy1'] },
    { id: 6, url: 'img/meme-imgs-full-size/6.jpg', keywords: ['happy2'] },
    { id: 7, url: 'img/meme-imgs-full-size/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/meme-imgs-full-size/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/meme-imgs-full-size/9.jpg', keywords: ['happy2'] },
    { id: 10, url: 'img/meme-imgs-full-size/10.jpg', keywords: ['happy2'] },
    { id: 11, url: 'img/meme-imgs-full-size/11.jpg', keywords: ['happy1'] },
    { id: 12, url: 'img/meme-imgs-full-size/12.jpg', keywords: ['happy1'] },
    { id: 13, url: 'img/meme-imgs-full-size/13.jpg', keywords: ['happy4'] },
    { id: 14, url: 'img/meme-imgs-full-size/14.jpg', keywords: ['happy3'] },
    { id: 15, url: 'img/meme-imgs-full-size/15.jpg', keywords: ['happy3'] },
    { id: 16, url: 'img/meme-imgs-full-size/16.jpg', keywords: ['happy2'] },
    { id: 18, url: 'img/meme-imgs-full-size/17.jpg', keywords: ['happy3'] },
    { id: 19, url: 'img/meme-imgs-full-size/18.jpg', keywords: ['happy'] },
]


/**  return gImage-modal */
function getImgs() {
    return gImgs
}

function getImgsToRenderByKeyword(keyword) {
    return gImgs.filter(img => {
        return img.keywords.some(word => {
            return word.includes(keyword.toLowerCase())
        })
    })
}



// DOM Selections
let openBtn = document.querySelector('#open-btn');
let closeBtn = document.querySelector('#close-btn');
let modal = document.querySelector('#modal');
let overlay = document.querySelector('#overlay');

init()

function init() {
    openBtn.addEventListener('click', () => toggleDisplay() )
    closeBtn.addEventListener('click', () =>  toggleDisplay() )
    overlay.addEventListener('click', () => toggleDisplay() )
}

function toggleDisplay() {
    modal.classList.toggle('open')
    overlay.classList.toggle('open')
    openBtn.classList.toggle('close')
}
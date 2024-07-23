const images = [
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/0/0a/FP_Hades.png/revision/latest/scale-to-width-down/250?cb=20181212021114',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/c/cf/FP_Nyx.png/revision/latest/scale-to-width-down/250?cb=20200823220402',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/1/1c/FP_Zeus.png/revision/latest/scale-to-width-down/250?cb=20181212021131',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/2/26/FP_Poseidon.png/revision/latest/scale-to-width-down/250?cb=20181212021121',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/4/44/FP_Athena.png/revision/latest/scale-to-width-down/250?cb=20230123012447',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/c/c6/FP_Artemis.png/revision/latest/scale-to-width-down/250?cb=20190117084925',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/c/cc/FP_Aphrodite.png/revision/latest/scale-to-width-down/250?cb=20230123012313',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/6/66/FP_Dionysus.png/revision/latest/scale-to-width-down/250?cb=20230123011541',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/1/16/FP_Hermes.png/revision/latest/scale-to-width-down/250?cb=20230123012857',
    'https://static.wikia.nocookie.net/hades_gamepedia_en/images/1/14/FP_Demeter.png/revision/latest/scale-to-width-down/250?cb=20230123013205'
];

const cards = [...images, ...images];
shuffle(cards);

let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gridContainer = document.getElementById('grid-container');
const attemptsElement = document.getElementById('attempts');
const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', restartGame);

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">
                <img src="${image}" alt="card image">
            </div>
        </div>
    `;
    console.log(image)
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    attempts++;
    attemptsElement.textContent = attempts;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    attempts = 0;
    attemptsElement.textContent = attempts;
    gridContainer.innerHTML = '';
    shuffle(cards);
    cards.forEach(image => gridContainer.appendChild(createCard(image)));
}

document.addEventListener('DOMContentLoaded', restartGame);

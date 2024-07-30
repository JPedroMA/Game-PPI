const images = [
    'src/img/FP_Aphrodite.png',
    'src/img/FP_Artemis.png',
    'src/img/FP_Athena.png',
    'src/img/FP_Demeter.jpg',
    'src/img/FP_Dionysus.jpg',
    'src/img/FP_Hades.png',
    'src/img/FP_Hermes.png',
    'src/img/FP_Nyx.png',
    'src/img/FP_Poseidon.png',
    'src/img/FP_Zeus.jpg'
];

const cards = [...images, ...images];
shuffle(cards);

let velvet = 'https://www.svgrepo.com/show/322475/hades-symbol.svg'
let attempts = 0;
let score = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const gridContainer = document.getElementById('grid-container');
const attemptsElement = document.getElementById('attempts');
const restartButton = document.getElementById('restart-button');
const audio = document.getElementById("song");
const start = 0

restartButton.addEventListener('click', restartGame);





function loadSound(coisax){
    coisax.volume = 0.5;
}
function startS(coisax){
    coisax.loop = true;
    coisax.play();
    
}
  
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;
    console.log(velvet)
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src="${velvet}" alt="card image">
            </div>
            <div class="card-back">
                <img src="${image}" alt="card image">
            </div>
        </div>
    `;
    console.log()
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
        score+=1;
        /*audio.volume += 0.1;*/
        console.log(score)
        if(score==10) {
            finishGame();
        }
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
    audio.volume = 0.01;  
}

function finishGame() {
    document.body.innerHTML = '';

    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.textAlign = 'center';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = '#f0f0f0';
    div.style.opacity = '0.7';
    div.style.padding = '20px';
    div.style.border = '1px solid #ccc';
    div.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';

    const heading = document.createElement('h1');
    heading.textContent = 'Voce venceu!!!';
    heading.style.margin = '25%'
    heading.style.fontSize = '50px'
    heading.style.fontWeight = '700'

    div.appendChild(heading);

    document.body.appendChild(div);
}


document.addEventListener('DOMContentLoaded', restartGame);

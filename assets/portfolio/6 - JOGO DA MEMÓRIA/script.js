const images = [
  'https://i.pinimg.com/736x/f9/08/a7/f908a7ae9602ddabb81bfe5d58011610.jpg',
  'https://i.pinimg.com/736x/de/57/8f/de578f8c25087aa228476d6a49a9da6c.jpg',
  'https://i.pinimg.com/736x/61/05/6d/61056d90c9ed247f1cd49ccffb2cbe3f.jpg'
];

const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
const historyList = document.getElementById('historyList');
const attemptsEl = document.getElementById('attempts');

let flipped = [];
let matched = 0;
let attempts = 0;
let lock = false;

let history = JSON.parse(localStorage.getItem('memoryGameHistory')) || [];




// Cria e embaralha as cartas
function setupGame() {
  gameBoard.innerHTML = '';
  flipped = [];
  matched = 0;
  attempts = 0;
  lock = false;
  attemptsEl.textContent = attempts;


  const cards = [...images, ...images].sort(() => Math.random() - 0.5);

  cards.forEach(img => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = img;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back" style="background-image: url('${img}')"></div>
      </div>
    `;

    card.addEventListener('click', () => flip(card));
    gameBoard.appendChild(card);
  });

}

// Vira a carta
function flip(card) {
  if (lock) return;
  if (card.classList.contains('flipped')) return;
  if (flipped.length === 2) return;

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    attempts++;
    attemptsEl.textContent = attempts;
    checkMatch();
  }
}

// Verifica se as duas cartas são iguais
function checkMatch() {
  const [card1, card2] = flipped;
  const isMatch = card1.dataset.image === card2.dataset.image;

  if (isMatch) {
    matched++;
    flipped = [];

    if (matched === images.length) {
  
      alert(`Parabéns! Você ganhou`);
      saveHistory();
    }
  } else {
    lock = true;
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flipped = [];
      lock = false;
    }, 800);
  }
}

// Salva o histórico no localStorage
function saveHistory() {
  history.push({ attempts});
  localStorage.setItem('memoryGameHistory', JSON.stringify(history));
  showHistory();
}

// Mostra o histórico na tela
function showHistory() {
  historyList.innerHTML = '';
  history.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = `Rodada ${i + 1}: ${item.attempts} tentativas`;
    historyList.appendChild(li);
  });
}

// Botão de reiniciar
restartBtn.addEventListener('click', () => {
  setupGame();
});

// Inicia
showHistory();
setupGame();
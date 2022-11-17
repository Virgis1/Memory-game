const cards = document.querySelectorAll('.card');
const score = document.getElementById('score');
const resetBtn = document.getElementById('reset');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let result = 0;
let timeleft = 80;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
    if (isMatch) {
        disableCards();
        result++;
        score.innerHTML = result;
    } else {
        unflipCards()
    }
  }
  
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  
    resetBoard();
  }
  
  function unflipCards() {
    lockBoard = true;
  
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
  
      resetBoard();
    }, 600);
  }
  
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function resetGame() {
    location.reload();
  }
  
  (function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 30);
      card.style.order = randomPos;
    });
  })();

let timer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(timer);
    alert('Laikas pasibaigė');
    resetGame()
  } else {
    document.getElementById("time").innerHTML = timeleft;
  }
  timeleft -= 1;
}, 1000);

cards.forEach(card => card.addEventListener('click', flipCard));
resetBtn.addEventListener('click', resetGame)
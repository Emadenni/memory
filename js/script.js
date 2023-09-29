let images = document.querySelectorAll(".galleryImg");
let cardsContainer = document.querySelector(".cardsContainer");
let cards = Array.from(document.querySelectorAll(".game"));
let matchedCards = 0;

let firstCard = null;
let secondCard = null;
let isFlipping = false;
let isGameStarted = false;

function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function showCards() {
  cards.forEach((card) => {
    let frontFace = card.querySelector(".cards");
    let backFace = card.querySelector(".cardBack");

    frontFace.style.display = "block";
    backFace.style.display = "none";
  });
}

function coverCards() {
  cards.forEach((card) => {
    let frontFace = card.querySelector(".cards");
    let backFace = card.querySelector(".cardBack");

    frontFace.style.display = "none";
    backFace.style.display = "block";
  });
}

function flipCard(card) {
  card.classList.toggle("flipped");

  if (card.classList.contains("flipped")) {
    card.querySelector(".cardBack").style.display = "none";
    card.querySelector(".cards").style.display = "block";
  } else {
    card.querySelector(".cardBack").style.display = "block";
    card.querySelector(".cards").style.display = "none";
  }
}

function checkWin() {
  if (matchedCards === cards.length) {
   
    setTimeout(() => {
      alert("You Win!");
      resetGame();
    }, 500);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}

function resetGame() {
  matchedCards = 0;
  isFlipping = false;
  isGameStarted = false;
  resetCards();
  coverCards();
  shuffleCards();
  showCards();
}

function cardClicked(card) {
  if (isFlipping || card.classList.contains("flipped") || card.classList.contains("matched")) {
    return; 
  }

  flipCard(card);

  if (!isGameStarted) {
    isGameStarted = true;
  }

  if (firstCard === null) {
    firstCard = card;
  } else if (secondCard === null) {
    secondCard = card;
    isFlipping = true;

    let firstCardValue = firstCard.getAttribute("data-card");
    let secondCardValue = secondCard.getAttribute("data-card");

    if (firstCardValue === secondCardValue) {
      
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matchedCards += 2;

      resetCards();
      isFlipping = false;
      checkWin();
    } else {
      
      setTimeout(() => {
        flipCard(firstCard);
        flipCard(secondCard);
        resetCards();
        isFlipping = false;
        alert("Cards no match!");
      }, 1000);
    }
  }
}

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cardClicked(card);
  });
});

let startButton = document.getElementById("startButton");
let resetButton = document.getElementById("resetButton");

startButton.addEventListener("click", () => {
  if (!isGameStarted) {
    startGame();
  }
});

resetButton.addEventListener("click", resetGame);

startButton.addEventListener("keydown", function(event) {
  
  if (event.keyCode === 13) {
    startGame();
  }
});

function startGame() {
  resetGame();
  startButton.disabled = true;
  coverCards();

  setTimeout(() => {
    showCards();
    setTimeout(() => {
      coverCards();
      startButton.disabled = false;
    }, 5000);
  }, 2000);
}

shuffleCards();
showCards();


class Card {
  constructor (name) {
    this.name = name;
    this.div = document.createElement('div')
    this.front = document.createElement('p');
    this.back = document.createElement('p');

    this.addClass();
    this.setContent();
  }

  addClass() {
    this.div.classList.add('card');
    this.front.classList.add('front');
    this.back.classList.add('center');
    this.back.classList.add('back');
  }

  setContent() {
    this.front.textContent = "";
    this.back.textContent = this.name;
    // Merge the front and back of the card to the div element
    this.div.appendChild(this.front);
    this.div.appendChild(this.back);
  }
}

// Variables
let flippedCards = 0;
let canClick = true;

// Shuffle order of cards function
const container = document.querySelector('.container')
const remaining =  document.querySelector('.remainingPairs')
const easytbn = document.getElementById('easy')
const mediumbtn = document.getElementById('medium')
const hardtbn = document.getElementById('hard')

remaining.textContent = `Pairs Remaining:  `

easytbn.addEventListener('click', () => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  flippedCards = 0;
  letters.length = 3;
  let pairs = duplicateArray(letters)
  pairs = shuffleArray(pairs)
  clearContainer();
  setGridLayout(2, 3)
  createCards(pairs);
  cardFunction();
  }
)

mediumbtn.addEventListener('click', () => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  flippedCards = 0;
  letters.length = 6;
  let pairs = duplicateArray(letters)
  pairs = shuffleArray(pairs)
  clearContainer();
  setGridLayout(3, 4)
  createCards(pairs);
  cardFunction();
  }
)

hardtbn.addEventListener('click', () => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  flippedCards = 0;
  letters.length = 8;
  let pairs = duplicateArray(letters)
  pairs = shuffleArray(pairs)
  clearContainer();
  setGridLayout(4, 4)
  createCards(pairs);
  cardFunction();
  }
)

// Functions
function clearContainer() {
  container.innerHTML = "";
}

function cardFunction() {
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    // card.classList.add('flip')
    card.addEventListener('click', () => {
      cardComparison(card);
    })
  })
}

function createCards(array) {
  array.forEach(letter => {
    const card =  new Card(letter);
    container.appendChild(card.div)
  })
}

function setGridLayout(row, column) {
  container.style['grid-template-columns'] = `repeat(${column}, 1fr)`
  container.style['grid-template-rows'] = `repeat(${row}, 1fr)`
}

function showCard(element) {
  element.classList.add('flip');
}

function closeCard(element) {
  element.classList.remove('flip');
}

function compareFlippedCards() {
  // Compare the two flipped cards
  let cards = document.querySelectorAll('.flip:not(.hide)');

  const card1 = cards[0];
  const card2 = cards[1];

  if (card1.textContent === card2.textContent) {
    console.log("SAME")
    setTimeout(function() {
      card1.classList.add('hide');
      card2.classList.add('hide');
      canClick = true;
      remainingPairs -= 1;
      showNumbersOfPairs();
      winCondition();
    }, 1000);
  }
  else {
    console.log("NOT SAME")
    setTimeout(function() {
      closeCard(card1);
      closeCard(card2);
      canClick = true;
    }, 750)
  } 
}

function showNumbersOfPairs() {
  pairs = shuffleArray(pairs)
  let text = `Pairs Remaining: ${remainingPairs}`
  remaining.textContent = text;
}

function cardComparison(card) {
  if (card.classList.contains('flip')) return;
    if (flippedCards < 2 && canClick){ 
      flippedCards += 1;
      showCard(card);

      if(flippedCards === 2) {
        canClick = false;
        compareFlippedCards();
        flippedCards = 0;
      }
    }
}

function winCondition() {
  setTimeout(function() {
    if (remainingPairs <= 0) {
      window.alert("You win")
    }
  }, 750)
}

function duplicateArray(array) {
  array.push(...array); 
  return array;
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5)
  return array;
}

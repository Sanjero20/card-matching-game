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

// Cards must be 3 pairs || 6 pairs || 8 pairs
let letters = ["A", "B", "C"];
letters.push(...letters);

// Shuffle order of cards function
const container = document.querySelector('.container')

// Check what number of pairs
container.style['grid-template-columns'] = `repeat(3, 1fr)`
container.style['grid-template-rows'] = `repeat(2, 1fr)`

// Create Cards
letters.forEach(letter => {
  const card =  new Card(letter);
  container.appendChild(card.div)
})

const cards = document.querySelectorAll('div.card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    if (flippedCards < 2){ 
      flippedCards += 1;
      showCard(card)

      if (flippedCards === 2) {
        getFlipCards();
      }
    }
  })
})

// Functions

function showCard(element) {
  element.classList.add('flip');
}

function closeCard(element) {
  element.classList.remove('flip');
}

function getFlipCards() {
  let cards = document.querySelectorAll('.flip:not(.hide)');

  const card1 = cards[0];
  const card2 = cards[1];

  if (card1.textContent === card2.textContent) {
    console.log("SAME")
    setTimeout(function() {
      card1.classList.add('hide');
      card2.classList.add('hide');
    }, 1000);
  }
  else {
    console.log("NOT SAME")
    setTimeout(function() {
      closeCard(card1);
      closeCard(card2);
    }, 750)
  }

  flippedCards = 0;
}




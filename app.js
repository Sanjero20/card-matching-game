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
let moveCount = 0;

// Shuffle order of cards function
const container = document.querySelector('.container');
const statusBar = document.querySelectorAll('.status > p');
const remaining =  document.querySelector('#left-remaining');
const moves = document.querySelector('#moves');
const easytbn = document.getElementById('easy');
const mediumbtn = document.getElementById('medium');
const hardtbn = document.getElementById('hard');

remaining.textContent = `Remaining:  `
moves.textContent = `Moves: ${moveCount}`

easytbn.addEventListener('click', () => playGame(3, 2, "1fr", 3, "1fr"))
mediumbtn.addEventListener('click', () => playGame(6, 3, "1fr", 4, "1fr"))
hardtbn.addEventListener('click', () => playGame(8, 4, "1fr", 4, "1fr"))

// Functions
function playGame(length, row, rowSize, column, columnSize) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  flippedCards = 0;
  letters.length = length;
  remainingPairs = letters.length
  let pairs = duplicateArray(letters)
  pairs = shuffleArray(pairs)

  showStatusBar();
  showContainer();
  clearContainer();

  updateNumbersOfPairs();
  setGridLayout(row, rowSize, column, columnSize);
  createCards(pairs);
  cardFunction();
}

// Initialize Functions
function cardFunction() {
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
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

function setGridLayout(row, rowSize, column, columnSize) {
  container.style['grid-template-columns'] = `repeat(${column}, ${columnSize})`
  container.style['grid-template-rows'] = `repeat(${row}, ${rowSize})`
}

// Card Comparison Functions 
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
      moveCount += 1;
      winCondition();
      updateNumberOfMoves();
      updateNumbersOfPairs();

    }, 1000);
  }
  else {
    console.log("NOT SAME")
    setTimeout(function() {
      closeCard(card1);
      closeCard(card2);
      moveCount += 1;
      updateNumberOfMoves();
      canClick = true;
    }, 750)
  } 
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
      moveCount = 0;
      window.alert("You win")
      clearContainer();
      updateNumberOfMoves();
      hideElements();
    }
  }, 750)
}

// Status display functions
function updateNumbersOfPairs() {
  let text = `Remaining: ${remainingPairs}`
  remaining.textContent = text;
}

function updateNumberOfMoves() {
  let text = `Moves: ${moveCount}`
  moves.textContent = text;
}

// Array related functions
function duplicateArray(array) {
  array.push(...array); 
  return array;
}

function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5)
  return array;
}

// Show and Hide Functions
function showStatusBar() {
  statusBar.forEach(stats => {
    stats.style.display ="inline";
  })
}

function showContainer() {
  container.style.display = "grid";
}

function hideElements() {
  statusBar.forEach (stats => stats.style.display = "none");
  container.style.display = "none";
}

function clearContainer() {
  container.innerHTML = "";
  moveCount = 0;
  updateNumberOfMoves();
}

//  Flip card Functions
function showCard(element) {
  element.classList.add('flip');
}

function closeCard(element) {
  element.classList.remove('flip');
}
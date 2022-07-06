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
    // 
    this.div.appendChild(this.front);
    this.div.appendChild(this.back);
  }
}

// Cards must be 3 pairs || 6 pairs || 8 pairs
let letters = ["A", "B", "C"];
letters.push(...letters);

// Shuffle order of cards function
const gridLength = letters.length

const container = document.querySelector('.container')

// Check what number of pairs
container.style['grid-template-columns'] = `repeat(3, 1fr)`
container.style['grid-template-rows'] = `repeat(2, 1fr)`

letters.forEach(letter => {
  const card =  new Card(letter);
  container.appendChild(card.div)
})

const cards = document.querySelectorAll('.card');
console.log(cards)

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flip')
    console.log('hi')
  })
})


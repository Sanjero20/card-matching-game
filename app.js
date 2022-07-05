// Cards must be 3 pairs || 6 pairs || 8 pairs

let cards = ["1", "2", "3", ];
cards.push(...cards);

// Shuffle order of cards function

const gridLength = cards.length

const container = document.querySelector('.container')

// Check what number of pairs
container.style['grid-template-columns'] = `repeat(3, 1fr)`
// container.style['grid-template-rows'] = `repeat(2, 1fr)`

cards.forEach(card => {
  const div = document.createElement('div');
  div.textContent = card;
  container.appendChild(div)
})


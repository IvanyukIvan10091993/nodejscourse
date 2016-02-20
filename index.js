// Libraries

// Variables

// Simple functions (do not depend on other functions and global variables)

// A function to generate deck
function generateDeck() {
  return {
    cards: {
      two: {quantity:4, value:2},
      three: {quantity:4, value:3},
      four: {quantity:4, value:4},
      five: {quantity:4, value:5},
      six: {quantity:4, value:6},
      seven: {quantity:4, value:7},
      eight: {quantity:4, value:8},
      nine: {quantity:4, value:9},
      ten: {quantity:4, value:10},
      jack: {quantity:4, value:10},
      queen: {quantity:4, value:10},
      king: {quantity:4, value:10},
      ace: {quantity:4, value:11},
    },
    cardsLeft:52
  };
}
// Complex functions (depend on other functions and global variables)

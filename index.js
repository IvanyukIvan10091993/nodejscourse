// Libraries

// Variables

// Simple functions (do not depend on other functions and global variables)
// Generates deck
function generateDeck() {
  return {
    cards: {
      0: {name: 'two', quantity:4, value:2},
      1: {name: 'three', quantity:4, value:3},
      2: {name: 'four', quantity:4, value:4},
      3: {name: 'five', quantity:4, value:5},
      4: {name: 'six', quantity:4, value:6},
      5: {name: 'seven', quantity:4, value:7},
      6: {name: 'eight', quantity:4, value:8},
      7: {name: 'nine', quantity:4, value:9},
      8: {name: 'ten', quantity:4, value:10},
      9: {name: 'jack', quantity:4, value:10},
      10: {name: 'queen', quantity:4, value:10},
      11: {name: 'king', quantity:4, value:10},
      12: {name: 'ace', quantity:4, value:11},
    },
    cardTypesLeft:13,
    cardsLeft:52
  };
}
// Gets random number from interval
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}

// Complex functions (depend on other functions and global variables)
// Chooses card using probability. Returns card type index.
function chooseCard(deck) {
  var randomNumber = getRandomNumber(0, deck.cardsLeft),
      cards = deck.cards;
  for (var cardType = 0,
           cardTypes = deck.cardTypesLeft,
           intervalRightBorder = 0;
       cardType < cardTypes;
       cardType++)
  {
    intervalRightBorder += cards[cardType].quantity;
    if (randomNumber < intervalRightBorder) {
      return cardType;
    }
  }
}
// Gets card
function getCard(deck) {
  var cardType = chooseCard(deck);
  console.log(deck.cards[cardType].name);
  removeCard(cardType, deck);
}
// Removes card from the deck
function removeCard(cardType, deck) {
  deck.cards[cardType].quantity -= 1;
  deck.cardsLeft -= 1;
  if (deck.cards[cardType].quantity < 1) {
    removeCardType(cardType, deck);
  }
}
// Removes card type from the deck
function removeCardType(cardType, deck) {
  if (deck.cardTypesLeft > 1) {
    deck.cards[cardType] = deck.cards[deck.cardTypesLeft - 1];
    delete deck.cards[deck.cardTypesLeft - 1];
    deck.cardTypesLeft -= 1;
  } else {
    delete deck.cards[cardType];
  }
}

//Code
var deck = generateDeck();
for (var i = 0; i < 52; i++) {
  console.log((i+1));
  getCard(deck);
}

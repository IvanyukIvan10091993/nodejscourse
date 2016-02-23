// Libraries
var colors = require('colors/safe');

// Variables
var deck;

// Functions

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
      return {
        cardIndex: cardType,
        suitsIndex: chooseSuit(cards[cardType].suits)
      };
    }
  }
}
// Chooses suit for a card. Returns suit index
function chooseSuit(objectSuits) {
  return Math.floor(getRandomNumber(0, (objectSuits.suitsLeft)));
}
// Generates cards
function generateCards() {
  return {
      0: generateCardType('Two', 2),
      1: generateCardType('Three', 3),
      2: generateCardType('Four', 4),
      3: generateCardType('Five', 5),
      4: generateCardType('Six', 6),
      5: generateCardType('Seven', 7),
      6: generateCardType('Eight', 8),
      7: generateCardType('Nine', 9),
      8: generateCardType('Ten', 10),
      9: generateCardType('Jack', 10),
      10: generateCardType('Queen', 10),
      11: generateCardType('King', 10),
      12: generateCardType('Ace', 11)
    };
}
// Generates card type
function generateCardType(cardName, cardValue) {
  return {
    name: cardName,
    quantity: 4,
    value: cardValue,
    suits: generateSuits()
  };
}
// Generates deck
function generateDeck() {
  return {
    cards: generateCards(),
    cardTypesLeft:13,
    cardsLeft:52
  };
}
// Generates suits
function generateSuits() {
  return {
    0:{color:'red', name: 'Hearts'},
    1:{color:'red', name: 'Diamonds'},
    2:{color:'blue', name: 'Spades'},
    3:{color:'blue', name: 'Clubs'},
    suitsLeft:4
  };
}
// Gets card
function getCard(deck) {
  var chosenCard = chooseCard(deck),
      cardType = chosenCard.cardIndex,
      suitType = chosenCard.suitsIndex,
      suitColor = deck.cards[cardType].suits[suitType].color;
  logCard(deck, cardType, suitType, suitColor);
  removeCard(cardType, deck, suitType);
}
// Gets random number from interval (doesn't include right border)
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}
// Logs card
function logCard(deck, cardType, suitType, suitColor) {
  console.log(colors[suitColor](deck.cards[cardType].name + " of " + deck.cards[cardType].suits[suitType].name));
}
// Removes card from the deck
function removeCard(cardType, deck, suitType) {
  deck.cards[cardType].quantity -= 1;
  deck.cardsLeft -= 1;
  if (deck.cards[cardType].quantity < 1) { // If no cards of this type left
    removeCardType(cardType, deck);
  } else { // If card type not removed, suit should be deleted
    removeSuit(deck.cards[cardType].suits, suitType);
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
// Removes suit
function removeSuit(suitsObject, suitType) {
  // no need to check if (suitsLeft > 1) or not because code won't get there otherwise
  suitsObject[suitType] = suitsObject[suitsObject.suitsLeft - 1];
  delete suitsObject[suitsObject.suitsLeft - 1];
  suitsObject.suitsLeft -= 1;
}

//Code
deck = generateDeck();
for (var i = 0; i < 52; i++) {
  console.log("\nCard number: " + (i+1));
  getCard(deck);
}

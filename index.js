// Libraries

// Variables
var deckk;

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
      return {cardIndex: cardType, suitIndex: chooseSuit(cards[cardType].suits)};
    }
  }
}
// Chooses suit for a card. Returns suit index
function chooseSuit(objectSuits) {
  console.log(objectSuits.suitsLeft);
  return Math.floor(getRandomNumber(0, (objectSuits.suitsLeft - 1)));
}
// Generates cards
function generateCards() {
  return {
      0: generateCardType('two', 2),
      1: generateCardType('three', 3),
      2: generateCardType('four', 4),
      3: generateCardType('five', 5),
      4: generateCardType('six', 6),
      5: generateCardType('seven', 7),
      6: generateCardType('eight', 8),
      7: generateCardType('nine', 9),
      8: generateCardType('ten', 10),
      9: generateCardType('jack', 10),
      10: generateCardType('queen', 10),
      11: generateCardType('king', 10),
      12: generateCardType('ace', 11)
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
    0:{color:'red', name: 'hearts'},
    1:{color:'red', name: 'diamonds'},
    2:{color:'black', name: 'spades'},
    3:{color:'black', name: 'clubs'},
    suitsLeft:4
  };
}
// Gets card
function getCard(deck) {
  var cardType = chooseCard(deck).cardIndex, /
      suitType = chooseCard(deck).suitIndex; /
  logCard(deck, cardType, suitType);
  removeCard(cardType, deck, suitType);
}
// Gets random number from interval (doesn't include right border)
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}
// Logs card
function logCard(deck, cardType, suitType) {
  console.log(deck.cards[cardType].name + " " + suitType);
  console.log(deck.cards[cardType].suits);
  console.log(deck.cards[cardType].suits[suitType].name)
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
deckk = generateDeck();
for (var i = 0; i < 52; i++) {
  console.log("\nCard number: " + (i+1));
  getCard(deckk);
}

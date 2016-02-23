// Libraries
var colors = require('colors/safe');

// Variables
var cardColorStringArray = ['red', 'red', 'blue', 'blue'],
    cardSuitNameStringArray = ['Hearts', 'Diamonds', 'Spades', 'Clubs'],
    cardTypeNameStringArray = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'],
    cardValueSumInteger = 380,
    cardValueIntegerArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
    deck;

// Functions
// Chooses random card index from the deck
function chooseCard(deck) {
  return getRandomInteger(0, deck.length);
}
// A function to clear log
function clearLog() {
  return process.stdout.write('\033c');
}
// Creates player
function createPlayer(isComputerBoolean, nameString) {
  var player = {};
  player.cardsQuantityInteger = 0;
  player.nameString = nameString;
  player.sumNumber = 0;
  player.tookCardBoolean = false;
  if (isComputerBoolean) {
    player.isComputerBoolean = true;
    player.cardValueSumExpectationNumber = cardValueSumInteger;
  }
  return player;
}
// Generates one card
function generateCard(cardColorString,
                      cardSuitNameString,
                      cardTypeNameString,
                      cardValueInteger)
{
  return {
    cardColorString: cardColorString,
    cardNameString: cardTypeNameString + ' of ' + cardSuitNameString,
    cardValueInteger: cardValueInteger
  };
}
// Generates deck
function generateDeck(cardColorStringArray,
                      cardSuitNameStringArray,
                      cardTypeNameStringArray,
                      cardValueIntegerArray)
{
  var cardNumber = 0,
      cardTypeLength = cardTypeNameStringArray.length,
      cardSuitLength = cardColorStringArray.length,
      deck = {};
  for (var cardTypeIndex = 0;
       cardTypeIndex < cardTypeLength;
       cardTypeIndex++)
    {
      for (var cardSuitIndex = 0;
           cardSuitIndex < cardSuitLength;
           cardNumber++, cardSuitIndex++)
      {
        deck[cardNumber] = generateCard(cardColorStringArray[cardSuitIndex],
                                        cardSuitNameStringArray[cardSuitIndex],
                                        cardTypeNameStringArray[cardTypeIndex],
                                        cardValueIntegerArray[cardTypeIndex]);
      }
    }
  deck.length = cardNumber;
  return deck;
}
// Gets random number from interval (doesn't include right border)
function getRandomInteger(min, max) {
  return Math.floor((Math.random() * (max - min))) + min;
}
// Logs card
function logCard(cardIndex, deck) {
  console.log(colors[deck[cardIndex].cardColorString](deck[cardIndex].cardNameString));
}
// Passes turn
function passTurn(playerObjectArray) {
  ;
}
// Removes card from the deck
function removeCard(cardIndex, deck) {
  deck.length -= 1;
  deck[cardIndex] = deck[deck.length];
  delete deck[deck.length];
}

// Code
deck = generateDeck(cardColorStringArray,
                        cardSuitNameStringArray,
                        cardTypeNameStringArray,
                        cardValueIntegerArray);
for (var i = 0; i < 52; i++) {
  console.log('\nCard number' + (i + 1))
  cardIndex = chooseCard(deck);
  logCard(cardIndex, deck);
  removeCard(cardIndex, deck);
}

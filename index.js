// Libraries
var colors = require('colors/safe'),
    readline = require('readline'),
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

// Variables
var cardColorStringArray = ['red', 'red', 'blue', 'blue'],
    cardSuitNameStringArray = ['Hearts', 'Diamonds', 'Spades', 'Clubs'],
    cardTypeNameStringArray = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'],
    cardTotalQuantityInteger = 52,
    cardValueSumInteger = 380,
    cardValueIntegerArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
    deckObject,
    playerObjectArray,
    turnInteger = 1;

// Functions
// Chooses random card index from the deck
function chooseCard(deckObject) {
  return getRandomInteger(0, deckObject.length);
}
// A function to clear log
function clearLog() {
  return process.stdout.write('\033c');
}
// Creates player
function createPlayer(isComputerBoolean, nameString) {
  var playerObject = {};
  playerObject.cardsQuantityInteger = 0;
  playerObject.nameString = nameString;
  playerObject.sumNumber = 0;
  playerObject.inGameBoolean = true;
  if (isComputerBoolean) {
    playerObject.isComputerBoolean = true;
    playerObject.cardValueSumExpectationNumber = cardValueSumInteger;
  }
  return playerObject;
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
      deckObject = {};
  for (var cardTypeIndex = 0;
       cardTypeIndex < cardTypeLength;
       cardTypeIndex++)
    {
      for (var cardSuitIndex = 0;
           cardSuitIndex < cardSuitLength;
           cardNumber++, cardSuitIndex++)
      {
        deckObject[cardNumber] = generateCard(cardColorStringArray[cardSuitIndex],
                                              cardSuitNameStringArray[cardSuitIndex],
                                              cardTypeNameStringArray[cardTypeIndex],
                                              cardValueIntegerArray[cardTypeIndex]);
      }
    }
  deckObject.length = cardNumber;
  return deckObject;
}
// Gets random number from interval (doesn't include right border)
function getRandomInteger(min, max) {
  return Math.floor((Math.random() * (max - min))) + min;
}
// Logs card
function logCard(cardIndex, deckObject) {
  console.log(colors[deckObject[cardIndex].cardColorString](deckObject[cardIndex].cardNameString));
}
// Passes turn
function passTurnAll(playerObjectArray) {
  showPlayerAll(playerObjectArray);
  for (var playerIndex = 0,
           playerLength = playerObjectArray.length;
       playerIndex < playerLength;
       playerIndex++)
  {
    //passTurnOne(playerObjectArray[playerIndex]);
  }
}
// Removes card from the deck
function removeCard(cardIndex, deckObject) {
  deckObject.length -= 1;
  deckObject[cardIndex] = deckObject[deckObject.length];
  delete deckObject[deckObject.length];
}
// Shows all players
function showPlayerAll(playerObjectArray) {
  clearLog();
  console.log('Turn ' + turnInteger + '\n');
  for (var playerIndex = 0,
           playerLength = playerObjectArray.length;
       playerIndex < playerLength;
       playerIndex++)
  {
    showPlayerOne(playerIndex, playerObjectArray[playerIndex]);
  }
}
// Shows one player
function showPlayerOne(playerIndex, playerObject) {
  console.log('Player' + (playerIndex + 1) + ': ' + playerObject.nameString);
  console.log('Cards on hand: ' + playerObject.cardsQuantityInteger);
  console.log('In game: ' + ((playerObject.inGameBoolean) ? 'Yes' : 'No'));
  if (!(playerObject.isComputerBoolean)) {
    console.log('Sum on hand: ' + playerObject.sumNumber);
  }
  console.log('');
}

// Code
deckObject = generateDeck(cardColorStringArray,
                          cardSuitNameStringArray,
                          cardTypeNameStringArray,
                          cardValueIntegerArray);
playerObjectArray = [createPlayer(false, 'Human'),
                     createPlayer(true, 'Computer')];
passTurnAll(playerObjectArray);

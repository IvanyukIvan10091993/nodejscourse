// Libraries
var colors = require('colors/safe'),
    readline = require('readline'),
    query = require('cli-interact').getYesNo;

// Variables
var cardColorStringArray = ['red', 'red', 'blue', 'blue'],
    cardSuitNameStringArray = ['Hearts', 'Diamonds', 'Spades', 'Clubs'],
    cardTypeNameStringArray = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'],
    cardTotalQuantityInteger = 52,
    cardValueSumInteger = 380,
    cardValueIntegerArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
    deckObject,
    maxSumInteger = 21,
    playerObjectArray,
    turnInteger = 1;

// Functions
// Adds card to player
function addCard(deckObject, playerObject) {
  if (checkOpinion(playerObject)) {
    var cardIndex = chooseCard(deckObject);
    if (!(playerObject.isComputerBoolean)) {
      console.log(playerObject.nameString + ', you got');
      logCard(cardIndex, deckObject);
      console.log('');
    }
    changeHand(cardIndex, deckObject, playerObject);
    removeCard(cardIndex, deckObject);
    checkLoseCondition(playerObject);
  } else {
    ;
  }
}
// Changes player's hand
function changeHand(cardIndex, deckObject, playerObject) {
  playerObject.cardQuantityInteger += 1;
  playerObject.sumNumber += deckObject[cardIndex].value;
  if (isComputerBoolean) {
    playerObject.cardNotInHandValueSumInteger -= deckObject[cardIndex].value;
    playerObject.cardsNotInHandQuantityInteger -= 1;
  }
}
// Checks if player has lost the game
function checkLoseCondition(playerObject) {
  if (playerObject.sumNumber > 21) {
    playerObject.inGameBoolean = false;
  }
}
// Checks if card should be taken
function checkOpinion(playerObject) {
  return (playerObject.isComputerBoolean) ? checkOpinionComputer(playerObject) : checkOpinionHuman(playerObject);
}
// Checks if computer should take a card
function checkOpinionComputer(playerObject) {
  var cardValueExpectationNumber = playerObject.cardNotInHandValueSumInteger / playerObject.cardsNotInHandQuantityInteger;
  if (playerObject.sumNumber + cardValueExpectationNumber < maxSumInteger) {
    return true;
  }
}
// Checks if human should take a card
function checkOpinionHuman(playerObject) {
  var opinionBoolean = query(playerObject.nameString + ', do you want to take a card?');
  return opinionBoolean;
}
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
  playerObject.cardQuantityInteger = 0;
  playerObject.nameString = nameString;
  playerObject.sumNumber = 0;
  playerObject.inGameBoolean = true;
  if (isComputerBoolean) {
    playerObject.isComputerBoolean = true;
    playerObject.cardNotInHandValueSumInteger = cardValueSumInteger;
    playerObject.cardsNotInHandQuantityInteger = cardTotalQuantityInteger;
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
    passTurnOne(playerObjectArray[playerIndex]);
  }
}
// Passes turn for one player
function passTurnOne(playerObject) {
  if (playerObject.inGameBoolean) {
    addCard(deckObject, playerObject);
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
  console.log('Cards on hand: ' + playerObject.cardQuantityInteger);
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
playerObjectArray = [createPlayer(false, 'Faceless Human'),
                     createPlayer(true, 'Computer1'),
                     createPlayer(true, 'Computer2')];
passTurnAll(playerObjectArray);

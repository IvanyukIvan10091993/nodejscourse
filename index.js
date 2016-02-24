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
    playersInGameInteger = 4,
    turnInteger = 0;

// Functions
// Adds card to player
function addCard(deckObject, playerObject) {
  if (checkOpinion(playerObject)) {
    var cardIndex = chooseCard(deckObject);
    if (!(playerObject.isComputerBoolean)) {
      rememberHumanCard(cardIndex, deckObject, playerObject);
    }
    changeHand(cardIndex, deckObject, playerObject);
    removeCard(cardIndex, deckObject);
    checkLoseCondition(playerObject);
  } else {
    ignorePlayer(playerObject);
  }
}
// Changes player's hand
function changeHand(cardIndex, deckObject, playerObject) {
  playerObject.cardQuantityInteger += 1;
  playerObject.sumNumber += deckObject[cardIndex].cardValueInteger;
  if (playerObject.isComputerBoolean) {
    playerObject.cardNotInHandValueSumInteger -= deckObject[cardIndex].cardValueInteger;
    playerObject.cardsNotInHandQuantityInteger -= 1;
  }
}
// Checks if player has lost the game
function checkLoseCondition(playerObject) {
  if (playerObject.sumNumber > 21) {
    ignorePlayer(playerObject);
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
  var opinionBoolean = query(colors[playerObject.colorString](playerObject.nameString + ', do you want to take a card?'));
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
function createPlayer(colorString, isComputerBoolean, nameString) {
  var playerObject = {};
  playerObject.cardQuantityInteger = 0;
  playerObject.colorString = colorString;
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
// Finds winner
function findWinnerIndex(playerObjectArray) {
  var maxSum = 0,
      winnerIndex;
  for (var playerIndex = 0,
           playerLength = playerObjectArray.length;
       playerIndex < playerLength;
       playerIndex++)
  {
    if (playerObjectArray[playerIndex].sumNumber > maxSum
        &&
        playerObjectArray[playerIndex].sumNumber <= maxSumInteger) {
      maxSum = playerObjectArray[playerIndex].sumNumber;
      winnerIndex = playerIndex;
    }
  }
  return winnerIndex;
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
function handleResult() {
  ;
}
// Removes player from the game
function ignorePlayer(playerObject) {
  playerObject.inGameBoolean = false;
  playersInGameInteger -= 1;
}
// Inits the game
function initGame(deckObject, playerObjectArray) {
  while (playersInGameInteger > 0) {
    passTurnAll(playerObjectArray);
  }
  showSums(playerObjectArray);
  var winnerIndex = findWinnerIndex(playerObjectArray);
  showWinner(playerObjectArray[winnerIndex]);
  handleResult(playerObjectArray);
}
// Logs card
function logCard(cardIndex, deckObject) {
  console.log(colors[deckObject[cardIndex].cardColorString](deckObject[cardIndex].cardNameString));
}
// Passes turn
function passTurnAll(playerObjectArray) {
  showTurn();
  showHumanLastCards(playerObjectArray);
  showPlayerAll(playerObjectArray);
  for (var playerIndex = 0,
           playerLength = playerObjectArray.length;
       playerIndex < playerLength;
       playerIndex++)
  {
    passTurnOne(playerObjectArray[playerIndex]);
  }
  turnInteger++;
}
// Passes turn for one player
function passTurnOne(playerObject) {
  if (playerObject.inGameBoolean) {
    addCard(deckObject, playerObject);
  }
}
// Remembers last card of human player
function rememberHumanCard(cardIndex, deckObject, playerObject) {
  playerObject.lastCardColorString = deckObject[cardIndex].cardColorString;
  playerObject.lastCardNameString = deckObject[cardIndex].cardNameString;
}
// Removes card from the deck
function removeCard(cardIndex, deckObject) {
  deckObject.length -= 1;
  deckObject[cardIndex] = deckObject[deckObject.length];
  delete deckObject[deckObject.length];
}
// Shows last card of one human player
function showHumanLastCard(playerObject) {
  if (playerObject.lastCardColorString) {
    console.log(colors[playerObject.colorString](playerObject.nameString + ' got: ') + colors[playerObject.lastCardColorString](playerObject.lastCardNameString));
  }
}
// Shows last cards of human players
function showHumanLastCards(playerObjectArray) {
  for (var playerIndex = 0,
           playerLength = playerObjectArray.length;
       playerIndex < playerLength;
       playerIndex++)
  {
    if (!(playerObjectArray[playerIndex].isComputerBoolean)) {
      showHumanLastCard(playerObjectArray[playerIndex]);
    }
  }
  console.log('');
}
// Shows all players
function showPlayerAll(playerObjectArray) {
  for (var playerIndex = 0,
           playerLength = playerObjectArray.length;
       playerIndex < playerLength;
       playerIndex++)
  {
    showPlayerOne(playerIndex, playerObjectArray[playerIndex]);
  }
  console.log('');
}
// Shows one player
function showPlayerOne(playerIndex, playerObject) {
  console.log(colors[playerObject.colorString]('Player' + (playerIndex + 1) + ': ' + playerObject.nameString));
  console.log(colors[playerObject.colorString]('Cards on hand: ' + playerObject.cardQuantityInteger));
  console.log(colors[playerObject.colorString]('In game: ' + ((playerObject.inGameBoolean) ? 'Yes' : 'No')));
  if (!(playerObject.isComputerBoolean)) {
    console.log(colors[playerObject.colorString](('Sum on hand: ' + playerObject.sumNumber)));
  }
}
// Shows sum of one player
function showSum(playerIndex, playerObject) {
  console.log(colors[playerObject.colorString]('Player' + (playerIndex + 1) + ': ' + playerObject.sumNumber));
}
// Shows player sums
function showSums(playerObjectArray) {
  clearLog();
  console.log('Players\' scores:');
  for (var playerIndex = 0,
           playerLength = playerObjectArray.length;
       playerIndex < playerLength;
       playerIndex++)
  {
    showSum(playerIndex, playerObjectArray[playerIndex]);
  }
  console.log();
}
// Shows the beginning of each turn
function showTurn() {
  clearLog();
  console.log('Turn ' + turnInteger + '\n');
}
// Show winner
function showWinner(playerObject) {
  console.log('And the winner is ' + colors[playerObject.colorString](playerObject.nameString) + '!!!');
}

// Code
deckObject = generateDeck(cardColorStringArray,
                          cardSuitNameStringArray,
                          cardTypeNameStringArray,
                          cardValueIntegerArray);
playerObjectArray = [createPlayer('green', false, 'Anonymous1'),
                     createPlayer('white', true, 'Computer1'),
                     createPlayer('blue', true, 'Computer2'),
                     createPlayer('red', true, 'Computer3')];
initGame(deckObject, playerObjectArray);

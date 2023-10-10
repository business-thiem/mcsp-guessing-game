//look into session storage on keeping stats after refresh
const scoreBoard = {
  tim: {
    curent: [],
    past: [10, 8],
  },
  bob: {
    curent: [],
    past: [3, 5],
  },
};

const gameConfig = {
  min: 1,
  max: 100,
};

function startGame() {
  const numberToGuess = getNumberToGuess(gameConfig.min, gameConfig.max);
  const playerName = prompt(`Please enter your name`);
  let guess = askForNumber();

  initializeUser(playerName);

  //exits on true
  while (Number(guess) !== numberToGuess) {
    giveHint(playerName, guess, numberToGuess);
    guess = askForNumber();
    console.log(scoreBoard);
    scoreBoard[playerName].current.push(guess);
  }

  //show message player won
  displayResultMessage(playerName);
  //record the score

  //ask to play again
}

function askForNumber() {
  let num = prompt(
    `Please enter a guess between ${gameConfig.min}-${gameConfig.max}`
  );
  return num;
}

function giveHint(name, guess, numberToGuess) {
  const hint = Number(guess) < numberToGuess ? `Higher` : `Lower`;
  alert(`Your guess: ${guess}. Guess ${hint}`);
}

function displayResultMessage(playerName) {
  if (scoreBoard[playerName].past.length > 0) {
    // compareWithPreviousGame(playerName)
    alert(
      'comparing with previous game, display some message, if player has played before.'
    );

    compareWithPreviousGame(playerName);
  } else {
    alert(
      `Great Job ${playerName}! This is your first win of many. Your score: ${scoreBoard[playerName].current.length} your guesses: ${scoreBoard[playerName].current.join} `
    );
  }
}

function compareWithPreviousGame(playerName) {
  const priorScore = scoreBoard[playerName].past.length; //2
  const currentScore = scoreBoard[playerName].current.length; //5
  const scoreDifference = currentScore - priorScore; // 5-2 did not do better

  // 3 diff did not do better
  if (scoreDifference < 0) {
    alert(
      `That's Correct ${guest}! You missed your highscore by ${Math.abs(
        difference
      )} guesses.`
    );
    //if diff did better
  } else if (difference > 0) {
    alert(
      `That's Correct ${guest}! You did better in your last game by ${difference} guesses.`
    );
  }
}

function resetscoreBoard(guest) {
  scoreBoard[guest].past = [...scoreBoard[guest].current]; //spread operator, current scoreBoard set are now past scoreBoard
  scoreBoard[guest].current = [];
}

function getNumberToGuess(min, max) {
  return Math.floor(Math.random() * (max - min) + min + 1); // +1 gets inclusive 1-100 range
}

function initializeUser(userName) {
  if (!scoreBoard[userName]) {
    scoreBoard[userName] = {
      current: [],
      past: [],
    };
  }
}

function showScoreBoard() {
  //show scoreboard
  alert(`Not available yet. refactoring in progress`);
}

//currently not used *************************
function validateUserInput() {
  //regex or some form of validation on string prompts
  if (!str) {
    alert('invalid input');
  }
}

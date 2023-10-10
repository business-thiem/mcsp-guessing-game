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
  attempts: 5,
};

function startGame() {
  const numberToGuess = getNumberToGuess(gameConfig.min, gameConfig.max);
  const playerName = prompt(`Please enter your name`);
  let guess = askForNumber();

  initializeUser(playerName);

  //exits on true
  while (Number(guess) !== numberToGuess) {
    giveHint(guess, numberToGuess);
    gameConfig.attempts--; //attempts player has, breaks infinite loop
    alert(`${gameConfig.attempts} tries left`);
    guess = askForNumber();
    console.log(scoreBoard);
    scoreBoard[playerName].current.push(guess);

    //TODO last left off here, and the join issue in displayResultMessage()
    if (gameConfig.attempts <= 0) {
      alert(`Out of lives. You lose`);
      break;
    } else {
      displayResultMessage(playerName);
    }
  }
  resetscoreBoard(playerName);
  //ask to play again
  playAgain();
}

function askForNumber() {
  let num = prompt(
    `Please enter a guess between ${gameConfig.min}-${gameConfig.max}`
  );
  return num;
}

function giveHint(guess, numberToGuess) {
  const hint = Number(guess) < numberToGuess ? `Higher` : `Lower`;
  //   alert(`Your guess: ${guess}. Guess ${hint}.`);
  alert(
    `DEBUG MODE: Your guess: ${guess}. Guess ${hint}. Number is: ${numberToGuess}`
  );
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
  const priorScore = scoreBoard[playerName].past.length;
  const currentScore = scoreBoard[playerName].current.length;
  const scoreDifference = currentScore - priorScore;

  // diff did not do better
  if (scoreDifference < 0) {
    alert(
      `That's Correct ${playerName}! You missed your highscore by ${Math.abs(
        difference
      )} guesses.`
    );
    //if diff did better
  } else if (difference > 0) {
    alert(
      `That's Correct ${playerName}! You did better in your last game by ${difference} guesses.`
    );
  }
  //if diff is 0 (equal)
  else {
    alert(
      `That's Correct ${playerName}! You had the same number of guesses in your last game. This round you had these guesses: ${scoreBoard[
        playerName
      ].current.join(', ')}.`
    );
  }
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

function resetscoreBoard(playerName) {
  scoreBoard[playerName].past = [...scoreBoard[playerName].current]; //spread operator, current scoreBoard set are now past scoreBoard
  scoreBoard[playerName].current = [];
}

function playAgain() {
  //TODO add input validation
  const response = prompt('Do you want to play again? Yes / No');

  switch (response) {
    case 'Yes':
      alert('Ok started a new game!');
      play();
      break;
    case 'No':
      alert("Cool, I'm sure you have better things to do");
      break;
    default:
      alert("Sorry I didn't recognize that command");
      playAgain();
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

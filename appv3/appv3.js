
//look into session storage on keeping stats after refresh
const scoreBoard = {
    tim: {
        curent: [],
        past: [10,8]
    },
    bob: {
        curent: [],
        past: [3,5]
    } 
}

const gameConfig = {
    min: 1,
    max: 100
}



function startGame(){
    const numberToGuess = getNumberToGuess()
    const playerName = prompt(`Please enter your name`);
    let guess = askForNumber();

    initializeUser(playerName);

    while(Number(guess) !== numberToGuess){
        giveHintAndAskAgain(playerName, guess, numberToGuess)
        askForNumber();
        scoreBoard[playerName].current.push(guess);
    }

    console.log(`Your guess ${guess} is right!`)
}

function askForNumber(){
    let num = prompt(`Please enter a guess between ${gameConfig.min}-${gameConfig.max}`);
    return num;
}

function giveHintAndAskAgain(name, guess, numberToGuess){
    const hint = Number(guess) < numberToGuess ? `Higher` : `Lower`;
    alert(`Your guess: ${guess}. Guess ${hint}`)
}

function validateUserInput(){
    //regex or some form of validation on string prompts
    if(!str){
        alert('invalid input')
    }
}

function resetscoreBoard(guest) {
    scoreBoard[guest].past = [...scoreBoard[guest].current]; //spread operator, current scoreBoard set are now past scoreBoard
    scoreBoard[guest].current = [];
}






function getNumberToGuess(min, max){
    return Math.floor(Math.random() * (max - min) + min + 1); // +1 gets inclusive 1-100 range
}


function showScoreBoard(){
    //show scoreboard
}

function initializeUser(userName) {
    if (!scoreBoard[userName]) {
        scoreBoard[userName] = {
            current: [],
            past: []
        };
    }
}

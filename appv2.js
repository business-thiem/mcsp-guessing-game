//working out feature 7

let userArray, userName, isCorrect, min, max, number; 


let game = {
    numberToGuess: 0,
    playerUserName: '',
    currentResponse: 0,
    isSolved: false,
    currentPlayerResponses: [],
    pastScores: [] // ['thiem',3]
}

console.log(game);


startGame()

function startGame(){
    setupGameBoard()

    game.playerUserName = prompt('What is your name?');
    game.currentResponse = prompt('Guess a number between 1 and 3')
    
    console.log(game)
    // add validateUserResponse()
}

function setupGameBoard(){
    min = 1
    max = 3

    game.numberToGuess = getNumberToGuess(min, max)

    game.isSolved = false;
    game.currentPlayerResponses = []

}

function getNumberToGuess(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}



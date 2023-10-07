//working out feature 7


/* TODO 
-print out prior guesses
-check prior winner and their scores
*/

// let userArray, userName, isCorrect, min, max, number, newPlayer; 


let gameInfo = {
    numberToGuess: 0,
    playerUserName: '',
    currentResponse: 0,
    isNewPlayer: true,
    responsesArr: [],
    scoreBoard: ['tim', 3, 'bob', 5], // ['thiem',3]
    attempts: 0
}

let min, max;


// startGame(); now based on button click

function startGame(){

    setupGameBoard();
    let isSolved = false;


    gameInfo.playerUserName = prompt('What is your name?');
    while(!isSolved){
          
        if(gameInfo.attempts > 0){
            isSolved = playGame();
            gameInfo.attempts--;
        }else {
            alert('you lost the game')
            isSolved = true;
        }
    }

    console.log('isSolved value:', isSolved)
    console.log('end gameInfo',gameInfo)
}

function playGame(){
    let promptMessage = 
    `Guess a number between ${min} and ${max} \n
    You have ${gameInfo.attempts} attempts left`

    
    gameInfo.currentResponse = Number(prompt(promptMessage))
    gameInfo.responsesArr.push(gameInfo.currentResponse)

    return isSolved = validateUserResponse(gameInfo)

}

function priorPlayerCheck(){
    // run some check with array.includes, but for now return true
    return true;
}




function validateUserResponse(gameObj){
    let num = gameObj.numberToGuess
    let playerGuess = gameObj.currentResponse
    let isCorrect = gameObj.isSolved
    let guesses = gameInfo.responsesArr

    let strVictory = `Congrats you\'re correct! Your guess was: ${playerGuess}
    \n The number to guess was: ${num}
    \n Here were all your guesses ${guesses.join(', ')}`
    
    if(num === playerGuess){
        alert(strVictory)
        isCorrect = true
    } else if(num > playerGuess){
        alert(`Guess higher. try again: hint ${num}`)
    } else if(num < playerGuess){
        alert(`Guess lower. try again: hint ${num}`)
    }


    return isCorrect;
}


function setupGameBoard(){
    min = 1
    max = 100

    gameInfo.numberToGuess = getNumberToGuess(min, max)
    gameInfo.isSolved = false;
    gameInfo.currentPlayerResponses = []
    gameInfo.attempts = 5

    console.log('start gameInfo:', gameInfo);
}

function getNumberToGuess(min, max) {
    return Math.floor(Math.random() * (max - min) + min + 1);
}



//working out feature 7


/* TODO 
-print out prior guesses
-check prior winner and their scores
-use ?? Nullish coalescing operator for computing scores and returnPlayerCheck()
*/


/* DEBUG
-playAgain guesses arr not reset -fixed
-beat previous attempts score incorrect 
-playAgain 'no' keeps looping
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
let numberOfCurrentPlays = 0;
let oldPlayerScore = 0;

// startGame(); now based on button click

function startGame(){


    let isSolved = false;

    gameInfo.playerUserName = prompt('What is your name?');
    let isVeteran = priorPlayerCheck(gameInfo.playerUserName)

    //veteran gameloop, loads their old score
    if(isVeteran){
        oldPlayerScore = loadPlayerStats(gameInfo.playerUserName)
    } 

    /* 
    - if first time playing the current time, give fresh game. 
    - else resets: playerGuesses, loads new number, reset attempts
    */
    if(numberOfCurrentPlays === 0){
        setupFreshGame();
    } else {
        resetPieces();
    }
    

    //game loop while true
    while(!isSolved && gameInfo.attempts > 0){
          
        if(gameInfo.attempts > 0){
            isSolved = playGame();
            gameInfo.attempts--;

            if(isSolved){
                let againRes = prompt('Would you like to play again? (\'yes\' or \'no\' ')
                if(againRes === 'y' || againRes === 'yes'){
                    numberOfCurrentPlays++
                    startGame()
                } else{
                    gameInfo.attempts = 0;
                }
            }
        }
        else {
            isSolved = true;
        }
    }

    if(gameInfo.attempts <= 0){
        //ran out of lives
        alert('you lost the game')
    } else if(isSolved && gameInfo.attempts >= 0){ 
        //still have lives, solved it
        alert('game has ended because you solved it')
    } else if(!isSolved && gameInfo.attempts >= 0){
        //still have lives, not solved, you did not want to play again
        alert('Game ended. Not playing again')
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

function loadPlayerStats(name){
    //check for player return score
    let priorScore = 5
    return priorScore; 
}




function validateUserResponse(gameObj){
    let num = gameObj.numberToGuess;
    let playerGuess = gameObj.currentResponse;
    let isCorrect = gameObj.isSolved;
    let guesses = gameInfo.responsesArr;
    let name = gameInfo.playerUserName;
    let score = guesses.length - oldPlayerScore; 

    
    // if(guesses.length < oldPlayerScore){
    //     score = guesses.length
    // } else {
    //     score = guesses.length - oldPlayerScore;
    // }

    let strVictory = `Congrats you\'re correct! Your guess was: ${playerGuess}
    \n The number to guess was: ${num}
    \n Here were all your guesses ${guesses.join(', ')}
    \n You beat your previous attempt by ${score} few guesses`
    
    if(num === playerGuess){
        alert(strVictory)
        isCorrect = true
    } else if(num > playerGuess){
        alert(`Sorry ${name}, Guess higher. try again: hint ${num}`)
    } else if(num < playerGuess){
        alert(`Sorry ${name}, Guess lower. try again: hint ${num}`)
    }


    return isCorrect;
}


function setupFreshGame(){
    min = 1
    max = 100

    gameInfo.numberToGuess = getNumberToGuess(min, max)
    // gameInfo.isSolved = false;
    gameInfo.responsesArr = []
    gameInfo.attempts = 5

    console.log('start gameInfo:', gameInfo);
}

function getNumberToGuess(min, max) {
    return Math.floor(Math.random() * (max - min) + min + 1);
}

function resetPieces(){
    gameInfo.numberToGuess = getNumberToGuess(min, max)
    gameInfo.attempts = 5
    gameInfo.responsesArr = []
}


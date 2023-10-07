//working out feature 7


/* TODO 
-add highscore and name to scoreboard
-use ?? Nullish coalescing operator for computing scores and returnPlayerCheck()
*/


/* BUGs
-playAgain guesses arr not reset -fixed
-beat previous attempts score incorrect 
-playAgain 'no' keeps looping -fixed
-playAgain 'no' loops alert 3 times, when pressing ENTER too fast on prompt
> (Possible reason) Might be run time error of variable not updating and running same lines again after update AKA LAG? 
> does not occur if 'no' clicked okay. 

-
*/

// let userArray, userName, isCorrect, min, max, number, newPlayer; 


let gameInfo = {
    numberToGuess: 0,
    playerUserName: '',
    currentResponse: 0,
    isNewPlayer: true,
    responsesArr: [],
    scoreBoard: ['tim', 3, 'bob', 5], // ['thiem',3] name, attempts
    attempts: 0
}

let min, max;
let numberOfCurrentPlays = 0;
let oldPlayerScore = 0;
let isSolved = false;

//format scores response to look nicer, later?
function showScoreBoard(){
    scoreBoardFormatted = ``

    //when index is even, 
    gameInfo.ScoreBoard.reduce((counter, value, index) => {
        if(index % 2 === 0){
            scoreBoardFormatted += `${value}` //left off here
        } else {
            scoreBoardFormatted += `${value}`
        }
    })
    alert(scoreBoardFormatted)
}


// startGame(); now based on button click
function startGame(){
    isSolved = false;
    
    gameInfo.playerUserName = prompt('What is your name?');
    let isVeteran = priorPlayerCheck(gameInfo.scoreBoard, gameInfo.playerUserName)

    //veteran gameloop, loads their old score
    if(isVeteran){
        oldPlayerScore = loadPlayerStats(gameInfo.scoreBoard, gameInfo.playerUserName)
        alert(`Welcome back ${gameInfo.playerUserName}!`) //to verify live that player is found
    } else{
        alert(`Welcome ${gameInfo.playerUserName}!`) //debugging only
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

    console.log('start gameInfo:', gameInfo);


    //game loop while true
    while(!isSolved && gameInfo.attempts > 0){
        
        isSolved = playGame();
        gameInfo.attempts--;

        if(isSolved){
            let againRes = prompt('Would you like to play again? (\'yes\' or \'no\') ')
            if(againRes === 'y' || againRes === 'yes'){
                numberOfCurrentPlays++
                isSolved = false;
                startGame() 
            } else{
                gameInfo.attempts = -1;
            }
        }
    }

    if(isSolved && gameInfo.attempts >= 0){ 
        //still have lives, solved it
        alert('game has ended because you solved it')
    } else if(gameInfo.attempts === -1){
        alert('Game addiction ended, have you tried alcohol?')
    } else if(gameInfo.attempts === 0){
        //ran out of lives
        alert('you lost the game')
    } else if(gameInfo.attempts < 0){
        alert(`You broke the code. This condition should be impossible to reach, \n 
        ALERT THE CODE MONKEY!!!!`)
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

    isSolved = validateUserResponse(gameInfo)
    return isSolved;

}

function priorPlayerCheck(arr, name){
    if(arr.includes(name)){
        let score = loadPlayerStats(name) //load player score if exist. this is redundant for debugging
        console.log(`${name} is in the list. Your past score was: ${score}`)
        return true
    } else{
        console.log(`${name} is not in the list`)
        return false
    }
}


function loadPlayerStats(arr, name){
    //check for player return score
    let scoreIndex = arr.indexOf(name)
    let priorScore = arr[scoreIndex+1];


    // priorScore = 5;
    return priorScore; 
}

// i am not checking for unique or highest score, because higher score will always call this function, and newScores adds to the beginning and includes searches for first match. Complexity not needed here yett.
function recordNewScore(arr, name, newScore){
    console.log('old scores array:', arr);

    arr.unshift(newScore)
    arr.unshift(name);


    console.log('new scores array:', arr);
    return arr;
}




function validateUserResponse(gameObj){
    let num = gameObj.numberToGuess;
    let playerGuess = gameObj.currentResponse;
    let isCorrect = gameObj.isSolved;
    let guesses = gameInfo.responsesArr;
    let name = gameInfo.playerUserName;
    let scoreRangeDiff = oldPlayerScore;


    let scoreStr = `Good job, but you did not beat your oldScore: ${oldPlayerScore}`

    //beat highscore String
    if(guesses.length < oldPlayerScore){
        scoreRangeDiff = oldPlayerScore - guesses.length; 
        scoreStr = `You beat your previous attempt by ${scoreRangeDiff} fewer guesses`
        recordNewScore(gameInfo.scoreBoard, name, guesses.lengtth)
    }


    let strVictory = `Congrats you\'re correct! Your guess was: ${playerGuess}
    \n The number to guess was: ${num}
    \n Here were all your guesses: ${guesses.join(', ')} 
    \n ${scoreStr}`
    
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
    gameInfo.attempts = 10
}

function getNumberToGuess(min, max) {
    return Math.floor(Math.random() * (max - min) + min + 1);
}

function resetPieces(){
    gameInfo.numberToGuess = getNumberToGuess(min, max)
    gameInfo.attempts = 10
    gameInfo.responsesArr = []
}


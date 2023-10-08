//working out feature 7


/* TODO main
-make less global variables and redundant code, get better at variable scope 
-see other TODO comments
-use ?? Nullish coalescing operator for computing scores and returnPlayerCheck()
*/


/* BUGs

known:



Fixed
-condition to record score might still be wrong, if scores are even they still record  - fixed
> still records score and prints 'you didn't beat score' if variable is equal
-playAgain guesses arr not reset -fixed
-beat previous attempts score incorrect -fixed
-playAgain 'no' keeps looping -fixed
-scoreStr is not being updated, oldScore is not being updated - fixed

unsolvable:
-playAgain 'no' loops alert 3 times, when pressing ENTER too fast on prompt
> (Possible reason) Might be run time error of variable not updating and running same lines again after update AKA LAG? 
> does not occur if 'no' clicked okay. 

*/

// let userArray, userName, isSolved, min, max, number, newPlayer; 

// TODO rename to currentGameInfo? 
let gameInfo = {
    numberToGuess: 0,
    playerUserName: '',
    currentResponse: 0,
    isNewPlayer: true,
    responsesArr: [],
    scoreBoard: ['tim', 3, 'bob', 5], // ['thiem',3] name, attempts
    attempts: 0,
    isVeteran: false
}

//TODO move scoreboard to be its own obj?

//TODO make below the gameBoard obj?
let min, max;
let numberOfCurrentPlays = 0;
let oldPlayerScore = 0;
let isSolved = false;
let isNewRecord = false;


function showScoreBoard(){
    let scoreStr = `The Scores are
    ---------------------------\n`;
    const board = gameInfo.scoreBoard;

    //when index is even, empty is 
    board.forEach((element, index, array) => {
        if(index %2 === 0){
            scoreStr += `${element}: ` //tim
        } else {
            scoreStr += `${element} \n` //3
        }
    })

    alert(scoreStr)
}


// startGame(); now based on button click
function startGame(){
    isSolved = false;
    isVeteran = false; //set in case of playing again without refresh
    
    gameInfo.playerUserName = prompt('What is your name?');

    //check response for null, empty, undefined, if so restartGame
    if(!gameInfo.playerUserName){
        alert(`gameInfo.playerUserName is not a valid name`);
        startGame()
    }

    isVeteran = priorPlayerCheck(gameInfo.scoreBoard, gameInfo.playerUserName)

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

    //still have lives, solved it
    if(gameInfo.attempts > 0){
        //currently unreachable
        alert('game has ended because you solved it')
    } else if(gameInfo.attempts === -1){
        alert('Game addiction ended, have you tried therapy?')
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


function validateUserResponse(gameObj){
    let num = gameObj.numberToGuess;
    let playerGuess = gameObj.currentResponse;
    let guesses = gameObj.responsesArr;
    let playerName = gameObj.playerUserName;

    isNewRecord = false; //set just to be sure, should remove redundancy later

    let strVictory = `Congrats you\'re correct! Your answer: ${playerGuess}. Secret Number: ${num}
    \n Here were all your guesses: ${guesses.join(', ')}
    \n` 
    
    //if solved, check for it



    if(num === playerGuess){
        isSolved = true
        isNewRecord = highScoreCheck(gameObj) //sets all strings and highscores to record upon victory
        strVictory += getScoreStr(guesses, isNewRecord, playerName)

        alert(strVictory)
        if(isNewRecord === true){
            recordNewScore(gameInfo.scoreBoard, gameInfo.playerUserName, guesses.length)
        }
        
    } else if(num > playerGuess){
        alert(`Sorry ${playerName}, Guess higher. try again: hint ${num}`)
    } else if(num < playerGuess){
        alert(`Sorry ${playerName}, Guess lower. try again: hint ${num}`)
    }

    return isSolved;
}

/*checks for highscore
if highscore, set highScore to true, sets scoreString message
returns nothing
*/
function highScoreCheck(gameObj){
    let guesses = gameObj.responsesArr;
    let scoreRangeDiff = oldPlayerScore;
    // let playerName = gameObj.playerUserName;
    isVeteran = priorPlayerCheck(gameInfo.scoreBoard, gameInfo.playerUserName)
    isNewRecord = false;


    //if they got it right, check if its a highscore
    if(isSolved){
        //general case, if any player has high score
        if(guesses.length < oldPlayerScore){
            isNewRecord = true;
        }
        //if current score is the same as the old score, not highscore, dont record
        else if(scoreRangeDiff === 0){
            isNewRecord = false;
        }
        //if newPlayer, then always a high score
        if(!isVeteran){
            isNewRecord = true;
        }
    }

    return isNewRecord;
}


//separated setScoreStr out of highScoreCheck bc possible conflicting scenarios
function getScoreStr(arr, isNewRecord, playerName){
    scoreStr = `Your score: ${arr.length}`
    let scoreRangeDiff = oldPlayerScore;
    
    //if player
    if(arr.length > oldPlayerScore ){
        scoreRangeDiff =  arr.length - oldPlayerScore;
    }

    if(isNewRecord){
        //scoreStr based on highscore
        if(arr.length < oldPlayerScore){
            scoreRangeDiff = oldPlayerScore - arr.length; 
            scoreStr = `You beat your previous attempt by ${scoreRangeDiff} fewer guesses`;
        } else if(scoreRangeDiff === 0){
            scoreStr = `You scored just as high as last time! ${oldPlayerScore}`;
        } else if(!isVeteran){
            scoreStr = `Your score ${arr.length}.\n Good job ${playerName}. The first win of many!`;
        } else{
            scoreStr = `Your score: ${arr.length}`;
        }
    }

    return scoreStr
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


function priorPlayerCheck(arr, playerName){
    if(arr.includes(playerName)){
        let score = loadPlayerStats(arr, playerName) //load player score if exist. this is redundant for debugging
        console.log(`${playerName} is in the list. Your past score was: ${score}`)
        return true
    } else{
        console.log(`${playerName} is not in the list`)
        return false
    }
}


function loadPlayerStats(arr, playerName){
    //check for player return score
    let scoreIndex = arr.indexOf(playerName)
    let priorScore = arr[scoreIndex+1];


    // priorScore = 5;
    return priorScore; 
}

// i am not checking for unique or highest score, because higher score will always call this function, and newScores adds to the beginning and includes searches for first match. Complexity not needed here yett.
function recordNewScore(arr, playerName, newScore){
    console.log('old scores array:', arr);

    arr.unshift(newScore)
    arr.unshift(playerName);


    console.log('new scores array:', arr);
    return arr;
}

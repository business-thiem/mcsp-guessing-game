 // Feature 5

/*TODO 
-1 make array take in strings and not just be NaN
-2 for loop to iterate over array to check for prior guesses - see function checkRepeatedNums()
-3 make a gameObj that has the methods for prompts and variables to hold values. DO NOT pollute global namespace
*/



// function checkUser(){
//     for (let i = 0; i < userArray.length; i++){
//    if (userArray[i] === userName)
// }

let gameObj = {
    user: {
        userArray: [],
        currentUserName: '',
        getUserName(){
            return prompt("What is your username?")
        }, 
    },
    state: {
        min: 1,
        max: 100,
        currentNumber: 0,
        getCurrentNumber: (min, max) => {
            return getBetween1and100(min, max)
        },
        isCorrect: false, 
        getUserResponse(){
            return parseInt(prompt("Guess a number between 1 & 100."))
        },
        userGuess: 0,
        userGuessesArr: []
    }
}

let userOne = gameObj.user
let gameState = gameObj.state


gameState.currentNumber = gameState.getCurrentNumber()
userOne['currentUserName'] = userOne.getUserName()
gameState['userGuess'] = gameState.getUserResponse()

userOne.userArray.push(gameObj.userName);

// console.log(gameObj)

let solved = gameState.isCorrect;

do{
    // console.log(gameObj)
    solved = checkResponse(userOne, gameState);
} while(!solved)



function getBetween1and100 (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  
//parameters need better names, 
function checkResponse(userCk, gameStateCk){
    let number = gameStateCk.currentNumber
    let userResponse = userCk.userGuess
    let guessArray = gameStateCk.userGuessesArr
    let userName = userCk.userName



    if (number === userResponse){
        alert(`Good job ${userName}. Your guess of ${userResponse} was correct. You made ${guessArray.length} guesses. \n  
        Your previous guesses were ${guessArray}`)
        gameState.isCorrect = true;
        return gameState.isCorrect;
    }
    else if (userResponse > number){
        alert(`Sorry ${userName}. Your guess was ${userResponse}. Guess lower!`)
    }
    else if (userResponse < number){
        alert(`Sorry ${userName}. Your guess was ${userResponse}. Guess higher!`)
    }
    else {
        alert (`What is wrong with you ${userName}!!! You are so wrong because your guess was not a number`)
    } 

    guessArray.push(userResponse)
    return gameState.isCorrect;
}

// function checkRepeatedNums(guessArray)



// console.log(guessArray) 
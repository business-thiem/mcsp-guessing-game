// Feature 6. working on 7

// function checkUser(){
//     for (let i = 0; i < userArray.length; i++){
//    if (userArray[i] === userName)
// }

// let number = Math.floor(Math.random() * 101)

// let user Obj = {}

let userArray, userName, isCorrect, min, max, number; 


startGame()
do{
    checkResponse();
} while(!isCorrect)


/*TODO 
-1 make array take in strings and not just be NaN
-2 for loop to iterate over array to check for prior guesses - see function checkRepeatedNums()
*/

function getBetween1and100 (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

function startGame(){
    userArray = []
    userName = prompt("What is your username?")
    userArray.push(userName);
    guessArray = []
    isCorrect = false;
    min = 1
    max = 3

    number = getBetween1and100(min, max)
    checkResponse()
}

function checkResponse(){
    let userResponse = parseInt(prompt("Guess a number between 1 & 3."))

    if (number === userResponse){
        alert(`Good job ${userName}. Your guess of ${userResponse} was correct. You made ${guessArray.length} guesses.`)
        alert(`Your previous guesses were ${guessArray}`)
        isCorrect = true;
        let playAgain = prompt(`Would you like to play again?. If yes, input 'yes'; if no input 'no'.` )
        if (playAgain === 'yes'){
            startGame()
            checkResponse();
            isCorrect = false;
            guessArray = [];
        }
        // else if (playAgain !== 'yes' || playAgain !== 'no'){
        //     alert(`There's no maybe. ${playAgain} is not a valid response dude.`)
        // }
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
}
// function checkRepeatedNums(guessArray)
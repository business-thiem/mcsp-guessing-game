// Feature 4

let isCorrect = false;

let min = 1
let max = 100
function getBetween1and100 (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

let number = getBetween1and100(min, max)
let guessArray = []



/*TODO 
-1 make array take in strings and not just be NaN
-2 for loop to iterate over array to check for prior guesses - see function checkRepeatedNums()
*/
function checkResponse(){
    let userResponse = parseInt(prompt("Guess a number between 1 & 100."))

    if (number === userResponse){
        alert(`Good job. Your guess of ${userResponse} was correct. You made ${guessArray.length} guesses.`)
        alert(`Your previous guesses were ${guessArray}`)
        isCorrect = true;
    }
    else if (userResponse > number){
        alert(`Your guess was ${userResponse}. Guess lower.`)
    }
    else if (userResponse < number){
        alert(`Your guess was ${userResponse}. Guess higher.`)
    }
    else {
        alert ('You are so wrong because your guess was not a number')
    } 

    guessArray.push(userResponse)
}

// function checkRepeatedNums(guessArray)


do{
    checkResponse();
} while(!isCorrect)

// console.log(guessArray)
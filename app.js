// Feature 2

let isCorrect = false;
let number = 50;


function checkResponse(){
    let userResponse = parseInt(prompt("Guess a number between 1 & 100."))

    if (number === userResponse){
        alert(`Good job. Your guess of ${userResponse} was correct.`)
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
}



do{
    checkResponse();
} while(!isCorrect)
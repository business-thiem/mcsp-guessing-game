const scores = {}; 

// play(); 

function play() {
    const secretNumber = Math.ceil(Math.random() * 100);
    const guest = prompt("Please enter your name");
    let guess = prompt("Please enter a guess");

    initializeGuest(guest);

    while (parseInt(guess) !== secretNumber) {
        giveHintAndAskAgain(guest, guess, secretNumber);
        guess = prompt("Please enter a guess");
        scores[guest].current.push(guess);
    }

    displayResultMessage(guest);
    resetScores(guest);
    playAgain();
}

function initializeGuest(guest) {
    if (!scores[guest]) {
        scores[guest] = {
            current: [],
            past: []
        };
    }
}

function giveHintAndAskAgain(guest, guess, secretNumber) {
    const hint = parseInt(guess) < secretNumber ? 'HIGHER' : 'LOWER';
    alert(`Sorry ${guest}, Guess ${hint}!`);
}

function displayResultMessage(guest) {
    if (scores[guest].past.length > 0) {
        compareWithPreviousGame(guest);
    } else {
        alert(`That's Correct ${guest}! This is your first time playing. Your score is ${scores[guest].current.length} guesses: ${scores[guest].current.join(', ')}.`);
    }
}

function compareWithPreviousGame(guest) {
    const previousGuessCount = scores[guest].past.length;
    const currentGuessCount = scores[guest].current.length;
    const difference = currentGuessCount - previousGuessCount;

    if (difference < 0) {
        alert(`That's Correct ${guest}! You beat your previous attempt by ${Math.abs(difference)} guesses.`);
    } else if (difference > 0) {
        alert(`That's Correct ${guest}! You did better in your last game by ${difference} guesses.`);
    } else {
        alert(`That's Correct ${guest}! You had the same number of guesses in your last game. This round you had these guesses: ${scores[guest].current.join(', ')}.`);
    }
}

function resetScores(guest) {
    scores[guest].past = [...scores[guest].current];
    scores[guest].current = [];
}

function playAgain() {
    const response = prompt('Do you want to play again? Yes / No');

    switch (response) {
        case "Yes":
            alert('Ok started a new game!');
            play();
            break;
        case "No":
            alert('Cool, I\'m sure you have better things to do');
            break;
        default:
            alert('Sorry I didn\'t recognize that command');
            playAgain();
    }
} 
 
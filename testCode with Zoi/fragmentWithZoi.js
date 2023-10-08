let highScoreArr = [
    'bob', 
    4,
    'rick',
    3,
    'jane',
    1,

];
let promptName = prompt(`What is your name?`);
let newPlayer = true;
let amountGuessed = [1,2];
let calculatedHigherScore = 0;
//amountGuessed.push(guess);

console.log(highScoreArr);

let resultStr = '';



function previousScore(arr, name) {
    if (arr.includes(name)) {
        let scoreIndex = arr.indexOf(name) + 1;
       return highScoreArr[scoreIndex];
    } else {
        return `Player does not exist`;
    }
    
}
/*
let output = previousScore(highScoreArr,'bob');
console.log(output);

let output2 = previousScore(highScoreArr, 'john');
console.log(output2);

if (output2 === 'Player does not exist') {
} else {
    newPlayer = false;
}
*/


console.log(previousScore(highScoreArr, promptName));
calculatedHigherScore = amountGuessed.length - previousScore(highScoreArr, promptName);
if (calculatedHigherScore < 0) {
    resultStr = `That’s Correct ${promptName}! And you beat your previous attempt by ${calculatedHigherScore} fewer guesses!`;

} else {
    resultStr = `That’s Correct ${promptName}! You beat your previous best.`
}
console.log(resultStr);
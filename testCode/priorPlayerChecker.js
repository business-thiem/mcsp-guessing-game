let scoreBoard = ['tim', 3, 'bob', 5]


function priorPlayerCheck(arr, name){
    // run some check with array.includes, but for now return true

    let score;

    if(arr.includes(name)){
        score = getPastPlayerScore(arr, name) //only get score if player exists in list
        return `${name} is in the list. Your past score was: ${score} `
    } else{
        return `${name} is not in the list`
    }
    // return true;
}

function getPastPlayerScore(arr, name){
    let scoreIndex = arr.indexOf(name)
    let score = arr[scoreIndex+1] 
    return score;
}

// i am not checking for unique or highest score, because higher score will always call this function, and newScores adds to the beginning and includes searches for first match. Complexity not needed here yett.
function recordNewScore(arr, name, newScore){
    console.log('old scores array:', arr);

    arr.unshift(newScore)
    arr.unshift(name);


    console.log('new scores array:', arr);
    return arr;
}


let name1 = 'bob'
let name2 = 'alice'

console.log(name1, priorPlayerCheck(scoreBoard, name1))
console.log(name2, priorPlayerCheck(scoreBoard, name2))

// record new playerscores test
let score1 = 10
console.log(name1, recordNewScore(scoreBoard, name1, score1))

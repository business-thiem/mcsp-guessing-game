

let arr = [1,2,3,4,5,6,7,8,9,10]

let arr2 = ['tim', 5, 'bob', 7, 'steven', 10]

function testReduce(arr){
    
    return arr.reduce((acc, val, idx) => 
        idx % 2 === 0 
            ? (acc ? `${acc} \n${val}` : `${val}`) 
            : `${acc}: ${val}`, '') 
// "1,2 3,4 5,6 7,8 9,10"

}


console.log(testReduce(arr2))

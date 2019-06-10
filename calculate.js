// General idea:
// function sortNumbers() which has three returns:
//      index[0] = array of all negative numbers and zeros entered by the user
//          count numbers smaller or equal to 0 and store and sort array (ascending order)
//          highest negative value will be array[0]
//          if there is a 0, pair smallest negative number with 0. Multiply the rest
//          if there is no 0, take smallest negative number as single element
//      index[1] = array of all positive numbers; number "1" excluded!
//          count numbers greater than 1 and store in array
//          if array length is an even number ==> amount of pos numbers is odd 
//          pair highest numbers and multiply, return result
//      index[2] = result of all number "1"s added up

let arrNumbers = [];
let inputNumbers = document.getElementById("numbers");
let calcButton = document.getElementById("calc");
let resultField = document.getElementById("result");
let splittedNumbers = [];
let negAndZeroNumbers = [];
let posNumbers = [];
let summarizedOnes;
let result = 0;

// when User clicks 'Calculate' button
calcButton.addEventListener('click', function(){
    // store numbers in array
    arrNumbers = inputNumbers.value.split(',');
    // console.log(arrNumbers);

    // call function sortNumbers ==> return values - see top of the file
    splittedNumbers = sortNumbers(arrNumbers);
    //store returns
    negAndZeroNumbers = splittedNumbers[0];
    posNumbers = splittedNumbers[1];
    summarizedOnes = splittedNumbers[2];
    // console.log(negAndZeroNumbers);
    // console.log(posNumbers);
    // console.log(summarizedOnes);

    // build result
    result = multiplyNumbers(negAndZeroNumbers) + multiplyNumbers(posNumbers) + summarizedOnes;

    // display result in result field 
    resultField.value = result;       
});

function sortNumbers(arr){
    let negNumbersAndZero = [];
    let posNumbersGreaterOne = [];
    let summarizedOnes = 0;
    
    arr.forEach(element => {
        if(element <= 0){
            negNumbersAndZero.push(Number(element));
        } else if (element > 1){
            posNumbersGreaterOne.push(Number(element));
        } else {
            summarizedOnes ++;
        }
    });

    return [negNumbersAndZero.sort(function(a, b){return a-b}),
            posNumbersGreaterOne.sort(function(a, b){return b-a}),
            summarizedOnes];
}

function multiplyNumbers(arr){
    let result = 0;
    //check if array has even amount of numbers
    if((arr.length % 2) === 0){
        for(i = 0; i < arr.length - 1; i+=2){
            result = result + (arr[i] * arr[i+1]);
        }
    } 
    // if odd amount of numbers and more than one number in array, multiply pairs 
    // and just add the last element to the product
    // if only one number in array then result equals that number
    else {
        if(arr.length > 1){
            for(i = 0; i < arr.length - 2; i+=2){
                result = result + (arr[i] * arr[i+1]);
            }
            result += arr[arr.length-1];
        } else {
            result = arr[0];
        } 
    }
    return result;
}
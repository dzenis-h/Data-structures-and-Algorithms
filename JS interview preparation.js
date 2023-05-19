// Reverse a String using built-in functions
function reverse(str) {
  return str.split("").reverse().join("");
}
// Reverse a String without the helpers above
function reversedOf(str) {
  let newStr = "";
  for (let char of str) {
    newStr = char + newStr;
    // 1st round: "h" + "" = h, 2nd round: "e" + "h" = "eh" ... etc.
    // console.log(newStr);
  }
  return newStr;
}

function sringReduce(str) {
  return str.split("").reduce((rev, char) => char + rev, "");
}

// Palindrome problem:
function palindrome(str) {
  return str === str.split("").reverse().join("");
  // return rev === str ? 'JEST' : 'NIJE';
}

// Reverse a number => 123 = 321, -15 = -51, 500 = 5
function revInt(num) {
  let val = num.toString().split("").reverse().join("");
  if (val.endsWith("-")) {
    val = "-" + val;
    return parseInt(val);
  }
  return parseInt(val);
}

// Way better soulution:
function reverseInt(n) {
  return parseInt(n.toString().split("").reverse().join("")) * Math.sign(n);
}

function repeated(str) {
  const count = {};
  str.split("").forEach((i) => {
    // Try adding 1 to char[i], if it's not possible (value it's falsy) then set it to 1.
    // An alternative would be: count[i] || 0) + 1; Meaning if it's falsy (null/ undefined) set it to 0 and then add 1 to it :)
    {
      count[i] = count[i] + 1 || 1;
    }
  });

  // Returning the most repeated Char => e.g. "a"
  return Object.keys(count).reduce((x, y) => {
    // 1st round: x = "a", y = "b", 2nd round x = "a", y = "c" ... etc.
    // So, on the 1st round: count[x] = theValueOfA => 3, count[y] = theValueOfB => 2
    // ... on the 2nd round: count[x] = theValueOfA => 3 (that stays the same with reduce), but count[y] = theValueOfC (this goes onto the next one)
    return count[x] > count[y]
      ? x
      : count[x] === count[y]
      ? "They are equal"
      : y;
  });
  // return Math.max(...Object.values(count)) // Number(value) of the most repeated char => 3
  // return count; // return the entire obj where key is the char, and the value is the num of it's occurrences => {a: 3, b: 1}
}

// Cleaner solution:
function charOf(str) {
  const char = {};

  //  for(let c of str) { // forOf example
  //    !char[c] ? char[c] = 1 : char[c]++
  //  }
  //    return char;
  // }

  // If there's no char[c] which initially would be the case then assign it a value of 1, on the second run, increment its value by 1
  str.split("").forEach((c) => (!char[c] ? (char[c] = 1) : char[c]++)); // kinda the same thing using forEach
  return char;
}

// Okay, another one, just for fun:

function repeatedIn(str) {
  const charObj = {};
  let bigNum = 0;
  let bigChar = "";

  // A mnemonic: 'o'f -> not 'o'bjects, 'i'n -> not 'i'terables :)

  for (let char of str) {
    !charObj[char] ? (charObj[char] = 1) : charObj[char]++;
  }

  for (let big in charObj) {
    if (charObj[big] > bigNum) {
      bigNum = charObj[big];
      bigChar = big;
    }
  }
  return { bigChar, bigNum };
}

// **********  Fibonacci sequence *************
// NOTE: This has extremly bad performance = > Exponential time complexity 2 ^n
function fib(n) {
  // This is where we would return the final result, what I mean is:
  // Every time this check fails the below code would be executed and 'stack' up until n=0.
  // Here we care about n being equal to 1 and the summed result of those function calls
  // would be what we return here. So, if n=5, we would return the summed value of:
  // 1+1+1+1+1+0+0+0+0+0
  if (n < 2) {
    return n;
  }
  // If n > 2, then we want to SUM the previous number with one before that (previous) number.
  // Next Fibonacci number = previous + one before previous. Translated to JS code:
  return fib(n - 1) + fib(n - 2);
}

// LET'S CREATE A MEMO FUNCTION (and use it on the recursive **fib** function from above):
function memo(fn) {
  // We want to pass in a function which is going to, eventually, use this utility function
  const cache = {};

  return function (...args) {
    // let's make it reusable, and by that I mean, let's assume that we don't know the number of arguments that will be eventually passed in
    if (cache[args]) {
      // if the already call this function with the same args, return them
      console.log("cached", args);
      return cache[args];
    }
    //    otherwise, we want to call our function (the one using this 'memo' function) and pass in the arguments w/ the help of 'apply'
    const res = fn.apply(this, args);
    cache[args] = res; // we want to store the result, so later if we'll be able to return that if the args don't change
    console.log("not cached", args);
    return res; // don't forget to return the result of it :)
  };
}

// Now, let's use the memoized function:
// NOTE: Remember the above function has to change in a way that it calls the memoized function instead of itself

function fastFib(n) {
  //   SAME LOGIC AS BEFORE
  if (n < 2) {
    return n;
  }
  // But, here is where the 'magic' happens
  // Very important: We want to call the instantiated 'fibMemo' function and NOT 'fastFib', cause then it wouldn't be so fast, right :)
  // return fibMemo(n-1) + fibMemo(n-2);
  return fibMemo(n - 1) + fibMemo(n - 2);
}

const fibMemo = memo(fastFib); // DO NOT CALL IT, JUST PASS IT IN

// console.log(fibMemo(6)); // HERE WE WANT TO PASS IN THE ARGUMENT

// console.log(fib(5))

// Let's see the result. We'll start at 0 and let's say that we want to increment n till it's 10
// for (let i = 0; i <= 10; i++) {
//   console.log(fib(i)); // for every increment, we want to call our function and pass the current value of 'i'
// }

// Same thing, but retrun the n-th entry in the series:
function fibNth(n) {
  const arr = [0, 1]; // the inital array, we need something to sum at the very beginning
  for (let i = 2; i <= n; i++) {
    // we want the last number, so don't forget the '=' sign
    let a = arr[i - 1]; // previous Number
    let b = arr[i - 2]; // The one before that
    arr.push(a + b); // push the result
  }
  return arr[n]; // or result.length - 1
}
// console.log(fibNth(4));

// FizzBuzz question:

(function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    // Using an understandable ternary expression:
    i % 3 === 0 && i % 5 === 0
      ? console.log(i, "FizzzBuzzz")
      : i % 3 === 0
      ? console.log(i, "Fizzz")
      : i % 5 == 0
      ? console.log(i, "Buzzz")
      : console.log(i);
    // if(i % 3 === 0 && i % 5 === 0) {
    //   console.log(i, "FizzzBuzz");
    // } else if (i % 3 === 0) {
    //   console.log(i, "Fizzz");
    // } else if (i % 5 == 0) {
    //   console.log(i, "Buzzz");
    // } else {
    //   console.log(i)
    // }
  }
});
// (15) // uncomment this line - IIFE (Immediately Invoked Function Expression)

// Array chunk problem:
function chunk(arr, size) {
  // size => 2
  return arr.reduce((resArr, curr, index) => {
    let chunkIndex = Math.floor(index / size); // 0 / 2 = 0; 1 / 2 = 0; 2 / 2 = 1; 3 / 2 = 1; 4 / 2 = 2; theEnd
    if (!resArr[chunkIndex]) {
      resArr[chunkIndex] = [];
    }
    resArr[chunkIndex].push(curr);
    return resArr;
  }, []);
}

function chunkSlice(arr, size) {
  const chunked = [];
  let index = 0;

  for (let chunk of arr) {
    // Because, each time we add the value of 'size' parameter to our index, we need to do this check
    if (index < arr.length) {
      // Here we want to take a portion of the 'arr' parameter using the slice() method and we can achieve that by passing in the current index and the "end" parameter which in our case would be (index + size)
      // E.G. [1,2,3,4,5] 1st round: index = 0; size = 2 ==> [1,2] *** 2nd round: index = 2; size = 2 ==> [3, 4] ... etc.
      // NOTE: arr.slice([begin[, end]]) ==> if begin is undefined, slice begins from index 0; end (Optional): Slice extracts up to but not including end.
      chunked.push(arr.slice(index, index + size)); //e.g. [1, 2, 3].slice(1, 2) => [2] ..it will skip the 1st index, but NOT include the lastOne => 3
      // after the 1st round the index will be moved by the chunkSize e.g. 2
      index += size;
    }
  }
  return chunked;
}

// ([1,2,3,4,5], 2) => [[1,2],[3,4],[5]]
function chunking(arr, size) {
  const chunked = [];
  let i = 0;

  for (let chunk of arr) {
    while (i < arr.length) {
      // if i is NOT less than the length of the passed in array, then we want to STOP.
      // 1st round: slice(0,2) => [[1,2]]; 2nd round: slice(2,4) => [3,4] => 3rd round: slice(4,6) => [5] (the remaining)
      chunked.push(arr.slice(i, i + size));
      i += size; // 1st round: i=0; 2nd round i=2; 3rd round: i=4 ...
    }
  }
  return chunked;
}

// Let's do the same,bu this time using map():
function chunkEd(arr, size) {
  const chunked = [];
  let index = 0;

  arr.map((x) => {
    // while index < the length of the original array, we got something to do
    if (index < arr.length) {
      chunked.push(arr.slice(index, index + size)); // <= and everytime we do it, we want to
      index += size;
    }
  });
  return chunked;
}

// Anagram problem 1:

// 1st let's create a helper function:
function charMap(str) {
  const char = {};

  let cleanStr = str.replace(/[^A-Za-z]/g, "").toLowerCase();

  for (let c of cleanStr) {
    !char[c] ? (char[c] = 1) : char[c]++;
  }
  return char;
}

// Moving onto the solution #1 where we'll be using the charMap() helper function
function anagram(str1, str2) {
  // Let's create our charMaps .. they''ll have the structure => {a: 2, b: 1, c: 3}
  const charA = charMap(str1);
  const charB = charMap(str2);

  if (Object.keys(charA).length !== Object.keys(charB).length) {
    // if they don't have the same length, then STOP here
    return "NOPE, It's not an anagram!";
  }

  //   arr.sort((a, b) => {
  //   return Object.values(a) - Object.values(b);
  //   });

  for (let char in charA) {
    if (charA[char] !== charB[char]) {
      return "No, it's NOT an anagram";
    }
  }
  return "Yup, you got an anagram";
}

// Let's use our brain this time :)
// *******************************
// Let's 1st create a helper function:
// NOTE: this could be a performance issue, but isn't realy here

function anagramHelper(str) {
  //   1st, let's remove everything that' NOT a letter and also make sure it's all lowercase
  // let cleanStr = str.replace(/[^A-Za-z]/g, "").toLowerCase();
  // 2nd, let's make an array out of it
  // const strArr = cleanStr.split('');
  // 3rd, let's sort it
  // const sorted = strArr.sort();
  // and finally, let's turn it back into a String agian and return it
  // return sorted.join();

  // One-liner *** NOTE: The order is VERY IMPORTANT
  return str
    .replace(/[^A-Za-z]/g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join();
}

function sortedAnagram(str1, str2) {
  const strOne = anagramHelper(str1);
  const strTwo = anagramHelper(str2);

  return strOne !== strTwo
    ? "NOPE, not an anagram"
    : "BRAVO. You have an anagram.";
}
// console.log(sortedAnagram('!aba', '#$%baa'));

// **************************************************

// 'hey there' => 'Hey There' ... simple as that
function capital(str) {
  // 1st let's make sure it's all lowercase
  const low = str.toLowerCase();
  const arr = low.split(" "); // This will make an array of individual words
  // SIDENOTE:
  // charAt(0) will give us the 1st letter of every word
  // substring(1) will terun everything that's remaining

  // ... and finally, We want to join the Array into a String and insert spaces between the elements(words)
  return arr.map((x) => x.charAt(0).toUpperCase() + x.substring(1)).join(" ");
}

// Let's do the same thing, but only using slice() :)

function slicedCase(str) {
  // const arr = str.split(' ');
  return str
    .split(" ")
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(" ");
}

// console.log('This is a demo using regex'.replace(/\b[a-zA-Z]/g, match => match.toUpperCase()));

// Let's do it, again, using a for loop:
function forCase(str) {
  //   Make the first char uppercase, regardless
  let result = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    // 'hey there' => if letter ('t') has a whitespace to the left then capitalize it,
    // but if the next letter doesn't ('h') don't do it, just add it on
    str[i - 1] === " " ? (result += str[i].toUpperCase()) : (result += str[i]);
  }
  return result;
}
// console.log(forCase('hey there'));

// **************************************

// steps(3) =>
// '# '
// '## '
// '###'

// Let's do a 2D using 2x for loop => (column, row)
function steps(num) {
  // let's say num = 3:
  //   1st: row=0; column=0, column=1, column=2 *** 2nd: row=1; column=0, column=1, column=2; 3rd: row=2; column=0, column=1, column=2;
  for (let row = 0; row < num; row++) {
    let res = "";

    for (let column = 0; column < num; column++) {
      if (column <= row) {
        res += "#";
      } else {
        res += " ";
      }
    }
    console.log(res);
  }
}
// steps(3);

// Let's try out a recursive function solution:
(function recursiveStairs(n, row = 0, stairs = "") {
  if (n === row) {
    return;
  }
  if (n === stairs.length) {
    console.log(stairs);
    return recursiveStairs(n, row + 1);
  }
  if (stairs.length <= row) {
    stairs += "#";
  } else {
    stairs += " ";
  }
  recursiveStairs(n, row, stairs);
});
// (3);
// function pyramid(n) {
//   for(let row=0; row < n; row++) {
//     let res = '';
//     const columnLength = (n * 2) - 1;
//     const middle = Math.floor(columnLength / 2);

//     for(let column=0; column < columnLength; column++) {
//       if(middle-row <=column && middle+row >= column) {
//         res += '#';
//       } else {
//         res += " ";
//       }
//     }
//     console.log(res);
//   }
// }
function pyramid2(n) {
  // e.g. n=3;
  const columnLength = n * 2 - 1; // 5
  let middle = Math.floor(columnLength / 2); // middle would be 2
  for (let row = 0; row < n; row++) {
    // let's create the rows (row = horizontal)
    let res = ""; // init our output inside of the 1st for loop
    for (let col = 0; col < columnLength; col++) {
      // creating the columns (column = vertical) ... this is the calc: (n * 2) - 1 => row=2;col=3;row=3;col=5;row=5;col=9
      // We got 2 sides, right? So, before we insert '#' we need to make sure the following logic is met:
      // Look at:  (middle - row <= col) as being the left side and  middle + row >= col as the right one. Only if both conditions are met, we want to insert the "#" sign
      if (middle - row <= col && middle + row >= col) {
        res += "#";
      } else {
        res += " ";
      } /*  "  #  "
            " ### "
            "#####"  */
    }
    console.log(res);
  }
}

function recursiveP(n, row = 0, res = "") {
  const columnLength = n * 2 - 1;
  let middle = Math.floor(columnLength / 2);
  // This is our EXIT condition, meainig, if have the n number of rows, our work is done!!
  if (n === row) {
    return;
  }
  //  *** Moving on ***
  //   Initially, this will be skipped, and we'll go to the next check and add the appropriate character,
  //   however, after we're finished w/ creating the 1st row we'll hit this check, we'll print the previously generated result,
  //   and call the function again, but this time incrementing the ROW value. This will countine until the 1st check is met
  if (res.length === columnLength) {
    console.log(res);
    return recursiveP(n, row + 1);
  }
  //   Here we're creating the columns and in each we're inserting the appropriate char
  //   Look at:  (middle - row) as being the left side and (middle + row) as the right one.
  if (middle - row <= res.length && middle + row >= res.length) {
    res += "#";
  } else {
    res += " ";
  }
  recursiveP(n, row, res);
}

// Count the number of vowels a, e, i, o, u
function vowels(str) {
  const chars = ["a", "e", "i", "o", "u"];
  let counter = 0;
  for (let s of str.toLowerCase()) {
    // Let's loop over the string and make sure it's all lowercase
    if (chars.includes(s)) {
      // if our array contains the currently iterated char, increment the counter by 1
      counter++;
    }
  }
  return counter;
}

function vowelsRegEx(str) {
  const matches = str.match(/[aeiou]/gi); // g -don't stop after 1st match; i -case insensetive
  return matches ? matches.length : 0; // if the values is truthy, return the length
}

// console.log(vowelsRegEx('aaciduu'));

//  **********************************************************

// SPRAL propblem:
function spiral(n) {
  const result = [];
  // It's kinda easier to first push the 'n' number of arrays into our initial array
  for (let v = 0; v < n; v++) {
    result.push([]);
  }

  // Let's create some vars
  let counter = 1;
  let startColumn = 0;
  let endColumn = n - 1;
  let startRow = 0;
  let endRow = n - 1;

  // We want to repeat this proccess until this condition is met
  while (startColumn <= endColumn && startRow <= endRow) {
    // 1st round: 0,2,0,2 // 2nd: 1,1,1,1 // 3rd: 2,0,2,0 <== This is where we STOP
    // 1. Top row => [[1,2,3]]
    for (let i = startColumn; i <= endColumn; i++) {
      // e.g. 1st round: n=3; endColumn=(3-1);
      // *** 2nd round: at this stage: startColumn=1; and after we finish w/ this loop we'll increment startRow=1; and w/ that we're done w/ the while loop
      result[startRow][i] = counter; // 1st round: result[0][0]; result[0][1]; result[0][2] => [1,2,3]
      counter++; // after it's finished, counter=3;
    }
    startRow++; // 1st round: We want to go to the next row, but same column *** 2nd round: after we do this again, we'll meet the while loop conditions

    // 2. Right column => [[4][5]]
    for (let j = startRow; j <= endRow; j++) {
      // startRow=1; endRow=2;
      result[j][endColumn] = counter; // result[1][2] **[1] => 2nd array; [2] => 3rd(last) element** // at this time result = [[1,2,3], [null,null,4], [null, null, 5]]
      counter++; // counter=6
    }
    endColumn--; // we need to go to the previous COLUMN

    // 3. Bottom row => [[6], [7]]
    for (let k = endColumn; k >= startColumn; k--) {
      // endColumn=1; startColumn=0; ** Go from here back to startColumn, hence flipped ">=" and "--"
      result[endRow][k] = counter; // result[2][1] **[2] => 3rd array; [1] => 2nd element** // at this time result = [[1,2,3], [null,null,4], [7, 6, 5]]
      counter++;
    }
    endRow--;

    // 4. Start column => [[8]]
    for (let z = endRow; z >= startRow; z--) {
      // endRow=1; startRow=1; ** Go to the row before a.k.a. above
      result[z][startColumn] = counter; // result[1][0] **[1] => 2nd array; [0] => 1st element** // result = [[1,2,3], [8,null,4], [7, 6, 5]]
      counter++;
    }
    startColumn++; // because we did this, (move right, visually) we'll go into our 1st loop and finish the task, check out the comment above (2nd round)
  }
  return result;
}

// function spiralX(n) {
//   const result = [];

//   for(let i=0; i<n; i++) {
//     result.push([]);
//   }

//   let startRow=0;
//   let startCol=0;
//   let endRow=n-1;
//   let endCol=n-1;
//   let counter=1;

//   while(startRow <= endRow && startCol <= endCol) {
// //   TOP:
//     for(let i = startCol; i <= endCol; i++) {
//       result[startRow][i] = counter;
//       counter++;
//     }
//     startRow++;
// //   RIGHT:
//      for(let i = startRow; i <= endRow; i++) {
//        result[i][endCol] = counter;
//        counter++;
//      }
//     endCol--;
// //   BOTTOM:
//      for(let i=endCol; i >=startCol; i--) {
//        result[endRow][i] = counter;
//        counter++;
//      }
//     endRow--;
// //   LEFT:
//     for(let i=endRow; i >= startRow; i--) {
//       result[i][startCol] = counter;
//       counter++;
//     }
//     startCol++;
//   }
//   return result;
// }
// console.log(spiralX(3));

// ***************************************************************

// Data structers: Stack & Queue

// 2x stack-queue problem *** The real deal

class Stack {
  // LIFO - Think of dishes: The last one to be washed and stacked will be used first :)
  constructor() {
    this.data = [];
  }

  push(record) {
    this.data.push(record);
  }

  pop() {
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }
}

// FIFO - Think of standing in line: The 1st person in line will get out of it first
class Queue {
  constructor() {
    this.stackOne = new Stack();
    this.stackTwo = new Stack();
  }

  add(data) {
    this.stackOne.push(data);
  }

  remove() {
    // Using a WHILE loop would be the best soulution
    // while (this.stackOne.peek()) {
    //   this.stackTwo.push(this.stackOne.pop());
    // }

    // When you pop an item off the array the length of the array decreases the next time around
    // so, to get around that, we need to store the value and use that as our stop condition,
    // before we stop popping :) NOTE: Go with a WHILE loop instead

    // This is another trick, we start at the end  and go to 0, so when we POP one, we go back by one place
    //   for (var i = this.stackOne.data.length - 1; i >= 0; i--) {
    for (let i = 0, len = this.stackOne.data.length - 1; i <= len; i++) {
      this.stackTwo.push(this.stackOne.data.pop());
    }

    let popped = this.stackTwo.pop();

    for (let i = 0, len = this.stackTwo.data.length - 1; i < len; i++) {
      this.stackOne.push(this.stackTwo.pop());
    }

    // while (this.stackTwo.peek()) {
    //   this.stackOne.push(this.stackTwo.pop());
    // }

    return popped;
  }

  peek() {
    while (this.stackOne.peek()) {
      this.stackTwo.push(this.stackOne.pop());
    }

    const record = this.stackTwo.peek();

    while (this.stackTwo.peek()) {
      this.stackOne.push(this.stackTwo.pop());
    }

    return record;
  }
}

// const q = new Queue();
// q.add(1);
// q.add(2);
// q.add(3);
// console.log("peek", q.peek()); // returns 1
// console.log(q.remove()); // returns 1
// console.log(q.remove()); // returns 2
// console.log(q.remove()); // returns 3

// ***********************************
// Let's create a STACK:
class StackX {
  constructor() {
    this.data = [];
  }
  push(record) {
    this.data.push(record);
  }
  pop() {
    return this.data.pop();
  }
  peek() {
    return this.data[this.data.length - 1];
  }
}
// const s1 = new StackX();
// s1.push(1);
// s1.push(2);
// console.log(s1.data); // [1,2]
// console.log(s1.pop()); // LIFO => 2

// The above code works as it supposed to, now let's create a Queue that uses to Stacks
class QueueX {
  constructor() {
    this.s1 = new StackX();
    this.s2 = new StackX();
  }

  add(record) {
    this.s1.push(record);
  }

  remove() {
    //  While s1 has elements, we want to remove the last one and push it to s2
    while (this.s1.peek()) {
      let popped = this.s1.pop();
      this.s2.push(popped);
    }
    //  Then we want to pop the last element out of s2 and return it ...
    //  NOTE: if we would return it here, then  the below code won't be executed, right? :)
    let removed = this.s2.pop();
    // but not before we move the remaining el back from s2 to s1
    while (this.s2.peek()) {
      this.s1.push(this.s2.pop()); // cause we already popped the last EL, it won't be included here
    }
    return removed; // Now, we want to return it
  }
  peek() {
    //  We want to do the same stupid thing we did in our 'remove' method,
    //  the only (IMPORTANT) diff is we want to peek and not remove the last EL from s2 .. after we move them from s1, that is :)
    while (this.s1.peek()) {
      this.s2.push(this.s1.pop());
    }
    //    NOW, WE WANT TO PEEK() THE LAST ELEMENT
    const el = this.s2.peek(); // this is just going to return us the last element without removing it from the s1 stack (array)
    //    move them back
    while (this.s2.peek()) {
      this.s1.push(this.s2.pop());
    }
    return el;
  }
}
// REMEMBER: It's FIFO
// const q = new QueueX();

// q.add(1);
// q.add(2);
// console.log(q.s1.data);
// console.log(q.remove()); // 1
// console.log(q.remove()); // 2

// Let's create a Queue by itself :)
class QueueY {
  constructor() {
    this.data = [];
  }

  add(data) {
    this.data.push(data);
  }

  remove() {
    //  shift() method will remove the 1st element from an array and return it // opposite to pop()
    return this.data.shift();
  }
  //  we want the first element
  peek() {
    return this.data[0];
  }
}

// const xo = new QueueY();
// xo.add(1)
// xo.add(2)
// console.log(xo.data) // [1,2]
// console.log(xo.remove()) // FIFO => 1

// ***************************************
// LINKED LIST:
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class List {
  constructor() {
    this.head = null;
  }
  insertFirst(data) {
    // like the name of this method suggests, every time we create a new node it'll be assinged to the head, and the previos head will be the next node in the chain
    this.head = new Node(data, this.head);
  }
  size() {
    let counter = 0;
    let node = this.head; // if we have a head prop that means we at least have one next, so the while loop will run once
    while (node) {
      counter++;
      node = node.next; // next time 'node' will be equal to the 'next' prop; while we have it the counter will increment
    }
    return counter;
  }
  getFirst() {
    return this.head; // this will laways be the 1st node in the chain
  }
  getLast() {
    if (!this.head) {
      return null;
    }
    let node = this.head;
    let last = null;
    while (node) {
      last = node;
      node = node.next;
    }
    return last;
    // let node = this.head;
    // while(node) {
    //   if(!node.next) {return node}
    //   node = node.next;
    // }
    // return node;
  }
  clear() {
    this.head = null; // if we clear the head, all references are gone
  }
  //   The first node in a linked list is pointed by the head pointer.
  // To perform a delete operation at the beginning of the list, we will have to make the next node to the head node as the new head.
  removeFirst() {
    if (!this.head) {
      return;
    } // make sure we have something to remove
    // first one will be replaced by the next one in the chain and that one will still have the reference to the next one -- No need for any loops
    this.head = this.head.next;
    return;
  }
  // To remove the last node from the list, we will first have to traverse the list to find the last node
  // and at the same time maintain an extra pointer to point at the node before the last node.
  // To delete the last node, we will then set the next pointer of the node before the last node to null.
  removeLast() {
    if (!this.head) {
      return;
    }
    if (!this.head.next) {
      this.head = null;
      return;
    } // if there's no 2nd node, then the last element is the head

    let prevNode = this.head; // we'll start here
    let nextNode = this.head.next; // and go to the next one
    while (nextNode.next) {
      // while the there's a 'next' prop
      prevNode = nextNode; // set the prev node to the next one
      nextNode = nextNode.next; // we need this too so we can continue our loop til the very end
    } // after we're done with the loop, the 'prevNode' is going to point at the second-to-last item in our chain -> The one before the'tail'
    prevNode.next = null; // so, now we want to remove the ref to the tail and we're done
  }
  insertLast(data) {
    let last = this.getLast(); // easy way to get the last element
    //     Logic: If there is a last element, then set its 'next' prop to the newly created node, otherwise, the list is empty, so set the head to it
    last ? (last.next = new Node(data)) : (this.head = new Node(data));
  }
  getAt(index) {
    let node = this.head;
    let counter = 0;
    // we'll start with head(0), if the entered index is 0, we'll return head, otherwise, we'll set head to the next one in the chain
    //  and also increment counter until its, eventually, equal to the index, and when that happens we'll return that node.
    // if the index is bigger then the elemets length, then we return null
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null; // if the entered index is undefiend
  }
  removeAt(index) {
    if (!this.head) {
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
    } // if we only have one element head=null, otherwise, head = next element in the chain
    let prevNode = this.getAt(index - 1);
    if (!prevNode || prevNode.next) {
      return;
    }
    // imagine we have a, b, c ... we want to skip the one in the middle, and this is how we would do that :)
    // so the 'next' prop of "a" is gonna point to the value after 'prevNode.next' and that can be found on its 'next' prop
    prevNode.next = prevNode.next.next;
  }
  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
    }
    if (index === 0) {
      this.head = new Node(data, this.head);
    }
    let prevNode = this.getAt(index - 1) || this.getLast();
    if (!prevNode) {
      return;
    }
    let node = new Node(data, prevNode.next);
    prevNode.next = node;
  }
}
// Practice: LinkedList
class LL {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    this.head = new Node(data, this.head);
  }

  size() {
    let counter = 0;
    let node = this.head;

    while (node) {
      counter++;
      node = node.next;
    }

    return counter;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) {
      return null;
    }

    let node = this.head;
    while (node) {
      if (!node.next) {
        return node;
      }
      node = node.next;
    }
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
  }

  removeLast() {
    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let previous = this.head;
    let node = this.head.next;
    while (node.next) {
      previous = node;
      node = node.next;
    }
    previous.next = null;
  }

  insertLast(data) {
    const last = this.getLast();

    if (last) {
      // There are some existing nodes in our chain
      last.next = new Node(data);
    } else {
      // The chain is empty!
      this.head = new Node(data);
    }
  }

  getAt(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }

      counter++;
      node = node.next;
    }
    return null;
  }

  removeAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    const previous = this.getAt(index - 1);
    if (!previous || !previous.next) {
      return;
    }
    previous.next = previous.next.next;
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    const previous = this.getAt(index - 1) || this.getLast();
    const node = new Node(data, previous.next);
    previous.next = node;
  }
  // By doing this we're making this Linked List iterable by using a 'for of' loop
  *[Symbol.iterator]() {
    let node = this.head;
    while (node) {
      yield node;
      node = node.next;
    }
  }
}

// Return the 'middle' node of a linked list.
// If the list has an even number of elements, return
// the node at the end of the first half of the list.
// *Do not* use a counter variable, *do not* retrieve
// the size of the list, and only iterate
// through the list one time.
// --- Example
//   const l = new LinkedList();
//   l.insertLast('a')
//   l.insertLast('b')
//   l.insertLast('c')
//   midpoint(l); // returns { data: 'b' }
function midpoint(l) {
  let slow = l.head;
  let fast = l.head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.data;
}

// const l = new LL();
// l.insertLast('a')
// l.insertLast('b')
// l.insertLast('c')
// console.log(midpoint(l)); // returns { data: 'b' }

// for(let val of list) {
//   console.log(val)
// }

// **************************************************
// Circular problem:
/* // --- Directions
// Given a linked list, return true if the list
// is circular, false if it is not.
// --- Examples
//   const l = new List();
//   const a = new Node('a');
//   const b = new Node('b');
//   const c = new Node('c');
//   l.head = a;
//   a.next = b;
//   b.next = c;
//   c.next = b;
//   circular(l) // true */

function circular(list) {
  let slow = list.getFirst(); // same as: list.head
  let fast = list.getFirst();
  // The trick is: we want to advance "slow" by 1 place, and "fast" by two places
  // If "fast" ever hist 'null' that means the list is NOT circular,
  // However, if we hit the case where "slow" and "fast" are pointing at same object in memory, that means "fast" went back in the chain => circular linked list
  while (fast.next && fast.next.next) {
    slow = slow.next; // we want to advance by once node
    fast = fast.next.next; // we want to advance by two nodes
    if (slow === fast) {
      return true;
    }
  }
  return false;
}

// --- Directions
// Given a linked list, return the element n spaces
// from the last node in the list.  Do not call the 'size'
// method of the linked list. Assume that n will always
// be less than the length of the list.
// --- Examples
//    const list = new List();
//    list.insertLast('a');
//    list.insertLast('b');
//    list.insertLast('c');
//    list.insertLast('d');
//    fromLast(list, 2).data // 'b'

function fromLast(l, n) {
  let slow = l.head;
  let fast = l.head;
  //   We want to advance fast by n number of places
  while (n > 0) {
    fast = fast.next;
    n--;
  }
  //   After n = 0; we want to move on until we reach the end, but this time one place at a time
  //   When we reach the end of our list, slow would be at the position list.length - n
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}

// PRACTICE:
function midP(l) {
  let s = l.head;
  let f = l.head;
  while (f.next && f.next.next) {
    s = s.next;
    f = f.next.next;
  }
  return s.data;
}

function circularL(l) {
  let s = l.head;
  let f = l.head;
  while (f.next && f.next.next) {
    s = s.next;
    f = f.next.next;
    if (s === f) {
      return "Yes, LinkedList is circular";
    }
    return "No, the list is NOT circular";
  }
}

function fromBack(l, n) {
  let s = l.head;
  let f = l.head;
  while (n > 0) {
    f = f.next;
    n--;
  }
  while (f.next) {
    s = s.next;
    f = f.next;
  }
  return s;
}

// **************************************
// Trees data structure:
class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
  add(data) {
    this.children.push(new TreeNode(data));
  }
  remove(data) {
    this.children = this.children.filter((node) => node.data !== data);
  }
}

/*  A
   / \
  B   C
 /   / \
D   E   F
A depth first traversal would visit the nodes in this order

A, B, D, C, E, F
Notice that you go all the way down one leg before moving on.

A breadth first traversal would visit the node in this order

A, B, C, D, E, F
Here we work all the way across each level before going down. */

class Tree {
  constructor() {
    this.root = null;
  }

  // BREADTH-FIRST traversal
  traverseBF(fn) {
    // const t = new Tree()  .... t.traverseBF(node => console.log(node.data));
    const arr = [this.root]; // we'll start at the top of the tree (top-level parent) by creting a new array with only ther 'root' in it
    while (arr.length) {
      // as long as we have elements which have children, this will be equal to true
      let node = arr.shift(); // we want to take out the first element, not make a ref, literally remove it
      // this could've been done using a for loop, but this is more elegant. It means, takeout every child element and push it onto the end of the array
      arr.push(...node.children);
      fn(node); // finally, call the function using the extracted 'node' and we'll repeat this process until there are no more child nodes
    }
  }

  // DEPTH-FIRST traversal
  traverseDF(fn) {
    // const t = new Tree()  .... t.traverseDF(node => console.log(node.data));
    const arr = [this.root]; // start with the ROOT node
    while (arr.length) {
      // as long as we have elements which have children, this will be equal to true
      let node = arr.shift(); // we want to take out the first element, not make a ref, literally remove it
      // *** HERE'S THE BIG DIFFERENCE ***
      arr.unshift(...node.children); // instead of 'pushing' it onto the end of the array, we want to insert it at the beginning
      fn(node); //
    }
  }
}
// ************************
// Practice:
// ************************
class NodeT {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
  add(data) {
    this.children.push(new NodeT(data));
  }
  remove(data) {
    this.children = this.children.filter((node) => node.data !== data);
  }
}

class BigTree {
  constructor() {
    this.root = null;
  }
  traverseBF(fn) {
    const arr = [this.root];
    while (arr.length) {
      let node = arr.shift();
      arr.push(...node.children);
      fn(node);
    }
  }
  traverseDF(fn) {
    const arr = [this.root];
    while (arr.length) {
      let node = arr.shift();
      arr.unshift(...node.children);
      fn(node);
    }
  }
}

// const bf = [];
// const df = [];
// const t = new BigTree();
// t.root = new NodeT('a');
// t.root.add('b');
// t.root.add('c');
// t.root.children[0].add('d');
// t.traverseBF(node => bf.push(node.data));
// t.traverseDF(node => df.push(node.data));
// console.log(bf); // ['a', 'b', 'c', 'd'];
// console.log(df); // ['a', 'b', 'd', 'c'];

// Practicing breadth-first traversal:
class NodeBF {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
  add(data) {
    this.children.push(new NodeBF(data));
  }
}

function levelWidth(root) {
  const tempArr = [root, "stop"];
  const countArr = [0]; // we have to assume that we have at least one element (root)

  while (tempArr.length > 1) {
    // if we have something else then "stop"
    let node = tempArr.shift(); // take out the 1st element
    if (node === "stop") {
      // if the 1st el === 'stop'
      countArr.push(0); // that means we're done w/ this level and we're moving on to the next one
      tempArr.push("stop"); // the 'stop' from the beginning has been removed, but now we want to push back to the end of our array, again
    } else {
      // otherwise, we have more elements on that level, so we want to push them onto our array, and also increment the previously pushed '0'
      tempArr.push(...node.children); // same as always
      //  NOTE: We could also use a forOf loop here, but the above code is mush cleaner
      // for(let n of node.children) {
      //   temp.push(n)
      // }
      countArr[countArr.length - 1]++; // and this is how we would increment the last number in our array
    }
  }
  return countArr;
}

function levelW(root) {
  const arr = [root, "s"];
  const count = [0];
  while (arr.length > 1) {
    let node = arr.shift();
    if (node === "s") {
      count.push(0);
      arr.push("s");
    } else {
      arr.push(...node.children);
      count[count.length - 1]++;
    }
  }
  return count;
}

// const root = new NodeBF(0);
// root.add(1);
// root.add(2);
// root.add(3);
// root.children[0].add(4);
// root.children[2].add(5);
// console.log(levelW(root));
// expect(levelWidth(root)).toEqual([1, 3, 2]);

// ********************** Binary Search Tree ******************************

// --- Directions
// 1) Implement the Node class to create
// a binary search tree.  The constructor
// should initialize values 'data', 'left',
// and 'right'.
// 2) Implement the 'insert' method for the
// Node class.  Insert should accept an argument
// 'data', then create an insert a new node
// at the appropriate location in the tree.
// 3) Implement the 'contains' method for the Node
// class.  Contains should accept a 'data' argument
// and return the Node in the tree with the same value.
// If the value isn't in the tree return null.

class BSTNode {
  constructor(data) {
    this.data = data;
    this.left = null; // left smaller then top level node
    this.right = null; // right would be greater the top level node
  }
  insert(data) {
    // if it's less then the root node and something is already assigned to the 'left' node, then we want to pass it to that node, recursively
    if (data < this.data && this.left) {
      this.left.insert(data);
      // if it's less then root node and its 'left' node is null, we want to create a new Node w/ the value of data and insert it there
    } else if (data < this.data) {
      this.left = new BSTNode(data);
    } else if (data > this.data && this.right) {
      // same as above, just for the right (greater) side :)
      this.right.insert(data);
    } else if (data > this.data) {
      this.right = new BSTNode(data);
    }
  }
  contains(data) {
    if (data === this.data) {
      return this;
    }
    if (this.data < data && this.right) {
      return this.right.contains(data);
    } else if (this.data > data && this.left) {
      return this.left.contains(data);
    }
    return null;
  }
}

// const node = new BSTNode(10);
// node.insert(11);
// node.insert(5);
// node.insert(15);
// node.insert(17);

// **** The inserting works correctly ****
// console.log(node.left.data); // (5);
// console.log(node.right.data); //(15);
// console.log(node.right.right.data); // (17);

// **** Let's check out if the contains method is working ****
// console.log(node.contains(5)); // {data: 5, left: null, right: null}
// console.log(node.contains(50)); // null

// ****************** PRACTICE *********************

class TN {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
  add(data) {
    this.children.push(new TN(data));
  }
}

function lw(root) {
  const temp = [root, "stop"];
  const count = [0];
  while (temp.length > 1) {
    let node = temp.shift();
    if (node === "stop") {
      temp.push("stop");
      count.push(0);
    } else {
      temp.push(...node.children);
      // for(let n of node.children) {
      //   temp.push(n)
      // }
      count[count.length - 1]++;
    }
  }
  return count;
}

// AGAIN: Let's make a Node constructor, a Tree that makes use of it, and function or two which would make os of the that Tree data structure :)

class Node2 {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
  add(data) {
    this.children.push(new Node2(data));
  }
  remove(data) {
    this.children = this.children.filter((node) => node.data !== data);
  }
}

class TreeTwo {
  constructor() {
    this.root = null;
  }
  traverseBF(fn) {
    const temp = [];
    while (temp.length) {
      let node = temp.shift();
      temp.push(...node.children);
      fn(node);
    }
  }
  traverseDF(fn) {
    const temp = [];
    while (temp.length) {
      let node = temp.shift();
      temp.unshift(...node.children);
      fn(node);
    }
  }
}

function levelIt(root) {
  const temp = [root, "stop"];
  const counter = [0];
  while (temp.length > 1) {
    let node = temp.shift();
    if (node === "stop") {
      temp.push("stop");
      counter.push(0);
    } else {
      temp.push(...node.children);
      counter[counter.length - 1]++;
    }
  }
  return counter;
}

// const root = new NodeBF(0);
// root.add(1);
// root.add(2);
// root.add(3);
// root.children[0].add(4);
// root.children[2].add(5);
// console.log(lw(root));
// expect(levelWidth(root)).toEqual([1, 3, 2]);

// Binary Search Tree practice:

class BinaryTree {
  constructor(key) {
    this.key = key;
    this.left = null; // smaller then
    this.right = null; // greater then
  }
  insert(data) {
    if (data < this.data && this.left) {
      this.left.insert(data);
    } else if (data < this.data) {
      this.left = new BinaryTree(data);
    } else if (data > this.data && this.right) {
      this.right.insert(data);
    } else if (data > this.data) {
      this.right = new BinaryTree(data);
    }
  }
  contains(data) {
    if (this.data === data) {
      return this; // the entire node
    }
    //     Let's move down the tree
    // if it's larger then the current node and something is already at its right, we want to pass the function to that 'right' element and countinue from there
    if (data > this.data && this.right) {
      return this.right.contains(data);
    } else if (data < this.data && this.left) {
      return this.left.contains(data);
    }
    return null; // if 'data' can't be found in this Tree
  }
}

// Again:
class BST2 {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  insert(data) {
    if (data < this.data && this.left) {
      this.left.insert(data);
    } else if (data < this.data) {
      this.left = new BST2(data);
    } else if (data > this.data && this.right) {
      this.right.insert(data);
    } else if (data > this.data) {
      this.right = new BST2(data);
    }
  }
  contains(data) {
    if (data > this.data && this.right) {
      return this.right.contains(data);
    } else if (data < this.data && this.left) {
      return this.left.contains(data);
    }
    return null;
  }
}

// Again :/
class NodeX {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST3 {
  constructor() {
    this.root = null;
  }
  add(data) {
    let node = this.root;
    if (node === null) {
      this.root = new NodeX(data);
      return;
    }
    const search = function (node) {
      if (data < node.data && !node.left) {
        node.left = new NodeX(data);
      } else if (data < node.data && node.left) {
        return search(node.left);
      } else if (data > node.data && !node.right) {
        node.right = new NodeX(data);
      } else if (data > node.data && node.right) {
        return search(node.right);
      } else {
        return null;
      }
    };
    return search(node);
  }
}

// const t = new BST3();
// t.add(1);
// t.add(-1);
// t.add(2);

// console.log(t.root.data); // 1
// console.log(t.root.left.data); // -1
// console.log(t.root.right.data); // 2

// *********************************************************
//  ************ Validate a Binary Search Tree *************

// first method - recursion
// recurse through, call validate(node, min, max)

// set max to value of root node
// move left and compare value of root.left to value of root
// once we compare we move left or right
// and reset max each time
// when we move left we update the max value
// when we move right we update the min value
class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let one = new BinarySearchTree(1);
let two = new BinarySearchTree(2);
let three = new BinarySearchTree(3);
let four = new BinarySearchTree(4);
let five = new BinarySearchTree(5);
let six = new BinarySearchTree(6);
let seven = new BinarySearchTree(7);

four.left = two;
four.right = six;

two.left = one;
two.right = three;

six.left = five;
six.right = seven;

const validate = (node, min = null, max = null) => {
  if (max !== null && node.value > max) {
    return false;
  }
  if (min !== null && node.value < min) {
    return false;
  }
  // if node.left exists and calling validate with node.left, min, and the value of the current node returns false then something went wrong and we return false
  if (node.left && !validate(node.left, min, node.value)) {
    return false;
  }
  if (node.right && !validate(node.right, node.value, max)) {
    return false;
  }

  return true;
};
// validate(six);

// NOTE: Every element on the left side should be less than the root node,
//       and every element to the right should be greater the the root node.

function validateTree(node, min = null, max = null) {
  //   Note: The 1st 2 checks are only for the first two (left, right) nodes
  //   if we previously set the 'min' value, but it's greater than root, something is wrong
  if (min !== null && node.data < min) {
    return false;
  }
  //   Same as above, but for the opposite side
  if (max !== null && node.data > max) {
    return false;
  }
  //   Here's where the actual magic happens, it's called recursion :)

  //  If we have something on the left (less) side
  //  MAXIMUM allowed value = root value
  //  Now, node parameter is going to be the left value
  if (node.left && !validateTree(node.left, min, node.data)) {
    return false;
  }
  //   If we have something on the right (bigger) side
  //   MINIMUM allowed value = root value
  //   Now, node parameter is going to be the left value

  if (node.right && !validateTree(node.right, node.data, max)) {
    return false;
  }
  return true; // if we make till here, it's all good
}

// JS EVENTS:
// --- Directions
// Create an 'eventing' library out of the
// Events class.  The Events class should
// have methods 'on', 'trigger', and 'off'.

class Events {
  constructor() {
    //     This obj is gonna contain one or many arrays
    //     {click: [cb1,cb2,cb3], focus: [cb1,cb2] ....}
    this.events = {};
  }
  // Register an event handler
  on(eventName, callback) {
    // if we already registered event with this name, we just want to push the new CB into that array
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      // otherwise, we want to initialize a new array on that key and assign the CB to it
      this.events[eventName] = [callback];
    }
  }

  // Trigger all callbacks associated
  // with a given eventName
  trigger(eventName) {
    if (this.events[eventName]) {
      for (let event of this.events[eventName]) {
        event();
      }
    }
  }

  // Remove all event handlers associated
  // with the given eventName
  off(eventName) {
    if (this.events[eventName]) {
      delete this.events[eventName];
    }
  }
}

// **************** SORTING ********************
// BubbelSort:
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // ES6 way:
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // Using a temp variable
        // const lesser = arr[j+1];
        // arr[j+1] = arr[j];
        // arr[j] = lesser;
      }
    }
  }
  return arr;
}
// console.log(bubbleSort([1,5,-3,11,6]));

// SelectionSort:
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    //     we're gonna assume that the 1st element is the lowest
    //     and create a reference to its index
    let indexOfMin = i;
    //     we want to start the 2nd loop from the next element in the array (i+1)
    for (let j = i + 1; j < arr.length; j++) {
      //       we want to check if the next element is lower then the one previously assumed?
      if (arr[j] < arr[indexOfMin]) {
        indexOfMin = j;
      }
      //       now we want to check if the index of the previously assumed min values is equal to the current 'i'
      //       if not then we want to swap them
      if (indexOfMin !== i) {
        [arr[indexOfMin], arr[i]] = [arr[i], arr[indexOfMin]];
      }
    }
  }
  return arr;
}

// Practice:
function bs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function ss(arr) {
  for (let i = 0; i < arr.length; i++) {
    let indexOfMin = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[indexOfMin]) {
        indexOfMin = j;
      }
      if (indexOfMin !== i) {
        [arr[indexOfMin], arr[i]] = [arr[i], arr[indexOfMin]];
      }
    }
  }
  return arr;
}
// console.log(bs([4,3,55,1,-2]));

// ****** MergeSort ******
function merge(left, right) {
  // 2 arrays
  const res = [];
  // as long as they both have length
  while (left.length && right.length) {
    // we want to check every element, at the same index, for the lesser value
    if (left[0] < right[0]) {
      //  and take it out of the array containing that lesser value and push it onto the 'result' array
      res.push(left.shift());
    } else {
      res.push(right.shift());
    }
  }
  //   after the while loop stops, we want to append the remaining elements into a new array and return it
  //   the order of 'left' and 'right' is NOT important, because one of them is going to be empty anyways
  return [...res, ...left, ...right];
}

function mergeSort(arr) {
  //   we'll be dividing our array into 2 parts until we hit this check
  if (arr.length === 1) {
    return arr;
  }
  // ['a', 'b', 'c', 'd'] => center = index 2 => 'c'
  const center = Math.floor(arr.length / 2);
  //   slice will NOT include 'center' => ['a', 'b']
  const left = arr.slice(0, center);
  //   here we're saying, give me the rest, starting from index of 'center' => ['c', 'd']
  const right = arr.slice(center);
  //   the 'merge' takes in two arrays, so we want to recursively call the 'merge' function
  // and pass in the results of this function with the value of 'left' and value of 'right'
  return merge(mergeSort(left), mergeSort(right));
}

function mergeIt(left, right) {
  const res = [];
  while (left.length && right.length) {
    left[0] < right[0] ? res.push(left.shift()) : res.push(right.shift());
  }
  return [...res, ...left, ...right];
}

function sortedMerge(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const center = Math.floor(arr.length / 2);
  const left = arr.slice(0, center);
  const right = arr.slice(center);

  return mergeIt(sortedMerge(left), sortedMerge(right));
}

// console.log(sortedMerge([1,-1,5,4,6]));

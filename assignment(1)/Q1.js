// -------------------------------------------------------------------------------------------------------------------
// 1. Convert the string "123" to a number and add 7. (0.5 Grade)
// • Output Example: 130
// -------------------------------------------------------------------------------------------------------------------
// in this case i have 3 ways

//################# first way ######################
// by Using Number constructor

// function convertStringToNumber(str) {
// return Number(str)
// }
// console.log(convertStringToNumber("123") + 7);

//################# Second way #####################
// by Using  unary plus +

// function convertStringToNumber(str) {
//   return +str;
// }
// console.log(convertStringToNumber("123") + 7);
/*$$$$$$$$$$$$$$$$$$$$$$$$ Best Use Cases $$$$$$$$$$$$$$$$$$$$$$$$
1- when i have a float String and i need to convert it to numbers with out lost any thing like this "12.387" 
2- if you have a true and false values and need to convert it to 1 and 0 
3- if you have a an empty value or null and need to convert it to 0 like "" or null 
*/
//################# Third way #####################
// by Using parseInt Function

// function convertStringToNumber(str) {
//   return parseInt(str);
// }
// console.log(convertStringToNumber(123) + 7);

/*$$$$$$$$$$$$$$$$$$$$$$$Best Use Cases $$$$$$$$$$$$$$$$$$$$$$$$
if you have a float string and you need to return it integer
if you have a Characters in the string and you need to get on the only numbers like {"25px ", "50 pieces"}
if you have another radix like binary (1111011) and you have to convert it to hex number =>  parseInt("1111011",2) -> 123
*/

// -------------------------------------------------------------------------------------------------------------------
// 2. Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
// • Input Example: 0
// • Output Example: "Invalid"
// -------------------------------------------------------------------------------------------------------------------

// function checkFalsyValue(val) {
//   return !Boolean(val) ? "Invalid" : "valid";
// }
// console.log(checkFalsyValue(0));

//--------------------------------------------------------------------------------------------------------------------
// 3. Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
// • Output Example:1, 3, 5, 7, 9
//--------------------------------------------------------------------------------------------------------------------

// for (let i = 0; i < 10; i++) {
//   if (i % 2 === 0) continue;
//   console.log(i);
// }

//--------------------------------------------------------------------------------------------------------------------
// 4. Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
// • Input Example: [1, 2, 3, 4, 5]
// • Output Example: [2,4]
//--------------------------------------------------------------------------------------------------------------------

// const arr = [1, 2, 3, 4, 5];
// const newArr = arr.filter((item) => {
//   //if I need the even numbers I have to do like this
//   return item % 2 === 0;
//   // if I need only this values [2,4] in this case I have to do like this
//   // return item === 2 || item === 4;
// });
// console.log(newArr);

//--------------------------------------------------------------------------------------------------------------------
//   Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
// • Input Example: [1, 2, 3], [4, 5, 6]
// • Output Example: [1, 2, 3, 4, 5, 6]
//--------------------------------------------------------------------------------------------------------------------

// $$$$$$$$$$$$$$$$$$$ this way if i don't sure if the input will be only arrays or not $$$$$$$$$$$$$$$$$$$

// function concatArrays(...values) {
//   let result = [];
//   values.map((val) => {
//     result = [...result, ...(Array.isArray(val) ? val : [val])];
//   });
//   return result;
// }
// console.log(concatArrays([1, 2, 3], 3.5, [4, 5, 6]));

// $$$$$$$$$$$$$$$$$$$$ if I sure of the input will be arrays i can do like this $$$$$$$$$$$$$$$$$$$$

// function concatArrays(...arrays) {
//   let result = [];
//   arrays.forEach((arr) => {
//     result = [...result, ...arr];
//   });
//   return result;
// }
// console.log(concatArrays([1, 2, 3], [4, 5, 6]));

//--------------------------------------------------------------------------------------------------------------------
// Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday). (0.5 Grade)
// • Input Example: 2
// • Output Example: “Monday”
//--------------------------------------------------------------------------------------------------------------------
// function DayOfWeek(dayNum) {
//   let dayName = "";
//   switch (dayNum) {
//     case 1:
//       dayName = "Sunday";
//       break;
//     case 2:
//       dayName = "Monday";
//       break;
//     case 3:
//       dayName = "Tuesday";
//       break;
//     case 4:
//       dayName = "Wednesday";
//       break;
//     case 5:
//       dayName = "Thursday";
//       break;
//     case 6:
//       dayName = "Friday";
//       break;
//     case 7:
//       dayName = "Saturday";
//       break;
//     default:
//       dayName = "This day doesn't exist";
//   }
//   return dayName;
// }
// console.log(DayOfWeek(2));

//--------------------------------------------------------------------------------------------------------------------
// 7. Create an array of strings and return their lengths using map method (0.5 Grade)
// • Input: ["a", "ab", "abc"]
// • Output Example: [1, 2, 3]
//--------------------------------------------------------------------------------------------------------------------

// function getlength(arr) {
//   let lengths = arr.map((item) => {
//     return item.length;
//   });
//   return lengths;
// }
// console.log(getlength(["a", "ab", "abc"]));

//--------------------------------------------------------------------------------------------------------------------
// 8. Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
// • Input Example: 15
// • Output Example: “Divisible by both”
//--------------------------------------------------------------------------------------------------------------------

// function checkDivisibility(num) {
//   const fNum = 3,
//     SNum = 5;
//   if (num % fNum === 0 && num % SNum === 0) {
//     return "Divisible by both";
//   } else if (num % fNum === 0) {
//     return `Divisible by ${fNum}`;
//   } else if (num % SNum === 0) {
//     return `Divisible by ${SNum}`;
//   } else {
//     return `Number ${num} is Not Divisible by ${fNum} Or ${SNum}`;
//   }
// }
// console.log(checkDivisibility(8));

//--------------------------------------------------------------------------------------------------------------------
// 9. Write a function using arrow syntax to return the square of a number (0.5 Grade)
// • Input Example: 5
// • Output Example: 25
//--------------------------------------------------------------------------------------------------------------------

// const getSquare = (num) => {
//   return num ** 2;
// };
// console.log(getSquare(5));

//--------------------------------------------------------------------------------------------------------------------
// 10.Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
// • Input Example: const person = {name: 'John', age: 25}
// • Output Example: 'John is 25 years old'
//--------------------------------------------------------------------------------------------------------------------

// $$$$$$$$$$$$$$$$$ this by pramertar $$$$$$$$$$$$$$$$

// const user = { name: "John", age: 25 };
// function interduce(user) {
//   return `${user.name} is ${user.age} yaers old`;
// }
// console.log(interduce(user));

// $$$$$$$$$$$$$$$$$ this by Advance function $$$$$$$$$$$$$$$$

// const user = { name: "John", age: 25 };
// function interduce() {
//   return `${this.name} is ${this.age} years old`;
// }
// console.log(interduce.call(user));

//--------------------------------------------------------------------------------------------------------------------
// 11.Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
// • Input Example: 1, 2, 3, 4, 5
// • Output Example: 15
//--------------------------------------------------------------------------------------------------------------------

// function getSum(...nums) {
//   return nums.reduce((acc, cur) => {
//     return acc + cur;
//   });
// }

// console.log(getSum(1, 2, 3, 4, 5));

//--------------------------------------------------------------------------------------------------------------------
//   12. Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
// • Output Example: “Success”
//--------------------------------------------------------------------------------------------------------------------

// async function connect() {
//   // after Fetching by await fetch (fileName) will check on the status
//   let status = 200;
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       if (status === 200) {
//         res("Success");
//       } else {
//         rej("there is a problem in the connection");
//       }
//     }, 3000);
//   });
// }
// connect().then((data) => {
//   console.log(data);
// });

//--------------------------------------------------------------------------------------------------------------------
// 13. Write a function to find the largest number in an array. (0.5 Grade)
// • Input Example: [1, 3, 7, 2, 4]
// • Output Example: 7
//--------------------------------------------------------------------------------------------------------------------

// function getlargest(arr) {
//   return arr.reduce((acc, cur) => {
//     return acc > cur ? acc : cur;
//   });
// }
// console.log(getlargest([1, 3, 7, 2, 4]));

//--------------------------------------------------------------------------------------------------------------------
// 14. Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
// • Input Example: name: "John", age: 30}
// • Output Example: ["name", "age"]
//--------------------------------------------------------------------------------------------------------------------
// const user = { name: "John", age: 30 };
// function getKeys() {
//   let result = [];
//   for (let key in this) {
//     result = [...result, key];
//   }
//   return result;
// }
// function getKeys() {
//   return Object.keys(this);
// }
// console.log(getKeys.call(user));

//--------------------------------------------------------------------------------------------------------------------
// 15. Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
// • Input: "The quick brown fox"
// • Output: ["The", "quick", "brown", "fox"]
//--------------------------------------------------------------------------------------------------------------------
// function splits(str, segment) {
//   let result = [];
//   let ward = "";
//   str = str.trim();
//   for (let little of str) {
//     if (segment === undefined) {
//       result = [...result, little];
//     }
//     if (segment !== undefined) {
//       if (little === segment) {
//         result = [...result, ward];
//         ward = "";
//         continue;
//       }
//       ward = ward + little;
//     }
//   }
//   ward.length > 0 ? (result = [...result, ward]) : "";
//   return result;
// }

// function splits(str, segment = "") {
//   const New = str.split(segment);
//   return New;
// }
// console.log(splits("The quick brown fox", " "));

//--------------------------------------------------------------------------------------------------------------------

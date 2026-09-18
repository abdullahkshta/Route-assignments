//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$   After you Go Down To Last Line You Will Understand Everything  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const ForEachAndForOF = {
  // In Terms Of
  Difendation: {
    forEach: ` it's a Method of Array class and when you use it you actully call a function`,
    forOf: ` it's a loop in the language construct works directly with the engine ->( V8 chrome Engine or node js ) `,
  },
  DataTypeHandle: {
    forEach: `it works with arrays, maps, set, pre-defined and pre-configured data structures but it doesn't
     work with data has Symbol iterator like Strings or Objects  `,
    forOf: `It works with any datatype has symbol iterator like strings and Object that is iterable and aslo
     arrays, maps and sets but doesn't work with data doesn't has a iterator like normal Objects `,
  },
  RespectDelay_Async_Promises: {
    forEach: `doesn't respect any delay, any await operation or Promises `,
    forOf: `respects the delays and Async Await functions and promises `,
  },
  contorOfLoop: {
    forEach: `you can't contor of break or contanue and when you use return you don't go out of the function `,
    forOf: `you can contor of the loop by break to finish the loop, skip by contanue or return to take the 
    value and go out of the function `,
  },
  Usage: {
    forEach: ` When you need to write simple code without declation variable or loops and When you need to
     do side effect on all items without skiping `,
    forOf: `if you take care of the performance and you want to take contor of loops and loop on promises
     and async function `,
  },
};

const hoistingAndTemporalDeadZone = {
  "how the engine work": {
    firstStep: `the engine looks at the code and start to take any declartion transaction that when it see 
    ward like var,let or const and start to reserve the name and make state of this variable uninitialized 
    and if the declation ward is var that reserve value undefiend but if it find function in this case take 
    all the function to create his scope`,
    secondStep: `the engine start to compile the code line by line and when it arrive to the line that its 
    declare on the varible at this moment it storage its type and if will be in the call back momery like 
    (string,number,boolean,undefiend,...) any data can know its size or will storage it in momery heap like 
    object or arrays and return its address inside the momery `,
  },
  "what is the meaning of": {
    "hoisting transaction": `the is the first step when the engine looks for any declartion ward and reserve the names `,
    "Temporal Dead Zone": ` the is the distance or time that when the compiler starts to compile the code 
    to reach the declartion line of each vairable for example if you declare in line 50 {let x = 15} the 
    Temporal Dead Zone will start from line one to line 50 if you try to use this variable before reach 
    this line the compiler will thorw error and functions don't have Temporal Dead Zone because in hoisting 
    transaction the engine take all the function and create it to make its scope `,
  },
};

const LooseAndStrictEquality = {
  "data storage method": {
    "first Step": `As i explained it in the hoising, after reserve the names and check if this data 
    can the compiler count how many bits will each variable take and choose which momery will storage 
    and the comparsion is performed on data you can count its bits`,
    "second Step": ` the compiler put something like two labels for example if you storage a variable
     like {let x = 4} the compiler storage it in the momery like that (reserve 8 bit for this variable
      x and but this two labels the first one has the type of variable [number], the second one has the
       bits of convert this number to 64bits [00s&11s] `,
  },
  "the Way of comparison": {
    "loose Equality": ` this comparison is performed like that first check the compiler check the labels
     types for this two variables if they aren't the same type  it goes to create another clone but
      changes its type and start to do the second check and takes the bits of the other labels these
       hava bits of data and start to make addition operation to this bits bit by bit if all of the solution = 0
        that return true of anyone of this solutions = 1 that stop the addition operation and return false and i
         will explain it in line (75 : 113)`,
    "Strict Equality": ` this comparsion the compiler checks type of both datatype if they are the same type it
     go to check the values of both if they are the same value in this case will return true `,
  },
};
// //--------------------------------------------------------------------------------------------------------------------
function conditionMethod(x, y, strict = true) {
  let result = false;
  const comparison = () => {
    let xBits = x.toString(2).padStart(8, `0`); //==> convert the number to 0101010
    let yBits = y.toString(2).padStart(8, `0`);
    for (let i = 0; i < xBits.length; i++) {
      const sum = Number(xBits[i]) ^ Number(yBits[i]);
      if (sum === 1) {
        result = false;
        break;
      } else {
        result = true;
      }
    }
  };
  switch (strict) {
    //if you do like this if(x === y ) actully you do like that
    case true:
      if (typeof x === typeof y) {
        comparison();
      }
      break;
    //if you do like this if(x == y ) actully you do like that
    case false:
      if (typeof x !== typeof y) {
        if (typeof x !== `number`) {
          x = +x;
        } else if (typeof y !== `number`) {
          y = +y;
        } else {
          comparison();
        }
      }
      comparison();
  }

  console.log(result);
}
// conditionMethod(5, `5`, false);
const howTry_catchWorks = {
  "What was happening before try and catch ?": {
    "Preventing the program from crashing": `if any function inside the chane of the program is collapsed
     All the system will carsh without select the reson `,
    "Difficulty in tracking errors": `before promises at all if you has a error in any function in normal
     function you trak it with out if! if! if! and suck in call back hell`,
  },
  "what happened after try and catch": {
    "easier to hadle functions without crashing ": ` try works like that -> in this block you try to fetch data,
     try to make a promise, pass some of promises or connect with database and if any opreation failed all the
      block will stop and go to the next point`,
    "easier to track errors": ` catch work like that -> catch is keeping an eye on try block and when any operation
     failed it catchs the method and appears it without suck in call back hell you can see the example in line (140 : 190)  `,
  },
};
/*
 let us make an example to simulate the way that try and catch work by it 
 imagine that your dad gave you mission that consistent of 5 steps 
 1- you have to go to ATM to withdrawal amount of money 
 2- you have to go to the laundromat to take his suit
 3- you have to go to the ironing shop to iron the suit 
 4- you have to go to the suits shop to by a necktie is matching with the suit
 5- you have to go back to home 
 if any thing bad happened like the ATM wasn't work or any shop of this doesn't open you have to call you data and tell him the reson of step failed after that go back home
 */

const withdrawal = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (ATM) res(`money and go to the laundromat`);
      else rej(` ATM isn't work `);
    }, 1000);
  });
};
const Laundromat = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (laundromat) res(`clean suit and go to ironing Shop`);
      else rej(` laundromat doesn't open `);
    }, 1000);
  });
};
const ironingSuit = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (ironingShop) res(`ironed suit and go to suits Shop`);
      else rej(`ironing Shop doesn't open `);
    }, 1000);
  });
};
const buyNecktie = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (suitsShop) res(`clean and ironed suit and finish my mission`);
      else rej(` suits Shop doesn't open `);
    }, 1000);
  });
};
async function dadMission() {
  try {
    await withdrawal().then((step) => console.log(`Now i have the ${step}`));
    await Laundromat().then((step) => console.log(`Now i have the ${step}`));
    await ironingSuit().then((step) => console.log(`Now i have the ${step}`));
    await buyNecktie().then((step) => console.log(`Now i have the ${step}`));
    console.log(`mission Complete`);
  } catch (error) {
    console.error(`you have to call your dad and tell him ${error}`);
  } finally {
    console.log(`i will go back home`);
  }
}
// you can try to change any value here to catch the failed step
const ATM = true,
  laundromat = true,
  ironingShop = true,
  suitsShop = true;
// dadMission();

const typeConversionAndCoecion = {
  "The Difference": {
    "type conversoin": `that what you do by your hand to be sure of any operation you do by using
     ->{Number(),parseInt(),parseFloat(),.toString(),boolean()}`,
    "type coecion": `that what the compiler do by itself like when you make concatant number with string
     by unary plus + or when you try to make mathematical operation like ->{-,*,/,%} on a number with type
      string for digit or type string for digit with type string for digit  `,
  },
};
function typeConversion() {
  let strNum = `123.45`;
  console.log(Number(strNum));
  console.log(parseInt(`42px`));
  console.log(parseFloat(`3.14rem`));
  console.log(String(100));
  let count = 50;
  console.log(count.toString());
  console.log(Boolean(`JavaScript`));
  console.log(Boolean(0));
}
// typeConversion();
function typeCoecion() {
  console.log(`the Number is =>` + 10);
  console.log(`5` + 2);
  console.log(`10` - `4`);
  console.log(`6` * 2);
  console.log(`20` / `5`);
  console.log(`5` - true);
  console.log(`5` - false);
  console.log(
    `but actully all of those if you don't focus with it will make many problems but in typescirpt will handle it`,
  );
}
// typeCoecion();

function centering(sentence) {
  return sentence
    .trim()
    .split("\n")
    .map(
      (line) =>
        " ".repeat(
          Math.max(
            0,
            Math.floor(
              ((process.stdout.columns || 80) - line.trim().length) / 2,
            ),
          ),
        ) + line.trim(),
    )
    .join("\n");
}
function displaying() {
  for (let topic in this) {
    console.log(
      centering(`
       $$$$$$ ________${topic}_________$$$$$`),
    );
    for (let key in this[topic]) {
      console.log(centering(`---------- ${key}---------- `));
      console.log(centering(this[topic][key]));
    }
  }
}

//  1- What is the difference between forEach and for...of? When would you use each? (0.5 Grade)
// displaying.call(ForEachAndForOF);
//----------------------------------------------------------------------------------------------
// 2- What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
// displaying.call(hoistingAndTemporalDeadZone);
//----------------------------------------------------------------------------------------------
// 3- What are the main differences between == and ===?
// displaying.call(LooseAndStrictEquality);
//----------------------------------------------------------------------------------------------
// 4- Explain how try-catch works and why it is important in async operations.
// displaying.call(howTry_catchWorks);
//----------------------------------------------------------------------------------------------
// 5- What’s the difference between type conversion and coercion? Provide examples of each.
// displaying.call(typeConversionAndCoecion);

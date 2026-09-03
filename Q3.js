const createCounter = function (init) {
  let initVal = init;
  let resetval = initVal;
  return {
    increment: () => {
      initVal += 1;
      return initVal;
    },
    reset: () => {
      initVal = resetval;
      return initVal;
    },
    decrement: () => {
      initVal -= 1;
      return initVal;
    },
  };
};

/**
 console.log(counter.increment()); // 6
 * const counter = createCounter(5)
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */

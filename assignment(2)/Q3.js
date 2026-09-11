const findKthPositive = function (arr, k) {
  let missedNum = [];
  let counter = 0;
  for (let i = 0; i < 1000; i++) {
    const curr = arr[counter];
    if (i !== curr) {
      if (i === 0) continue;
      missedNum.push(i);
    } else {
      counter++;
    }
    if (missedNum.length === k) break;
  }

  return missedNum[k - 1];
};
console.log(findKthPositive([2, 3, 4, 7, 11], 5));

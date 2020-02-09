var total = 0;
 var arr = []
function subsetSum(numbers, target, partial) {
  var s, n, remaining;
  partial = partial || [];
  s = partial.reduce(function (a, b) {
    return a + b;
  }, 0);
  if (s <= target) {
    if (s > total ){
      total = s
      arr = partial
    }
  }
  if (s >= target) {
    return;  
  }
  for (var i = 0; i < numbers.length; i++) {
    n = Number(numbers[i]);
    remaining = numbers.slice(i + 1);
    subsetSum(remaining, target, partial.concat([n]));
  }
  return arr;
}

var fs = require('fs');
var fileName = 'inputDataC.in'
var array = fs.readFileSync(fileName).toString().split("\n");
const slices = Number(array[0].split(' ')[0])
const pizzaTypes = array[1].split(' ')

console.log(slices, pizzaTypes);
const sum = subsetSum(pizzaTypes, slices);
console.log(sum.length)
console.log(sum)
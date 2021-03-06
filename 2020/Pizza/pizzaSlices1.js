var sum1 = function(array) {
  if(array.length === 0){
      return 0;
  }
  function add(array, i){
      // console.log(array[i]);
      if(i === array.length-1){
          return array[i];
      }
      return array[i] + add(array, i+1);
  }
  return add(array, 0);
};

var total = 0;
 var arr = []
function subsetSum(numbers, target, partial) {
  var s, n, remaining;
  partial = partial || [];
  s = sum1(partial);
  if (s <= target) {
    if (s >= total ){
      total = s
      arr = partial
    }
  }

  if (s > target) {
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
var fileName = 'inputDataB.in'
var array = fs.readFileSync(fileName).toString().split("\n");
const slices = Number(array[0].split(' ')[0])
const pizzaTypes = array[1].split(' ').map(x=>+x)

console.log(slices, pizzaTypes);
const sum = subsetSum(pizzaTypes, slices);
const pos = sum.length + "\n" + sum.map(el => pizzaTypes.indexOf(el)).join(' ')

fs.writeFile('outputDataB.out', pos, (err) => {
  if (err) throw err;

  console.log('File saved hurray!');
});

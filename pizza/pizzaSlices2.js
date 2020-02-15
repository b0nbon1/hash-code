var fs = require("fs");
var fileName = "pizza/inputDataE.in";
var array = fs
  .readFileSync(fileName)
  .toString()
  .split("\n");
const numberOfPeople = Number(array[0].split(" ")[0]);
const pizzaTypes = array[1].split(" ");

function subsetSum(pizzaTypes, numberOfPeople) {
  const sortedArr = pizzaTypes.sort(function(a, b) {
    return a - b;
  });
  let loop = true;
  while (loop) {
    console.log('start',sortedArr);
    
    var sum = sortedArr.reduce(function(a, b) {
      return Number(a) + Number(b);
    }, 0);
    let difference = sum - numberOfPeople;
    if (sum < numberOfPeople || difference === 0) {
      loop = false;
      return sortedArr;
    }
    if (difference < Number(sortedArr[0])) {
      console.log("Shifted");

      sortedArr.shift();
      loop = false;
      return sortedArr;
    }
    console.log('==before third===',sortedArr);
    
    if (difference > Number(sortedArr.reverse()[0])) {
      console.log("Popped",sortedArr);

      sortedArr.shift();
      // sortedArr.reverse()
    }
    sortedArr.reverse()
    console.log(sortedArr);
    if (
      difference > Number(sortedArr[0])
      &&
      difference < Number(sortedArr.reverse()[0]) 
    ) {
      sortedArr.reverse()
      let i = 0;
      
      while (loop) {
        console.log('start of second loop');
        console.log("Midd Point",difference,Number(sortedArr[i]));
        
        if (difference < Number(sortedArr[i])) {
          loop = false;
          console.log('+++=anc',sortedArr[i]);
          
          const answ = sortedArr.filter(item=>item !== sortedArr[i])
          return answ;
        }
        i++
      }
    }
  }
}
var result = subsetSum(pizzaTypes, numberOfPeople);
console.log(result);

var fs = require('fs');
var readline = require('readline');
// Files Name
const fileNames = ["example_1", "b_read_on","c_incunabula", "d_tough_choices", "e_so_many_books", "f_libraries_of_the_world"];
fileNames.forEach((filename) => {
  var lineReader = readline.createInterface({
      input: fs.createReadStream(`./${filename}.txt`)
  });
  let data = [];
  lineReader.on('line', function (line) {
      data.push(line.split(" "))
  });
  lineReader.on('close', function () {
      let days = data[0][2];
      let l = data[0][1];
      let scores = data[2];
        data.splice(0,2);
      let newData = [];
      for(let i = 0; i < data.length; i+=2) {
        newData.push([data[i], data[i+1]])
      }
      let lib = newData.map((e, i) => {
        return {
            totalBooks: e[0][0],
            signup: e[0][1],
            shippingPerDay: e[0][2],
            books: e[1]
        }
      })
      scanner(lib, days, filename)
  })
});


function scanner(libraries, days, filename) {
    let remaining;
let obj = {}
let l = 0;
let outlib = {};
let outliblen = {};
for (l; l < 2; l++) { 
  days = days - libraries[l].signup
  if (days <= 0){
    break;
  }
  obj[`l${l}`] = []
  for(let d = days; d > 0; d--) {
    if ( libraries[l].books.length === 0) {
      continue;
    }
    obj[`l${l}`] = [ ...obj[`l${l}`], ...libraries[l].books.splice(0, libraries[l].shippingPerDay)]
  }
  outlib[l] = obj[`l${l}`]
  outliblen[l] = obj[`l${l}`].length
}
console.log(l);
console.log(outlib);
console.log(outliblen);
var fs = require('fs');

var file = fs.createWriteStream(`${filename}out.txt`);
file.on('error', function(err) { /* error handling */ });
file.write(l + '\n');
Object.keys(outlib).forEach((v) => { 
  file.write(v + ' ' + outlib[v].length + '\n');
  file.write(outlib[v].join(' ') + '\n'); 
});
file.end();
}
var fs = require('fs');
var readline = require('readline');

// Files Name
const fileNames = ["inputDataA", "inputDataB", "inputDataC", "inputDataD", "inputDataE"];

// Reading file one by one
fileNames.forEach((filename) => {

    var lineReader = readline.createInterface({
        input: fs.createReadStream(`./${filename}.in`)
    });

    let data = [];

    lineReader.on('line', function (line) {
        data.push(line.split(" "))
    });

    lineReader.on('close', function () {
        let max, n, inputs;

        [max, n] = data[0];
        inputs = data[1];
        solve(max, n, inputs, filename);
    });

});

// max: maximum slices
// n: types of pizza
// inputs: array (the number of slices in each type of pizza)
const solve = (max, n, inputs, filename) => {

    let index;
    let solve = [];
    let total = 0;

    // Decrease the traversable size of the initial Pizza array in reverse order, by
    for (let i = n - 1; i >= 0; i--) {
        let sum = 0;
        index = i;
        let tempsolve = [];

        // Traverse the current Pizza array in reverse order
        for (let j = index; j >= 0; j--) {

            let value = Number(inputs[j]);

            let tempsum = sum + value;

            if (tempsum == max) {
                sum = tempsum;
                tempsolve.unshift(j);
                break;
            }
            else if (tempsum > max) {
                continue;
            }
            else if (tempsum < max) {
                sum = tempsum;
                tempsolve.unshift(j);
                continue;
            }
        }

        if (total < sum) {
            total = sum;
            solve = tempsolve;
        }

    }

    console.log("Max Score: ", total);
    console.log("No. of Pizzas: ", solve.length);
    // console.log(solve.join(" "));

    fs.appendFile(`./Output/${filename}.out`, solve.length + '\n', function (err) {
        if (err) return console.log(err);

        fs.appendFile(`./Output/${filename}.out`, solve.join(" "), function (err) {
            if (err) return console.log(err);

            fs.close(`./Output/${filename}.out`, (err) => {
                if (err) throw err;
            });
        });
    });

}


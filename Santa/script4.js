const md5 = require('./md5.js');

const input = "iwrupvqb";
let sol = 0;
let key = "";

console.time("santa4");

do {
    key = input + sol;
    sol++;
} while (!(md5.getMd5(key).startsWith("00000")))
console.log("Key5z:", key, "Solution:", sol - 1);

sol = 0;
do {
    key = input + sol;
    sol++;
} while (!(md5.getMd5(key).startsWith("000000")))
console.log("Key6z:", key, "Solution:", sol - 1);

console.timeEnd("santa4");
const fs = require('fs');

fs.readFile("input5.txt", (err, data) => {
    console.time("santa5");

    const dataArr = data.toString().split("\n");

    const vowelList = ["a", "e", "i", "o", "u"];
    const badList = ["ab", "cd", "pq", "xy"];

    let lastC = "";
    let isNice = false;
    let hasVowels = 0;
    let isBad = false;

    let solList = [];
    let n = 1;

    for (let line of dataArr) {

        for (let c of line) {
            if (badList.includes(lastC + c)) {
                isBad = true;
                break;
            }
            if (!isNice && lastC === c)
                isNice = true;
            if (hasVowels < 3 && vowelList.includes(c))
                hasVowels++;
            lastC = c;
        }
        if (hasVowels >= 3 && isNice && !isBad)
            solList.push(line);

        //console.log("LINE" + n + ":", line, "isNice:", isNice, "hasVowels:", hasVowels, "isBad:", isBad);

        lastC = "";
        isNice = false;
        hasVowels = false;
        isBad = false;
        n++;
    }

    console.log(solList.length);

    console.timeEnd("santa5");
});

fs.readFile("input5.txt", (err, data) => {
    console.time("santa5");

    const dataArr = data.toString().split("\n");

    let solList = [];
    let n = 1;

    let pairRep = false;
    let letterRep = false;
    let prevC = "";
    let lastC = "";

    for (let line of dataArr) {

        for (let i = 0; i < line.length; i++) {
            if (!pairRep && lastC !== "")
                if (line.substring(i + 1, line.length).includes(lastC + line[i]))
                    pairRep = true;
            if (!letterRep)
                if (prevC === line[i])
                    letterRep = true;
            if (pairRep && letterRep) {
                solList.push(line);
                break;
            }
            prevC = lastC;
            lastC = line[i];
        }
        //console.log("LINE" + n + ":", line, "pairRep:", pairRep, "letterRep:", letterRep);
        n++;

        pairRep = false;
        letterRep = false;
        prevC = ""
        lastC = ""
    }

    console.log(solList.length);

    console.timeEnd("santa5");
});
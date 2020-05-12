const fs = require('fs');

const toNr = (x16) => {
    xnr = 0;
    for (i = 0; i < 16; i++)
        xnr += Number(x16[i]) * (2 ** (15 - i));
    //console.log("TONR(", x16, ")=>", xnr);
    return xnr;
};

const to16 = (x, val) => {
    let str = x.toString(2);
    for (i = str.length; i < 16; i++)
        str = "0" + str;
    //console.log("TO16(", x, ")=>", str);
    Instr[val] = () => str;
    return str;
};

const or16 = (x16, y16, val) => {
    let r16 = "";
    for (i = 0; i < 16; i++)
        if (x16[i] === "1" || y16[i] === "1")
            r16 += "1";
        else
            r16 += "0";
    //console.log("OR(", x16, y16, ")=>", r16);
    Instr[val] = () => r16;
    return r16;
};

const and16 = (x16, y16, val) => {
    let r16 = "";
    for (i = 0; i < 16; i++)
        if (x16[i] === "0" || y16[i] === "0")
            r16 += "0";
        else
            r16 += "1";
    //console.log("AND(", x16, y16, ")=>", r16);
    Instr[val] = () => r16;
    return r16;
};

const not16 = (x16, val) => {
    let r16 = "";
    for (i = 0; i < 16; i++)
        if (x16[i] === "0")
            r16 += "1";
        else
            r16 += "0";
    //console.log("NOT(", x16, ")=>", r16);
    Instr[val] = () => r16;
    return r16;
};

const right16 = (x16, sh, val) => {
    let r16 = x16;
    for (i = 0; i < sh; i++)
        r16 = "0" + r16.substring(0, 15);
    //console.log("RIGHT(", x16, sh, ")=>", r16);
    Instr[val] = () => r16;
    return r16;
};

const left16 = (x16, sh, val) => {
    let r16 = x16;
    for (i = 0; i < sh; i++)
        r16 = r16.substring(1, 16) + "0";
    //console.log("LEFT(", x16, sh, ")=>", r16);
    Instr[val] = () => r16;
    return r16;
};

const nr_or_var = (value) => {
    if (isNaN(value))
        return Instr[value]();
    else
        return to16(Number(value));
};

const Instr = {};

fs.readFile("input7.txt", (err, data) => {
    console.time("santa7");

    for (let line of data.toString().split("\n")) {
        line = line.split(" ");
        //console.log(line);

        if (line[0] === "NOT") {
            //console.log("NOT");
            Instr[line[3]] = () => not16(nr_or_var(line[1]), line[3]);
        }

        else if (line[1] === "OR") {
            //console.log("OR");
            Instr[line[4]] = () => or16(nr_or_var(line[0]), nr_or_var(line[2]), line[4]);
        }

        else if (line[1] === "AND") {
            //console.log("AND");
            Instr[line[4]] = () => and16(nr_or_var(line[0]), nr_or_var(line[2]), line[4]);
        }

        else if (line[1] === "LSHIFT") {
            //console.log("LSHIFT");
            Instr[line[4]] = () => left16(nr_or_var(line[0]), Number(line[2]), line[4]);
        }

        else if (line[1] === "RSHIFT") {
            //console.log("RSHIFT");
            Instr[line[4]] = () => right16(nr_or_var(line[0]), Number(line[2]), line[4]);
        }
        else {
            //console.log("ATRIB");
            Instr[line[2]] = () => nr_or_var(line[0], line[2]);
        }
    }
    const A = toNr(Instr.a());
    console.log(A);

    console.timeEnd("santa7");

    //
    //
    //

    console.time("santa7-2");

    for (let line of data.toString().split("\n")) {
        line = line.split(" ");
        //console.log(line);

        if (line[0] === "NOT") {
            //console.log("NOT");
            Instr[line[3]] = () => not16(nr_or_var(line[1]), line[3]);
        }

        else if (line[1] === "OR") {
            //console.log("OR");
            Instr[line[4]] = () => or16(nr_or_var(line[0]), nr_or_var(line[2]), line[4]);
        }

        else if (line[1] === "AND") {
            //console.log("AND");
            Instr[line[4]] = () => and16(nr_or_var(line[0]), nr_or_var(line[2]), line[4]);
        }

        else if (line[1] === "LSHIFT") {
            //console.log("LSHIFT");
            Instr[line[4]] = () => left16(nr_or_var(line[0]), Number(line[2]), line[4]);
        }

        else if (line[1] === "RSHIFT") {
            //console.log("RSHIFT");
            Instr[line[4]] = () => right16(nr_or_var(line[0]), Number(line[2]), line[4]);
        }
        else {
            //console.log("ATRIB");
            Instr[line[2]] = () => nr_or_var(line[0], line[2]);
        }
    }
    Instr["b"] = () => nr_or_var(A.toString(), "b");
    console.log(toNr(Instr.a()));

    console.timeEnd("santa7-2");
});
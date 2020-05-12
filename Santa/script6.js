const fs = require('fs');

fs.readFile("input6.txt", (err, data) => {
    console.time("santa6");

    const init = () => {
        const l = [];
        for (i = 0; i < 1000; i++)
            l.push(false);
        for (i = 0; i < 1000; i++)
            lights.push([...l]);
    }

    const turnOn = (x, y) => lights[x][y] = true;
    const turnOff = (x, y) => lights[x][y] = false;
    const toggle = (x, y) => lights[x][y] = !lights[x][y];

    const procLine = (xS, yS, xE, yE, func) => {
        //console.log("ON", xS, yS, xE, yE);
        for (i = Number(xS); i <= Number(xE); i++)
            for (j = Number(yS); j <= Number(yE); j++)
                func(i, j);
    };

    const lights = [];
    init();

    for (let line of data.toString().split("\n")) {
        line = line.split(" ");
        //console.log(line);
        if (line[0] === "toggle")
            procLine(line[1].split(",")[0], line[1].split(",")[1],
                line[3].split(",")[0], line[3].split(",")[1], toggle);
        else if (line[1] === "on")
            procLine(line[2].split(",")[0], line[2].split(",")[1],
                line[4].split(",")[0], line[4].split(",")[1], turnOn);
        else procLine(line[2].split(",")[0], line[2].split(",")[1],
            line[4].split(",")[0], line[4].split(",")[1], turnOff);
    }
    let sol = 0;
    for (i = 0; i < 1000; i++)
        for (j = 0; j < 1000; j++)
            if (lights[i][j])
                sol++;

    console.log("Nr. Lights:", sol);


    console.timeEnd("santa6");
});

fs.readFile("input6.txt", (err, data) => {
    console.time("santa6-2");

    const init = () => {
        const l = [];
        for (i = 0; i < 1000; i++)
            l.push(0);
        for (i = 0; i < 1000; i++)
            lights.push([...l]);
    }

    const turnOn = (x, y) => lights[x][y]++;
    const turnOff = (x, y) => { if (lights[x][y] !== 0) lights[x][y]--; };
    const toggle = (x, y) => lights[x][y] += 2;

    const procLine = (xS, yS, xE, yE, func) => {
        //console.log("ON", xS, yS, xE, yE);
        for (i = Number(xS); i <= Number(xE); i++)
            for (j = Number(yS); j <= Number(yE); j++)
                func(i, j);
    };

    const lights = [];
    init();

    for (let line of data.toString().split("\n")) {
        line = line.split(" ");
        //console.log(line);
        if (line[0] === "toggle")
            procLine(line[1].split(",")[0], line[1].split(",")[1],
                line[3].split(",")[0], line[3].split(",")[1], toggle);
        else if (line[1] === "on")
            procLine(line[2].split(",")[0], line[2].split(",")[1],
                line[4].split(",")[0], line[4].split(",")[1], turnOn);
        else procLine(line[2].split(",")[0], line[2].split(",")[1],
            line[4].split(",")[0], line[4].split(",")[1], turnOff);
    }
    let sol = 0;
    for (i = 0; i < 1000; i++)
        for (j = 0; j < 1000; j++)
            if (lights[i][j])
                sol += lights[i][j];

    console.log("Light:", sol);


    console.timeEnd("santa6-2");
});
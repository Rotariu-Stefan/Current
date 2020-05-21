const pg = require('pg');
const fs = require('fs');
const fetch = require('node-fetch');

//const client = new pg.Client({
//    connectionString: process.env.DATABASE_URL || process.argv[2],
//    ssl: {
//        rejectUnauthorized: false
//    }
//});
//process.argv.forEach(function (val, index, array) {
//    console.log(index + ': ' + val);
//});

const qSV = {
    name: "SV",
    text: "SELECT * FROM users u WHERE u.username=$1",
    values: ["StravoS"],
    rowMode: "array"
};
const qUsers = {
    text: "SELECT * FROM users;",
    rowMode: "array"
}
const qNotes = {
    text: "SELECT * FROM notes;",
    rowMode: "array"
}
const qMeals = {
    text: "SELECT * FROM meals;",
    rowMode: "array"
}
const qFoodItems = {
    text: "SELECT * FROM fooditems;",
    rowMode: "array"
}
const qMealData = {
    text: "SELECT * FROM mealdata;",
    rowMode: "array"
}
const qDishData = {
    text: "SELECT * FROM dishdata;",
    rowMode: "array"
}
const qDayNotes = {
    text: "SELECT * FROM daynotes;",
    rowMode: "array"
}

const initDB = async (connStr) => {
    try {
        const client = new pg.Client({
            connectionString: connStr,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client.connect();

        const init = fs.readFileSync("ft_initDB.sql").toString();
        const res = await client.query(init);
        console.log("INIT SUCCEEDED!");

        await client.end();
    } catch (err) {
        console.log("___________ERROR___________\n", err.stack);
    }
};

const showDB = async (connStr) => {
    try {
        const client = new pg.Client({
            connectionString: connStr,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client.connect();

        let res = await client.query(qUsers);
        console.log("\nUsers:\n___________________");
        res.rows.forEach(entry => console.log(entry.join(" | ")));

        res = await client.query(qNotes);
        console.log("\nNotes:\n___________________");
        res.rows.forEach(entry => console.log(entry.join(" | ")));

        res = await client.query(qMeals);
        console.log("\nMeals:\n___________________");
        res.rows.forEach(entry => console.log(entry.join(" | ")));

        res = await client.query(qFoodItems);
        console.log("\nFoodItems:\n___________________");
        res.rows.forEach(entry => console.log(entry.join(" | ")));

        res = await client.query(qMealData);
        console.log("\nMealData:\n___________________");
        res.rows.forEach(entry => console.log(entry.join(" | ")));

        res = await client.query(qDishData);
        console.log("\nDishData:\n___________________");
        res.rows.forEach(entry => console.log(entry.join(" | ")));

        res = await client.query(qDayNotes);
        console.log("\nDayNotes:\n___________________");
        res.rows.forEach(entry => console.log(entry.join(" | ")));

        await client.end();
    } catch (err) {
        console.log("___________ERROR___________\n", err.stack);
    }
};

const qrun = async (query, qparams) => {
    try {
        const client = new pg.Client({
            connectionString: process.env.DATABASE_URL || process.argv[2],
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client.connect();
        const qres = await client.query(query, qparams);
        await client.end();

        console.log(`${qres.command} suceeded! Rows affected: ${qres.rowCount}`);
        console.log("Received query result:", qres.rows);
        return qres;

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        return undefined;
    }
};

const loadFromFile = async (filename) => {
    try {
        const entry = "(?<Amount>^\\d+([\\./]{1}\\d+)?(g\\b|\\b)) " +
            "(?<Name>[^@]+) (@" +
            "(?<Brand>.+) )?" +
            "(?<Macros>[\\d\\.]{1,5}/[\\d\\.]{1,5}/[\\d\\.]{1,5}$)";
        //const entryResult = "^=(?<Macros>[\\d\\.]{1,5}/[\\d\\.]{1,5}/[\\d\\.]{1,5}$)";
        const dishResult = "^\\>===(?<Amount>\\d+(g\\b|\\b)) " +
            "(?<Name>[^@]+) (@" +
            "(?<Brand>.+) )?" +
            "(?<Macros>[\\d\\.]{1,5}/[\\d\\.]{1,5}/[\\d\\.]{1,5}$)";
        const mealResult = "^(?<Name>.*)===" +
            "(?<Portion>\\d+/\\d+|\\d+|\\d+\\.\\d+)==" +
            "(?<Macros>[\\d\\.]{1,5}//[\\d\\.]{1,5}//[\\d\\.]{1,5}) ?" +
            "(?<Note>([~\\+\\-]+)?(\\(.*\\))?$)?";
        const dayResult = "(?<DayDate>^\\d\\d/\\d\\d/\\d{4})\\-\\-\\-\\>" +
            "(?<Macros>[\\d\\.]{1,5}\\|\\|[\\d\\.]{1,5}\\|\\|[\\d\\.]{1,5}) ?" +
            "(?<Note>([~\\+\\-]+)?(\\(.*\\))?$)?";
        //const dayActiv = "(?<Activ>^((\\+SALA)|(\\+SAUNA)|(\\+EXS))+)$";
        //const dayEnd = "(?<DayEnd>^\\-{3,}$)";

        const lines = fs.readFileSync(filename).toString().split("\n");

        const fooditems_entered = [];

        let foodentries_current = [];
        let meals_current = [];

        console.log("START");
        let match;
        for (line of lines) {

            match = line.match(entry);
            if (match) {
                //console.log("FOODENTRY-->LINE:", line);
                //console.log("GROUPS:", match.groups);
                const { Amount, Name, Brand } = match.groups;
                const macros = match.groups.Macros.split("/");

                let entered = false;
                for (f of fooditems_entered)
                    if (f.foodname === Name && f.brand === Brand) {
                        entered = true;
                        foodentries_current.push({
                            foodid: f.foodid,
                            amount: Number(Amount.replace("g", "")),
                            measure: Amount.includes("g") ? "Grams" : "Pieces"
                        })
                        break;
                    }
                if (!entered) {
                    const fooditem = {
                        foodname: Name,
                        brand: Brand,
                        fat: macros[0], carbs: macros[1], protein: macros[2],
                        sizeinfo: Amount.includes("g") ? 0 : null,
                        userid: 1, pic: null, price: 11,
                        isdish: false,
                        noteid: null,
                        foodentries: null
                    };

                    let res = await fetch(getServerURL() + "/yourfoods", {
                        method: "put",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(fooditem)
                    });
                    res = await res.json();

                    fooditems_entered.push({ foodname: Name, brand: Brand, foodid: res.foodid });
                    foodentries_current.push({
                        foodid: res.foodid,
                        amount: Number(Amount.replace("g", "")),
                        measure: Amount.includes("g") ? "Grams" : "Pieces"
                    });
                }
            }

            match = line.match(dishResult);
            if (match) {
                //console.log("DISHRESULT-->LINE:", line);
                //console.log("GROUPS:", match.groups);
                const { Amount, Name, Brand, Macros } = match.groups;
                const macros = Macros.split("/");

                const fooditem_dish = {
                    foodname: Name,
                    brand: Brand,
                    fat: macros[0], carbs: macros[1], protein: macros[2],
                    sizeinfo: Amount.includes("g") ? number(Amount.replace("g", "")) : null,
                    userid: 1, pic: null, price: 11,
                    isdish: true,
                    noteid: null,
                    foodentries: foodentries_current
                };

                let res = await fetch(getServerURL() + "/yourfoods", {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(fooditem_dish)
                });
                res = await res.json();

                fooditems_entered.push({ foodname: Name, brand: Brand, foodid: res.foodid });
                foodentries_current = [];
            }

            match = line.match(mealResult);
            if (match) {
                //console.log("MEALRESULT-->LINE:", line);
                //console.log("GROUPS:", match.groups);
                const { Name, Portion, Note } = match.groups;
                const macros = match.groups.Macros.split("//");

                const meal = {
                    mealname: Name,
                    portion: Portion,
                    foodentries: foodentries_current
                };
                if (Note)
                    meal.note = getNoteObj(Note);
                else
                    meal.noteid = null;
                meals_current.push(meal);
                foodentries_current = [];
            }

            match = line.match(dayResult);
            if (match) {
                //console.log("DAYRESULT-->LINE:", line);
                //console.log("GROUPS:", match.groups);
                const { DayDate, Note, Macros } = match.groups;
                const macros = Macros.split("||");
                const dt = DayDate.split("/");

                const day = {
                    date: new Date(`${dt[2]}-${dt[1]}-${dt[0]}`),
                    userid: 1,
                    meals: meals_current
                };
                if (Note)
                    day.note = getNoteObj(Note);
                else
                    day.noteid = null;

                let res = await fetch(getServerURL() + "/dailymeals", {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(day)
                });

                res = await res.json();
                meals_current = [];
            }
        }
        console.log("END");

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        return undefined;
    }
};

const getNoteObj = (noteText) => {
    if (!noteText)
        return null;

    let nscore = "", ntext = "";

    const parstart = noteText.indexOf("(");
    if (parstart === -1)
        nscore = noteText;
    else if (parstart === 0)
        ntext = noteText.substring(1, noteText.length - 1);
    else {
        nscore = noteText.substring(0, parstart);
        ntext = noteText.substring(parstart + 1, noteText.length - 1);
    }
    const note = { title: "Untitled", score: 0, notetext: ntext };
    for (let c of nscore)
        if (c === "-")
            note.score--;
        else if (c === "+")
            note.score++;


    return note;
};


const getServerURL = () => {
    return "http://localhost:3001";
};

module.exports = {
    initDB,
    loadFromFile,
    showDB,
    qrun
};
const pg = require('pg');
const fs = require('fs');

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
        console.log(res);

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
        const entry = "(?<Amount>^\\d+([\\./]{1}\\d+)?(g\\b|ml\\b|\\b)) " +
            "(?<Name>[^@]+) (@" +
            "(?<Brand>.+) )?" +
            "(?<Macros>[\\d\\.]{1,5}/[\\d\\.]{1,5}/[\\d\\.]{1,5}$)";
        const entryResult = "^=(?<Macros>[\\d\\.]{1,5}/[\\d\\.]{1,5}/[\\d\\.]{1,5}$)";
        const mealResult = "^(?<Name>.*)" +
            "(?<Portion>(=====)|(===(\\d+/\\d+|\\d+|\\d+\\.\\d+)==))" +
            "(?<Macros>[\\d\\.]{1,5}//[\\d\\.]{1,5}//[\\d\\.]{1,5}) ?" +
            "(?<Note>([~\\+\\-]+)?(\\(.*\\))?$)?";
        const dayResult = "(?<Date>^\\d\\d/\\d\\d/\\d{4})\\-\\-\\-\\>" +
            "(?<Macros>[\\d\\.]{1,5}\\|\\|[\\d\\.]{1,5}\\|\\|[\\d\\.]{1,5}) ?" +
            "(?<Note>([~\\+\\-]+)?(\\(.*\\))?$)?";
        const dishResult = "^\\>===(?<Amount>\\d+(g\\b|ml\\b|\\b)) " +
            "(?<Name>[^@]+) (@" +
            "(?<Brand>.+) )?" +
            "(?<Macros>[\\d\\.]{1,5}/[\\d\\.]{1,5}/[\\d\\.]{1,5}$)";
        //const dayActiv = "(?<Activ>^((\\+SALA)|(\\+SAUNA)|(\\+EXS))+)$";
        const dayEnd = "(?<DayEnd>^\\-{3,}$)";

        const lines = fs.readFileSync(filename).toString().split("\n");
        console.log("START");

        let day = {
            date: undefined,
            userid: undefined,
            note: {
                title: "Untitled",
                score: 0,
                notetext: null
            },
            meals: []
        };
        let meal = {
            mealname: undefined,
            portion: undefined,
            note: {
                title: "Untitled",
                score: 0,
                notetext: null
            },
            foodentries: []
        };
        let foodentry = {
            foodid: undefined,
            amount: undefined,
            measure: undefined,
            //foodname: undefined,
            //brand: undefined,
            //fat: undefined,
            //carbs: undefined,
            //protein: undefined,
            //note: null
        }
        let dish = {
            amount: undefined,
            measure: undefined,
            foodname: undefined,
            brand: undefined,
            fat: undefined,
            carbs: undefined,
            protein: undefined,
            sizeinfo: undefined,
            userid: 1,
            pic: null,
            price: 11,
            isdish: true,
            noteid: null,
            composition: []
        };
        let fooditem = {
            foodname: undefined,
            brand: undefined,
            fat: undefined,
            carbs: undefined,
            protein: undefined,
            sizeinfo: undefined,
            userid: 1,
            pic: null,
            price: 11,
            isdish: false,
            noteid: null,
            composition: null
        }

        let match;
        for (line of lines) {
            match = line.match(entry);
            if (match) {
                //console.log("Entry-->Line:", line, "Groups:", match.groups);
                const { Amount, Name, Brand } = match.groups;
                const macros = match.groups.Macros.split("/");
                fooditem.foodname = Name;
                fooditem.brand = Brand;
                fooditem.fat = macros[0];
                fooditem.carbs = macros[1];
                fooditem.protein = macros[2];
                fooditem.sizeinfo = Amount.includes("g") ? 0 : null;


            }


            //match = line.match(entryResult);
            //if (match)
            //    console.log("EntryResult-->Line:", line, "Groups:", match.groups);

            //match = line.match(dishResult);
            //if (match)
            //    console.log("DishResult-->Line:", line, "Groups:", match.groups);

            //match = line.match(mealResult);
            //if (match)
            //    console.log("MealResult-->Line:", line, "Groups:", match.groups);

            //match = line.match(dayResult);
            //if (match)
            //    console.log("DayResult-->Line:", line, "Groups:", match.groups);

            //match = line.match(dayEnd);
            //if (match)
            //    console.log("DayEnd-->Line:", line, "Groups:", match.groups.DayEnd);
        }

        console.log("END");





    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        return undefined;
    }
};






module.exports = {
    initDB,
    loadFromFile,
    showDB,
    qrun
};
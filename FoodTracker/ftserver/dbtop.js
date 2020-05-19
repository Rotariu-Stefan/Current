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
}

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
}

module.exports = {
    initDB,
    showDB,
    qrun
};
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require('pg');
const fs = require('fs');

app.listen(process.env.PORT || 3000, () => {
    console.log("Running on:", process.env.PORT || 3000);
});

let reqTotal = 0;
app.use((req, res, next) => {
    reqTotal++;
    console.log("Total Requests:", reqTotal);
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const user = {
        user: "SV",
        job: "LUL"
    }
    res.send(user);
});

app.get("/aaa", (req, res) => {
    res.send("GET @aaa LUL!!");
});
app.post("/aaa", (req, res) => {
    console.log("POST BODY:", req.body);
    res.send("POST @aaa LUL!!");
});

//process.argv.forEach(function (val, index, array) {
//    console.log(index + ': ' + val);
//});

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL || process.argv[2],
    ssl: {
        rejectUnauthorized: false
    }
});

const init = fs.readFileSync("ft_initDB.sql").toString();

const initDB = async () => {
    try {
        await client.connect();

        const res = await client.query(init);
        console.log(res);

        await client.end();
    } catch (err) {
        console.log("___________ERROR___________\n", err.stack);
    }
}

//initDB();

const qSV = {
    name: "SV",
    text: "SELECT * FROM users u WHERE u.username=$1",
    values: ["StravoS"],
    rowMode: "array",
};
const qUsers = {
    text: "SELECT * FROM users;",
    rowMode: "array",
}
const qNotes = {
    text: "SELECT * FROM notes;",
    rowMode: "array",
}
const qMeals = {
    text: "SELECT * FROM meals;",
    rowMode: "array",
}
const qFoodItems = {
    text: "SELECT * FROM fooditems;",
    rowMode: "array",
}
const qMealData = {
    text: "SELECT * FROM mealdata;",
    rowMode: "array",
}
const qDishData = {
    text: "SELECT * FROM dishdata;",
    rowMode: "array",
}

const showDB = async () => {
    try {
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

        await client.end();
    } catch (err) {
        console.log("___________ERROR___________\n", err.stack);
    }
};

showDB();
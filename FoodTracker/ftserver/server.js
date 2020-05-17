const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const { initDB, showDB, qrun } = require('./dbtop');

const server = express();
server.listen(process.env.PORT || 3001, () => {
    console.log("Running on port:", process.env.PORT || 3001);
});

let reqTotal = 0;
server.use((req, res, next) => {
    console.log("Total Requests:", ++reqTotal);
    next();
});
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());

server.get("/", (req, res) => {
    try {
        console.log("-----------ftserver Received @/ --- GET Req:", req.headers);
        res.json("Welcome to the party! A Hero is kU!");

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at Root!");
    }
});

server.post("/login", async (req, res) => {
    try {
        console.log("-----------ftserver Received @/login --- POST Req:", req.body);

        const username = req.body.username;
        const pass = req.body.pass;
        const qres = await qrun("SELECT userid, username, email, firstname, lastname, dob, sex, describe, pic, default_meals, access" +
            " FROM users" +
            " WHERE username= $1 AND pass= $2;"
            , [username, pass]);

        if (qres.rows.length === 1)
            res.json(qres.rows[0]);
        else
            res.json("Invalid Login Info!");

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at Login!");
    }
});

server.get("/dailymeals", async (req, res) => {
    try {
        console.log("-----------ftserver Received @/dailymeals --- GET Req:", req.body);

        const userid = req.body.userid;
        const day = req.body.day;
        const qresM = await qrun("SELECT mealid, mealname, portion, noteid" +
            " FROM meals" +
            " WHERE userid= $1 AND timeeaten= $2;"
            , [userid, day]);

        const meals = qresM.rows;
        for (meal of meals) {
            if (meal.noteid !== null) {
                qresN = await qrun("SELECT noteid, title, score, notetext" +
                    " FROM notes n" +
                    " WHERE noteid=$1;"
                    , [meal.noteid])
                meal.note = qresN.rows[0];
            } else
                meal.note = null;
            delete meal.noteid;

            qresF = await qrun("SELECT f.foodid, f.foodname, f.brand, f.fat, f.carbs, f.protein, f.sizeinfo, f.userid, f.pic, f.price, f.isdish, f.noteid, md.amount" +
                " FROM fooditems f" +
                " JOIN mealdata md ON f.foodid = md.foodid" +
                " JOIN meals m ON m.mealid = md.mealid" +
                " WHERE m.mealid=$1;"
                , [meal.mealid]);
            meal.foodentries = qresF.rows;
        }
        res.json(meals);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at DailyMeals!");
    }
});

server.get("/foodsearch", async (req, res) => {
    try {
        console.log("-----------ftserver Received @/foodsearch --- GET Req:", req.body);

        const userid = req.body.userid;
        const search = req.body.search;
        const all = req.body.all;

        if (all) {
            const qres = await qrun("SELECT *" +
                " FROM fooditems" +
                " WHERE (foodname+brand) LIKE '%$1%';"
                , [search]);
        } else {
            const qres = await qrun("SELECT *" +
                " FROM fooditems" +
                " WHERE (foodname+brand) LIKE '%$1%' AND userid=$2;"
                , [search, userid]);
        }

        res.json(meals);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at FoodSearch!");
    }
});

    //dbtop.showDB(process.argv[2]);
    //dbtop.initDB(process.argv[2]);
    //; (async () => {
    //    const test = await qrun("SELECT * FROM users");
    //    console.log(test.rows);
    //})();

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
        const qres = await qrun("SELECT userid, username, email, firstname, lastname, dob, sex, describe, pic, default_day.meals, access" +
            " FROM users" +
            " WHERE username= $1 AND pass= $2;"
            , [username, pass]);

        if (qres.rows.length === 1)
            res.json(qres.rows[0]);
        else
            res.json("Login Info you entered was Invalid!");

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at Login!");
    }
});

server.get("/dailymeals", async (req, res) => {
    try {
        console.log("-----------ftserver Received @/dailymeals --- GET Req:", req.body);
        const { userid, date } = req.body;

        const qresM = await qrun("SELECT mealid, mealname, portion, noteid" +
            " FROM meals" +
            " WHERE userid= $1 AND timeeaten= $2;"
            , [userid, date]);

        const day = {};
        const qresN = await qrun("SELECT noteid, title, score, notetext" +
            " FROM notes" +
            " WHERE ofday=$1;"
            , [date])
        if (qresN.rowCount === 1)
            day.note = qresN.rows[0];
        else
            day.note = null;

        day.meals = qresM.rows;
        for (meal of day.meals) {
            if (meal.noteid) {
                const qresNM = await qrun("SELECT noteid, title, score, notetext" +
                    " FROM notes" +
                    " WHERE noteid=$1;"
                    , [meal.noteid])
                meal.note = qresNM.rows[0];
            } else
                meal.note = null;
            delete meal.noteid;

            const qresFE = await qrun("SELECT md.entryid, f.foodid, f.foodname, f.brand, f.fat, f.carbs, f.protein, f.sizeinfo, f.userid, f.pic, f.price, f.isdish, f.noteid, md.amount, md.measure" +
                " FROM fooditems f" +
                " JOIN mealdata md ON f.foodid = md.foodid" +
                " WHERE md.mealid=$1;"
                , [meal.mealid]);
            meal.foodentries = qresFE.rows;
        }
        res.json(day);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at Dailyday.meals!");
    }
});

server.get(["/dailymeals/foodsearch", "/yourfoods/foodsearch"], async (req, res) => {
    try {
        console.log("-----------ftserver Received @../foodsearch --- GET Req:", req.body);
        const { userid, search, isAll } = req.body;

        let qresFI;
        if (isAll) {
            qresFI = await qrun("SELECT *" +
                " FROM fooditems f" +
                " WHERE LOWER(CONCAT(foodname, ' ', brand)) LIKE CONCAT('%', LOWER($1::varchar), '%');"
                , [search]);
        } else {
            qresFI = await qrun("SELECT *" +
                " FROM fooditems" +
                " WHERE LOWER(CONCAT(foodname, ' ', brand)) LIKE CONCAT('%', LOWER($1::varchar), '%')" +
                " AND userid= $2;"
                , [search, userid]);
        }

        for (fooditem of qresFI.rows) {
            if (fooditem.noteid) {
                qresN = await qrun("SELECT noteid, title, score, notetext" +
                    " FROM notes" +
                    " WHERE noteid=$1;"
                    , [fooditem.noteid])
                fooditem.note = qresN.rows[0];
            } else
                fooditem.note = null;
            delete fooditem.noteid;
        }

        res.json(qresFI.rows);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at ../FoodSearch !");
    }
});

server.get(["/dailymeals/fooddetails", "/yourfood/fooddetails"], async (req, res) => {
    try {
        console.log("-----------ftserver Received @../fooddetails --- GET Req:", req.body);
        const { isdish, foodid, noteid } = req.body;

        const details = { foodid };
        if (noteid) {
            const qresN = await qrun("SELECT noteid, title, score, notetext" +
                " FROM notes" +
                " WHERE noteid=$1;"
                , [noteid])
            details.note = qresN.rows[0];
        }

        if (isdish) {
            const qresFE = await qrun("SELECT dd.entryid, f.foodid, f.foodname, f.brand, f.fat, f.carbs, f.protein, f.sizeinfo, f.userid, f.pic, f.price, f.isdish, f.noteid, dd.amount, dd.measure" +
                " FROM fooditems f" +
                " JOIN dishdata dd ON f.foodid = dd.ingredientid" +
                " WHERE dd.dishid=$1;"
                , [foodid]);
            details.composition = qresFE.rows;
        }
        res.json(details);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at ../FoodDetails !");
    }
});

server.get("/yourfoods", async (req, res) => {
    try {
        console.log("-----------ftserver Received @yourfoods --- GET Req:", req.body);
        const { userid } = req.body;

        const qresF = await qrun("SELECT f.foodid, f.foodname, f.brand, f.fat, f.carbs, f.protein, f.sizeinfo, f.userid, f.pic, f.price, f.isdish, f.noteid" +
            " FROM fooditems f" +
            " WHERE f.userid=$1;"
            , [userid]);
        res.json(qresF.rows);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at YourFoods !");
    }
});

server.put("/register", async (req, res) => {
    try {
        console.log("-----------ftserver Received @register --- PUT Req:", req.body);
        const { username, email, firstname, lastname, dob, sex, describe, pic, defaultmeals, access, pass } = req.body;

        //TODO check if exists. Return invalid smthn if it does

        const qinsU = await qrun("INSERT INTO users(username, email, firstname, lastname, dob, sex, describe, pic, defaultmeals, access, pass)" +
            " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)" +
            " RETURNING userid;"
            , [username, email, firstname, lastname, dob, sex, describe, pic, defaultmeals, access, pass]);

        res.json({ userid: qinsU.rows[0].userid });

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at Register !");
    }
});

server.put("/yourfoods", async (req, res) => {
    try {
        console.log("-----------ftserver Received @yourfoods --- PUT Req:", req.body);
        const { foodname, brand, fat, carbs, protein, sizeinfo, userid, pic, price, isdish, noteid, note, composition } = req.body;

        //TODO: IF foodid EXISTS DELETE fooditem AND INSERT NEW FOR THAT food ID

        const returnData = { foodid: undefined };
        if (noteid === undefined) {
            const { title, score, notetext } = note;
            const qinsN = await qrun("INSERT INTO notes (userid, title, score, notetext, ofday)" +
                " VALUES($1, $2, $3, $4, null)" +
                " RETURNING noteid;"
                , [userid, title, score, notetext]);
            returnData.noteid = qinsN.rows[0].noteid;
        }
        else
            returnData.noteid = noteid;

        const qinsF = await qrun("INSERT INTO fooditems (foodname, brand, fat, carbs, protein, sizeinfo, userid, pic, price, isdish, noteid)" +
            " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)" +
            " RETURNING foodid;"
            , [foodname, brand, fat, carbs, protein, sizeinfo, userid, pic, price, isdish, returnData.noteid]);
        returnData.foodid = qinsF.rows[0].foodid;


        if (isdish) {
            returnData.entryids = [];
            for (entry of composition) {
                const { foodid, amount, measure } = entry;
                const qinsDD = await qrun("INSERT INTO dishdata (dishid, ingredientid, amount, measure)" +
                    " VALUES($1, $2, $3, $4)" +
                    " RETURNING entryid;"
                    , [returnData.foodid, foodid, amount, measure]);
                returnData.entryids.push(qinsDD.rows[0].entryid);
            }
        }
        else
            returnData.entryids = null;

        res.json(returnData);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at YourFoods !");
    }
});

server.put("/dailymeals", async (req, res) => {
    try {
        console.log("-----------ftserver Received @dailymeals --- PUT Req:", req.body);
        const { date, userid, noteid, note, meals } = req.body;

        //TODO: IF mealid(s) EXISTS DELETE meal(s) AND INSERT NEW FOR THAT meal ID(s)

        const returnData = { date, userid };
        if (noteid === undefined) {
            const { title, score, notetext } = note;
            const qinsN = await qrun("INSERT INTO notes (userid, title, score, notetext, ofday)" +
                " VALUES($1, $2, $3, $4, $5)" +
                " RETURNING noteid;"
                , [userid, title, score, notetext, date]);
            returnData.noteid = qinsN.rows[0].noteid;
        }
        else
            returnData.noteid = noteid;

        returnData.meals = [];
        for (meal of meals) {

            const { mealname, portion, foodentries } = meal;
            const returnMeal = { mealid: undefined };

            if (meal.noteid === undefined) {
                const { title, score, notetext } = meal.note;
                const qinsN = await qrun("INSERT INTO notes (userid, title, score, notetext, ofday)" +
                    " VALUES($1, $2, $3, $4, null)" +
                    " RETURNING noteid;"
                    , [userid, title, score, notetext]);
                returnMeal.noteid = qinsN.rows[0].noteid;
            }
            else
                returnMeal.noteid = meal.noteid;

            const qinsM = await qrun("INSERT INTO meals (mealname, timeeaten, portion, userid, noteid)" +
                " VALUES($1, $2, $3, $4, $5)" +
                " RETURNING mealid;"
                , [mealname, date, portion, userid, returnMeal.noteid]);
            returnMeal.mealid = qinsM.rows[0].mealid;

            returnMeal.entryids = [];
            for (entry of foodentries) {
                const { foodid, amount, measure } = entry;
                const qinsMD = await qrun("INSERT INTO mealdata (mealid, foodid, amount, measure)" +
                    " VALUES($1, $2, $3, $4)" +
                    " RETURNING entryid"
                    , [returnMeal.mealid, foodid, amount, measure]);
                returnMeal.entryids.push(qinsMD.rows[0].entryid);
            }
            returnData.meals.push(returnMeal);
        }

        res.json(returnData);

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at DailyMeals !");
    }
});

server.post("/profile", async (req, res) => {
    try {
        console.log("-----------ftserver Received @profile --- POST Req:", req.body);
        const { userid, username, email, firstname, lastname, dob, sex, describe, pic} = req.body;

        const qupd = await qrun("UPDATE users" +
            " SET username=$1, email=$2, firstname=$3, lastname=$4, dob=$5, sex=$6, describe=$7, pic=$8" +
            " WHERE userid=$9;"
            , [username, email, firstname, lastname, dob, sex, describe, pic, userid]);

        res.json("User Profile Updated!");

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at Profile !");
    }
});

server.post("/profile/changepass", async (req, res) => {
    try {
        console.log("-----------ftserver Received @profile/changepass --- POST Req:", req.body);
        const { userid, oldpass, newpass } = req.body;

        const qres = await qrun("SELECT userid" +
            " FROM users" +
            " WHERE userid=$1 AND pass=$2;"
            , [userid, oldpass])
        if (qres.rowCount === 1) {
            const qupd = await qrun("UPDATE users" +
                " SET pass=$1" +
                " WHERE userid=$2;"
                , [newpass, userid]);
            res.json("User password changed!");
        }
        else
            res.json("Invalid Credentials! Cannot change password!");        

    } catch (err) {
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json("Error at Password Change !");
    }
});


//showDB(process.argv[2]);
//initDB(process.argv[2]);
    //; (async () => {
    //    const test = await qrun("SELECT * FROM users");
    //    console.log(test.rows);
    //})();

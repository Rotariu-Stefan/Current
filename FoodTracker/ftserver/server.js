const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const { initDB, loadFromFile, showDB } = require('./dbtop');

//server.get("/dailymeals_Deprecated", async (req, res) => {
//    try {
//        console.log("-----------ftserver Received @/dailymeals --- GET Req:", req.headers);
//        const { userid, reqdate } = req.headers;

//        const qselM = await client.query("SELECT mealid, mealname, portion, noteid" +
//            " FROM meals" +
//            " WHERE userid= $1 AND timeeaten=$2;"
//            , [userid, reqdate]);

//        const day = {};
//        const qselN = await client.query("SELECT n.noteid, n.title, n.score, n.notetext" +
//            " FROM notes n" +
//            " JOIN daynotes dn ON dn.noteid = n.noteid" +
//            " WHERE dn.daydate=$1;"
//            , [reqdate])
//        if (qselN.rowCount === 1)
//            day.note = qselN.rows[0];
//        else
//            day.noteid = null;

//        day.meals = qselM.rows;
//        for (meal of day.meals) {
//            if (meal.noteid) {
//                const qselNM = await client.query("SELECT noteid, title, score, notetext" +
//                    " FROM notes" +
//                    " WHERE noteid=$1;"
//                    , [meal.noteid])
//                meal.note = qselNM.rows[0];
//                delete meal.noteid;
//            }

//            const qselFE = await client.query("SELECT md.entryid, f.foodid, f.foodname, f.brand, f.fat, f.carbs, f.protein, f.sizeinfo, f.userid, f.pic, f.price, f.isdish, f.noteid, md.amount, md.measure" +
//                " FROM fooditems f" +
//                " JOIN mealdata md ON f.foodid = md.foodid" +
//                " WHERE md.mealid=$1;"
//                , [meal.mealid]);
//            meal.foodentries = qselFE.rows;
//        }
//        res.json(day);

//    } catch (err) {
//        console.log("___________ERROR___________\n", err.message || err);
//        res.status(400).json("Error at Dailyday.meals!");
//    }
//});

const server = express();
server.listen(process.env.PORT || 3001, () => {
    console.log("Running on port:", process.env.PORT || 3001);
});

//let reqTotal = 0;
//server.use((req, res, next) => {
//    console.log("Total Requests:", ++reqTotal);
//    next();
//});
//server.use(bodyParser.urlencoded({ extended: false }));
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

const runTransaction = async (req, res, type, page, TBody) => {
    console.log(`-----------ftserver Received @${page} --- ${type}`);
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL || process.argv[2],
        ssl: {
            rejectUnauthorized: false
        }
    });
    try {
        await client.connect();
        await client.query("BEGIN");

        await TBody(type === "GET" ? req.headers : req.body, res, client);

        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");
        console.log("___________ERROR___________\n", err.message || err);
        res.status(400).json(`Error at ${page}!`);
    } finally {
        await client.end();
    }
};

server.post("/login", (req, res) => runTransaction(req, res, "POST", "/login", async (reqData, res, client) => {
    const { username, pass } = reqData;
    console.log("ReqData:", username, pass);

    const qsel = await client.query("SELECT userid, username, email, firstname, lastname, dob, sex, describe, pic, defaultmeals, access" +
        " FROM users" +
        " WHERE (username=$1 OR email=$1) AND pass=$2;"
        , [username, pass]);

    if (qsel.rows.length === 1)
        res.json(qsel.rows[0]);
    else
        res.json("Invalid Info at Login - Wrong username/password!");
}));

server.get("/dailymeals", (req, res) => runTransaction(req, res, "GET", "/dailymeals", async (reqData, res, client) => {
    const { userid, reqdate } = reqData;
    console.log("ReqData:", userid, reqdate);

    const day = {};
    const qselN = await client.query("SELECT n.noteid, n.title, n.score, n.notetext" +
        " FROM notes n" +
        " JOIN daynotes dn ON dn.noteid = n.noteid" +
        " WHERE dn.daydate=$1;"
        , [reqdate])
    if (qselN.rowCount === 1)
        day.note = qselN.rows[0];
    else
        day.note = null;

    const qselM = await client.query("SELECT mealid, mealname, portion, noteid" +
        " FROM meals" +
        " WHERE userid= $1 AND timeeaten=$2;"
        , [userid, reqdate]);
    day.meals = qselM.rows;
    for (meal of day.meals) {
        if (meal.noteid) {
            const qselNM = await client.query("SELECT noteid, title, score, notetext" +
                " FROM notes" +
                " WHERE noteid=$1;"
                , [meal.noteid])
            meal.note = qselNM.rows[0];
            delete meal.noteid;
        }
        else
            meal.note = null;

        const qselFE = await client.query("SELECT md.entryid, f.foodid, f.foodname, f.brand, f.fat, f.carbs, f.protein, f.sizeinfo, f.userid, f.pic, f.price, f.isdish, f.noteid, md.amount, md.measure" +
            " FROM fooditems f" +
            " JOIN mealdata md ON f.foodid = md.foodid" +
            " WHERE md.mealid=$1;"
            , [meal.mealid]);
        meal.foodentries = qselFE.rows;
    }

    res.json(day);
}));

server.get("/dailymeals/foodsearch", (req, res) => runTransaction(req, res, "GET", "/dailymeals/foodsearch", async (reqData, res, client) => {
    const { userid, search, isall } = reqData;
    console.log("ReqData:", userid, search, isall);

    let qselFI;
    if (isall === "true") {
        qselFI = await client.query("SELECT *" +
            " FROM fooditems" +
            " WHERE LOWER(CONCAT(foodname, ' ', brand)) LIKE CONCAT('%', LOWER($1::varchar), '%');"
            , [search]);
    } else {
        qselFI = await client.query("SELECT *" +
            " FROM fooditems" +
            " WHERE userid=$1" +
            " AND LOWER(CONCAT(foodname, ' ', brand)) LIKE CONCAT('%', LOWER($2::varchar), '%');"
            , [userid, search]);
    }

    for (fooditem of qselFI.rows) {
        if (fooditem.noteid) {
            qselN = await client.query("SELECT noteid, title, score, notetext" +
                " FROM notes" +
                " WHERE noteid=$1;"
                , [fooditem.noteid])
            fooditem.note = qselN.rows[0];
        } else
            fooditem.note = null;
        delete fooditem.noteid;
    }

    res.json(qselFI.rows);
}));

server.get("/dailymeals/notesearch", (req, res) => runTransaction(req, res, "GET", "/dailymeals/notesearch", async (reqData, res, client) => {
    const { userid, search } = reqData;
    console.log("ReqData:", userid, search);

    qselN = await client.query("SELECT noteid, score, title, notetext" +
        " FROM notes" +
        " WHERE userid=$1" +
        " AND LOWER(CONCAT(title, ' ', notetext)) LIKE CONCAT('%', LOWER($2::varchar), '%');"
        , [userid, search]);

    res.json(qselN.rows);
}));

server.get(["/dailymeals/fooddetails", "/yourfood/fooddetails"], (req, res) => runTransaction(req, res, "GET", "../fooddetails", async (reqData, res, client) => {
    const { foodid, isdish, noteid } = reqData;
    console.log("ReqData:", foodid, isdish, noteid);

    const details = { foodid };
    if (noteid !== "null") {
        const qselN = await client.query("SELECT noteid, title, score, notetext" +
            " FROM notes" +
            " WHERE noteid=$1;"
            , [noteid])
        details.note = qselN.rows[0];
    }

    if (isdish === "true") {
        const qselFE = await client.query("SELECT dd.entryid, f.foodid, f.foodname, f.brand, f.fat, f.carbs, f.protein, f.sizeinfo, f.userid, f.pic, f.price, f.isdish, f.noteid, dd.amount, dd.measure" +
            " FROM fooditems f" +
            " JOIN dishdata dd ON f.foodid = dd.ingredientid" +
            " WHERE dd.dishid=$1;"
            , [foodid]);
        details.foodentries = qselFE.rows;
    }

    res.json(details);
}));

server.get("/yourfoods", (req, res) => runTransaction(req, res, "GET", "/yourfoods", async (reqData, res, client) => {
    const { userid } = reqData;
    console.log("ReqData:", userid);

    const qselF = await client.query("SELECT *" +
        " FROM fooditems" +
        " WHERE userid=$1;"
        , [userid]);

    res.json(qselF.rows);
}));

server.put("/register", (req, res) => runTransaction(req, res, "PUT", "/register", async (reqData, res, client) => {
    const { username, email, firstname, lastname, dob, sex, describe, pic, defaultmeals, access, pass } = reqData;
    console.log("ReqData:", reqData);

    const qselU = await client.query("SELECT userid" +
        "FROM users WHERE email=$1 OR username=$2;", [email, username]);
    if (qselU.rowCount === 0) {
        const qinsU = await client.query("INSERT INTO users(username, email, firstname, lastname, dob, sex, describe, pic, defaultmeals, access, pass)" +
            " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)" +
            " RETURNING userid;"
            , [username, email, firstname, lastname, dob, sex, describe, pic, defaultmeals, access, pass]);

        res.json({ userid: qinsU.rows[0].userid });
    } else
        res.json("Invalid info at Register - Username or Email entered is in use!");
}));

server.put("/yourfoods", (req, res) => runTransaction(req, res, "PUT", "/yourfoods", async (reqData, res, client) => {
    const { foodname, brand, fat, carbs, protein, sizeinfo, userid, pic, price, isdish, noteid, note, foodentries } = reqData;
    console.log("ReqData:", reqData);

    const returnData = { foodid: undefined };
    if (noteid === undefined) {
        const { title, score, notetext } = note;
        const qinsN = await client.query("INSERT INTO notes (userid, title, score, notetext)" +
            " VALUES($1, $2, $3, $4)" +
            " RETURNING noteid;"
            , [userid, title, score, notetext]);
        returnData.noteid = qinsN.rows[0].noteid;
    }
    else
        returnData.noteid = noteid;

    const qinsF = await client.query("INSERT INTO fooditems (foodname, brand, fat, carbs, protein, sizeinfo, userid, pic, price, isdish, noteid)" +
        " VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)" +
        " RETURNING foodid;"
        , [foodname, brand, fat, carbs, protein, sizeinfo, userid, pic, price, isdish, returnData.noteid]);
    returnData.foodid = qinsF.rows[0].foodid;


    if (isdish) {
        returnData.entryids = [];
        for (entry of foodentries) {
            const { foodid, amount, measure } = entry;
            const qinsDD = await client.query("INSERT INTO dishdata (dishid, ingredientid, amount, measure)" +
                " VALUES($1, $2, $3, $4)" +
                " RETURNING entryid;"
                , [returnData.foodid, foodid, amount, measure]);
            returnData.entryids.push(qinsDD.rows[0].entryid);
        }
    }
    else
        returnData.entryids = null;

    res.json(returnData);
}));

server.put("/dailymeals", (req, res) => runTransaction(req, res, "PUT", "/dailymeals", async (reqData, res, client) => {
    const { date, userid, note, meals } = reqData;
    console.log("ReqData:", reqData);

    const qdelM = await client.query("DELETE FROM meals WHERE timeeaten=$1 AND userid=$2;", [date, userid]);
    const qdelDN = await client.query("DELETE FROM daynotes WHERE daydate=$1;", [date]);

    const returnData = { date, userid };
    if (note) {
        if (!note.noteid) {
            const { title, score, notetext } = note;
            const qinsN = await client.query("INSERT INTO notes (userid, title, score, notetext)" +
                " VALUES($1, $2, $3, $4)" +
                " RETURNING noteid;"
                , [userid, title, score, notetext]);
            returnData.noteid = qinsN.rows[0].noteid;
        }
        else
            returnData.noteid = note.noteid;
        await client.query("INSERT INTO daynotes (daydate, noteid)" +
            " VALUES($1, $2);"
            , [date, returnData.noteid]);
    }
    else
        returnData.noteid = null;

    returnData.meals = [];
    for (meal of meals) {

        const { mealname, portion, foodentries, note } = meal;
        const returnMeal = { mealid: undefined };

        if (note) {
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", note);
            if (!note.noteid) {
                const { title, score, notetext } = note;
                const qinsN = await client.query("INSERT INTO notes (userid, title, score, notetext)" +
                    " VALUES($1, $2, $3, $4)" +
                    " RETURNING noteid;"
                    , [userid, title, score, notetext]);
                returnMeal.noteid = qinsN.rows[0].noteid;
            }
            else
                returnMeal.noteid = note.noteid;
        }
        else
            returnMeal.noteid = null;

        const qinsM = await client.query("INSERT INTO meals (mealname, timeeaten, portion, userid, noteid)" +
            " VALUES($1, $2, $3, $4, $5)" +
            " RETURNING mealid;"
            , [mealname, date, portion, userid, returnMeal.noteid]);
        returnMeal.mealid = qinsM.rows[0].mealid;

        returnMeal.entryids = [];
        for (entry of foodentries) {
            const { foodid, amount, measure } = entry;
            const qinsMD = await client.query("INSERT INTO mealdata (mealid, foodid, amount, measure)" +
                " VALUES($1, $2, $3, $4)" +
                " RETURNING entryid"
                , [returnMeal.mealid, foodid, amount, measure]);
            returnMeal.entryids.push(qinsMD.rows[0].entryid);
        }
        returnData.meals.push(returnMeal);
    }

    res.json(returnData);
}));

server.post("/profile", (req, res) => runTransaction(req, res, "POST", "/profile", async (reqData, res, client) => {
    const { userid, username, email, firstname, lastname, dob, sex, describe, pic } = reqData;
    console.log("ReqData:", userid, reqdate);

    const qupd = await client.query("UPDATE users" +
        " SET username=$1, email=$2, firstname=$3, lastname=$4, dob=$5, sex=$6, describe=$7, pic=$8" +
        " WHERE userid=$9;"
        , [username, email, firstname, lastname, dob, sex, describe, pic, userid]);

    res.json("User Profile Updated!");
}));

server.post("/profile/changepass", (req, res) => runTransaction(req, res, "POST", "/profile/changepass", async (reqData, res, client) => {
    const { userid, oldpass, newpass } = reqData;
    console.log("ReqData:", reqData);

    const qsel = await client.query("SELECT userid" +
        " FROM users" +
        " WHERE userid=$1 AND pass=$2;"
        , [userid, oldpass])
    if (qsel.rowCount === 1) {
        const qupd = await client.query("UPDATE users" +
            " SET pass=$1" +
            " WHERE userid=$2;"
            , [newpass, userid]);
        res.json("User password changed!");
    }
    else
        res.json("Invalid Info at ChangePass - Credentials don't Match!");
}));

server.post("/yourfoods", (req, res) => runTransaction(req, res, "POST", "/yourfoods", async (reqData, res, client) => {
    const { foodid, foodname, brand, fat, carbs, protein, sizeinfo, userid, pic, price, isdish, noteid, note, composition } = reqData;

    //TODO: UPDATE FOODITEM WITH foodid

}));//TODO

server.delete("/yourfoods", (req, res) => runTransaction(req, res, "DELETE", "/yourfoods", async (reqData, res, client) => {
    const { foodid } = reqData;

    //TODO: DELETE FOODITEM WITH foodid

}));//TODO

; (async () => {
    //await showDB(process.argv[2]);

    //const client = new pg.Client({
    //    connectionString: process.env.DATABASE_URL || process.argv[2],
    //    ssl: {
    //        rejectUnauthorized: false
    //    }
    //});
    //await client.connect();

    //await client.query("...");

    //await client.end();
})();
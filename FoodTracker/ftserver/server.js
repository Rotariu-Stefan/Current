const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const dbtop = require('./dbtop');

const server = express();
server.listen(process.env.PORT || 3000, () => {
    console.log("Running on port:", process.env.PORT || 3000);
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
        res.status(400).json("Error at Root!");
        console.log("___________ERROR___________\n", err.message);
    }
});

const client = new pg.Client({
    connectionString: process.env.DATABASE_URL || process.argv[2],
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();

server.post("/login", async (req, res) => {
    try {
        console.log("-----------ftserver Received @/login --- POST Req:", req.body);
        const username = req.body.username;
        const pass = req.body.pass;
        console.log(username, pass);

        const qres = await client.query("SELECT * FROM users WHERE username=$1 AND pass=$2;", [username, pass]);
        //await client.end();

        console.log("QRES:", qres.rows);
        if (qres.rows.length === 1) {
            res.json(`Welcome, ${qres.rows[0].firstname} ${qres.rows[0].lastname} !`);
        }
        else {
            res.json("Invalid Login Info!");
        }

    } catch (err) {
        res.status(400).json("Error at Login!");
        console.log("___________ERROR___________\n", err.message);
    }
});

//dbtop.showDB(process.argv[2]);
//dbtop.initDB(process.argv[2]);
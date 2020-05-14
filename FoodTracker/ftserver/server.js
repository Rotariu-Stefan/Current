const express = require('express');
const bodyParser = require('body-parser');
const app = express();
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

const knex = require('knex');

const postgres = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL || process.argv[2],
        ssl: {
            rejectUnauthorized: false
        }
    }
});

postgres.select("*").from("users").then(data => {
    console.log(data);
});

const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL || process.argv[2],
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query('SELECT * FROM users;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});
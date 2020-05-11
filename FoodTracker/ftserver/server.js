const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.listen(3000);
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
    res.send("<h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA!!</h1>");
});

app.post("/aaa", (req, res) => {
    console.log("POST BODY:", req.body);
    res.send("POST RES LUL!!");
});
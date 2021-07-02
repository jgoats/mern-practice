let express = require("express");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
let Models = require("./mongoose/user.js");
let Users = Models.User;
require("dotenv").config();
let PORT = process.env.PORT || 250;
let CONNECT = process.env.CONNECTION_STRING;

app.use(express.json());
app.use(cors());

mongoose.connect(CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', function (ref) {
    console.log('Connected to database');
});

app.get("/", (req, res) => {
    res.send("welcome to the main page");
})
app.get("/users", (req, res) => {
    Users.find()
        .then((result) => {
            res.json(result);
            console.log(result);
        }).catch((err) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
        })
})
app.get("/users/:name", (req, res) => {
    Users.findOne({ name: req.params.name })
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.send(err);
            console.log(err);
        })
})
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`running on port ${PORT}`);
})

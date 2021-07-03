let express = require("express");
let app = express();
let mongoose = require("mongoose");
let passport = require("passport");
let passportLocal = require("passport-local").Strategy;
let cookieParser = require("cookie-parser");
let bcrypt = require("bcryptjs");
let session = require("express-session");
let cors = require("cors");
let Models = require("./mongoose/user.js");
let Users = Models.User;
require("dotenv").config();
let PORT = process.env.PORT || 250;
let CONNECT = process.env.CONNECTION_STRING;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser(process.env.SECRET));

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
});
app.post("/login", (req, res) => {
    console.log(req.body);
});
app.post("/register", (req, res) => {
    console.log(req.body);
});
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`running on port ${PORT}`);
})

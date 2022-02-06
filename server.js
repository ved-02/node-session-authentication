require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("./strategy/local");

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const loggedinRoute = require("./routes/loggedin");
const logoutRoute = require("./routes/logout");
const rootRoute = require("./routes/root");

const app = express();
const port = 80;


app.use('/static', express.static('static'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose
    .connect("mongodb://localhost:27017/session")
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => {
        console.log(err);
    });
    const store = new MongoStore({
        mongoUrl: "mongodb://localhost:27017/session",
        collection: "sessions"
     });
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET,
        // cookie: {
            // maxAge: 60*10*4
        // },
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(passport.initialize());
app.use(passport.session());


// ROUTES
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/loggedin", loggedinRoute);
app.use("/logout", logoutRoute);
app.use("/", rootRoute);

app.listen(port, () => {
    console.log(`app on port ${port}`);
});
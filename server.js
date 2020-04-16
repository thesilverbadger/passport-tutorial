
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const path = require("path");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const layout = require("express-layout");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const accountRouter = require("./routes/account.controller");
const homeRouter = require("./routes/home.controller");
const manageRouter = require("./routes/manage.controller");

const initialisePassport = require("./passport-config");
initialisePassport(passport);

//Global variable for users - replace with DB
users = [];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const middlewares = [
    layout(),
    express.static(path.join(__dirname, "views")),
    express.static(path.join(__dirname, "public")),
    bodyParser.urlencoded({ extended: false })
];
app.use(middlewares);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

//Any pre-authenticated routes here
app.use("/account", accountRouter);

//Any authenticated routes after this point
app.use(checkAuthenticated);

app.use("/", homeRouter);
app.use("/manage", manageRouter);

//Middleware authentication function
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next();
    }

    res.redirect("/account/login");
}

app.listen(process.env.PORT);
console.log(`App running on ${process.env.PORT}`);
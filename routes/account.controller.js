const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/account/login",
    failureFlash: true
}));

router.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        res.redirect("/account/login");
    } catch (err) {
        console.error(err);
        res.redirect("/register");
    }

    console.info(users);
});

module.exports = router;
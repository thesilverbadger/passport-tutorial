const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/profile", (req, res) => {
    res.render("manage/profile");
});

router.post("/profile", async (req, res) => {

    try {
        let user = await User.findById(req.user.id);
        user.name = req.body.name;
        user.email = req.body.email;

        await user.save();

        return res.redirect("/");
    }
    catch (err) {
        console.error(err);
    }

    return res.render("manage/profile");
});

module.exports = router;
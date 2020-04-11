const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/user.model");

function initialise(passport) {
    console.log("Initialising Passport");

    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);

        if (user == null) {
            return done(null, false, { message: "Invalid email or password" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Invalid email or password" });
            }
        } catch (err) {
            done(err);
        }

    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await getUserById(id);
        return done(null, user);
    });

    console.log("Initialised passport")
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: email })
    return user;
}

async function getUserById(id) {
    return await User.findById(id);
}

module.exports = initialise;
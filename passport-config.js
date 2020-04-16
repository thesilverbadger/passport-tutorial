const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/user.model");

function initialise(passport) {
    console.log("Initialising Passport");

    const authenticateUser = async (email, password, done) => {
        const user = await User.userFunctions.getUserByEmail(email);

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
        const user = await User.userFunctions.getUserById(id);
        return done(null, user);
    });

    console.log("Initialised passport")
}

module.exports = initialise;
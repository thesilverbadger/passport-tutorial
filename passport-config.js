const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialise(passport, getUserByEmail, getUserById) {
    console.log("Initialising Passport");

    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);

        if (user == null) {
            return done(null, false, { message: "No User" });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "passowrd incorrect" });
            }
        } catch (err) {
            done(err);
        }

    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    });

    console.log("Initialised passport")
}

module.exports = initialise;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model("user", userSchema);

async function getUserByEmail(email) {
    return await user.findOne({ email: email })
}

async function getUserById(id) {
    return await user.findById(id);
}

module.exports = { userModel: user, userFunctions: { getUserByEmail, getUserById } };
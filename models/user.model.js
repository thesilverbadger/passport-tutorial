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

user.getUserByEmail = async function (email) {
    return await user.findOne({ email: email })
}

user.getUserById = async function (id) {
    return await user.findById(id);
}

module.exports = user;
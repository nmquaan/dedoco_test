const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        password: String,
        fullName: String,
        phoneNumber: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    }, {
        timestamps: true
    })
);

module.exports = User;

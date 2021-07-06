const mongoose = require("mongoose");

const Document = mongoose.model(
    "Document",
    new mongoose.Schema({
        documentName: String,
        originalURL: String,
        tagSignatureLocation: String,
        signed: Boolean,
        expiresIn: Date,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        signers: [
            {
                email: String,
                name: String,
                signKey: String,
                signedAt: Date,
                signedURL: String
            }
        ]
    }, {
        timestamps: true
    })
);

module.exports = Document;

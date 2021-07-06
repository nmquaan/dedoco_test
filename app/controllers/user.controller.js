const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const db = require("../models");
const Document = db.document;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.createDocument = async (req, res) => {
    //TODO: verify data from request
    // If verify fail => res error notify to user else next()

    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 7);
    const doc = new Document({
        documentName: req.body.documentName,
        originalURL: req.body.originalURL,
        tagSignatureLocation: req.body.tagSignatureLocation,
        expiresIn: expiresIn,
        userId: req.userId,
        signers: req.body.signers.map(singer => {
            return {
                email: singer.email,
                name: singer.name,
                signKey:
                    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                signedAt: null,
                signedURL: null
            }
        })
    })
    console.log('doc', doc)

    try {
        const resultDoc = await doc.save();
        //TODO: Send mail confirm to user and singers
        res.status(200).send({message: 'Document was created successfully!', data: resultDoc});
    } catch (err) {
        res.status(500).send({message: err});
    }
};

exports.signDocument = async (req, res) => {
    try {
        const {documentId, email, signedURL, signKey} = req.body;
        //TODO: verify data from request
        // If verify fail => res error notify to user else next()
        const document = await Document.findById(ObjectId(documentId))
        if(!document) {
            res.status(400).send({message: 'Document not found!'});
            return;
        }
        //TODO: check sign link expired, check email exist in list signer and signKey match, If verify fail notify error to user else next
        const signerIdx = document.signers.findIndex(sig => sig.email === email);
        document.signers[signerIdx].signedAt = new Date();
        document.signers[signerIdx].signedURL = signedURL
        const result = await document.save();

        //TODO: Send mail confirm to user and singers
        res.status(200).send({message: 'Document was signed successfully!', data: result});
    } catch (err) {
        res.status(500).send({message: err});
    }
};

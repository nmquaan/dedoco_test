const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    const user = new User({
        email: req.body.email,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    try {
        const role = await Role.findOne({name: "user"});
        user.roles = [role._id];
        await user.save();
        //TODO: Send mail confirm to user mail
        res.status(500).send({message: 'User was registered successfully!'});
    } catch (err) {
        res.status(500).send({message: err});
    }
};

exports.login = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }

            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            const authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/User.model');
const SECRET_KEY = process.env.SECRET_KEY;

const authController = {
    login: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            if (username && password) {
                const user = await User.findOne({ username: username });
                if (user) {
                    const isPasswordValid = bcrypt.compareSync(password, user.password);
                    if (isPasswordValid) {
                        const token = jwt.sign({ id: user._id }, SECRET_KEY);
                        return res.status(200).send({ message: "Login successful", data: { token, user } });
                    } else {
                        return res.status(400).send({ message: "Invalid password" });
                    }
                }
                return res.status(401).send({ message: "User not registered" });
            } else if (email && password) {
                const user = await User.findOne({ email: email });
                if (user) {
                    const isPasswordValid = bcrypt.compareSync(password, user.password);
                    if (isPasswordValid) {
                        const token = jwt.sign({ id: user._id }, SECRET_KEY);
                        return res.status(200).send({ message: "Login successful", data: { token, user } });
                    } else {
                        return res.status(400).send({ message: "Invalid password" });
                    }
                }
                return res.status(401).send({ message: "User not registered" });
            } else {
                return res.status(400).send({ message: "Invalid credentials" });
            }
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },
    signup: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            if (username) {
                const UserExists = await User.findOne({ username: username });
                if (UserExists) {
                    return res.status(400).send({ message: "Username already exists" });
                }
                const HashedPass = bcrypt.hashSync(password, 10);
                const newUser = await User.create({
                    ...req.body,
                    password: HashedPass
                })
                return res.status(201).send({ message: "User created successfully", data: newUser });
            } else if (email) {
                const UserExists = await User.findOne({ email: email });
                if (UserExists) {
                    return res.status(400).send({ message: "Username already exists" });
                }
                const HashedPass = bcrypt.hashSync(password, 10);
                const newUser = await User.create({
                    ...req.body,
                    password: HashedPass
                })
                return res.status(201).send({ message: "User created successfully", data: newUser });
            }
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    },
};

module.exports = authController;
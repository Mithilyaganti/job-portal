const express = require('express');
const studentApp = express.Router();
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');  // Fixed path

require('dotenv').config();

let studentCollection;

studentApp.use((req, res, next) => {
    studentCollection = req.app.get('studentcollection');
    next();
});

studentApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const existingUser = await studentCollection.findOne({ username: newUser.username });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    newUser.password = await bcryptjs.hash(newUser.password, 6);
    await studentCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created' });
}));

// User login
studentApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    const dbUser = await studentCollection.findOne({ username: userCred.username });

    if (!dbUser) {
        return res.status(401).json({ message: 'Invalid username' });
    }

    const isPasswordCorrect = await bcryptjs.compare(userCred.password, dbUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
        { username: dbUser.username },
        process.env.SECRET_KEY,  // Fixed key name
        { expiresIn: '1d' }
    );

    res.json({ message: "Login successful", token, user: dbUser });
}));

module.exports = studentApp;

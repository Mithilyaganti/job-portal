const express = require('express');
const companyApp = express.Router();
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');  // Fixed path

require('dotenv').config();

let companyCollection;

companyApp.use((req, res, next) => {
    companyCollection = req.app.get('companycollection');
    next();
});

// Create a new user
companyApp.post('/register', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const existingUser = await companyCollection.findOne({ email: newUser.email });

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    newUser.password = await bcryptjs.hash(newUser.password, 6);
    await companyCollection.insertOne(newUser);
    res.status(201).json({ message: 'User created' });
}));

// User login
companyApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    const dbUser = await companyCollection.findOne({ email: userCred.email });

    if (!dbUser) {
        return res.status(401).json({ message: 'Invalid email' });
    }

    const isPasswordCorrect = await bcryptjs.compare(userCred.password, dbUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
        { email: dbUser.email },
        process.env.SECRET_KEY,  // Fixed key name
        { expiresIn: '1d' }
    );

    res.json({ message: "Login successful", token, user: dbUser });
}));

module.exports = companyApp;

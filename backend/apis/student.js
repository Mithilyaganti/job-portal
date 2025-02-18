const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const Student = require('../models/studentmodel');
require('dotenv').config();

const studentApp = express.Router();

// Student Registration
studentApp.post('/register', expressAsyncHandler(async (req, res) => {
    const { email, password, aparId, projects } = req.body;

    // Check if user exists
    const existingUser = await Student.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Student({ email, password: hashedPassword, aparId, projects });

    await newUser.save();
    res.status(201).json({ message: 'Student registered successfully' });
}));

// Student Login
studentApp.post('/login', expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const dbUser = await Student.findOne({ email });
    if (!dbUser) {
        return res.status(401).json({ message: 'Invalid email' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign(
        { userId: dbUser._id, email: dbUser.email, userType: dbUser.userType },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token, user: { email: dbUser.email, userType: dbUser.userType } });
}));

module.exports = studentApp;

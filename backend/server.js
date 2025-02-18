const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());  // Ensure JSON middleware is applied

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected successfully"))
.catch(err => console.error("Database connection error:", err));

// Import Routes
const studentApp = require('./apis/student');
const companyApp = require('./apis/company');

// Use Routes
app.use('/student', studentApp);
app.use('/company', companyApp);  // Ensure this is present!

// Global error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

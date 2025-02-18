const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    userType: { type: String, enum: ['student'], required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aparId: { type: String, required: true },
    projects: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);

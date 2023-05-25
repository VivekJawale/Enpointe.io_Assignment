const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, },
        email: { type: String, required: true, unique: true, },
        password: { type: String, required: true },
        role: { type: String, enum: ['Banker', 'Customer'], default: 'Customer' }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = User = mongoose.model('user', userSchema);
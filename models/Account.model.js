const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    accountType: { type: String, enum: ["saving", "current"],default:"saving"},
    balance: { type: Number, default: 0 },
    AccountNumber: { type: Number },
    transactions: []
}, {
    versionKey: false,
    timestamps: true
}
);
module.exports = Account = mongoose.model('Account', accountSchema);
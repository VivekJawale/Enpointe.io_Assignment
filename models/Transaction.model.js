const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    transactionType: { type: String, enum: ["credit", "debit"], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
},
    {
        versionKey: false,
        timestamps: true
    })
module.exports = mongoose.model("Transaction", TransactionSchema);
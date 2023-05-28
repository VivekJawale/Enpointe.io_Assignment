const Account = require('../models/Account.model');
const Transaction = require('../models/Transaction.model');

const generateRandomNumber = () => {
    const min = Math.pow(10, 9);
    const max = Math.pow(10, 10) - 1;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};

const transactionController = {
    createAccount: async (req, res) => {
        const { accountType, balance } = req.body;
        try {
            const user = req.user._id;
            const accountNumber = generateRandomNumber();
            const account = await Account.create({
                accountNumber,
                accountType,
                balance,
                user
            });
            return res.status(200).send({ msg: "Account created successfully", account });
        } catch (error) {
            return res.status(400).send({ msg: error.message });
        }
    },
    performTransaction: async (req, res) => {
        const userId = req.user._id;
        const { amount, transactionType } = req.body;
        try {
            const account = await Account.findOne({ user: userId });
            if (!account) {
                return res.status(404).send({ msg: "Account not found" });
            }
            if (transactionType === "credit") {
                account.balance += parseFloat(amount);
            } else if (transactionType === "debit") {
                if (parseFloat(amount) > account.balance) {
                    return res.status(400).send({ msg: "Insufficient balance" });
                }
                account.balance -= parseFloat(amount);
            } else {
                return res.status(400).send({ msg: "Invalid transaction type" });
            }
            const transaction = await Transaction.create({ transactionType, amount });

            account.transactions.push(transaction);
            await account.save();
            return res.status(200).send({msg:"Transaction completed successfully",account});
        } catch (error) {
            return res.status(400).send({ msg: error.message });
        }
    },
    getAllTransactions:async(req,res)=>{
        try {
            const transactions=await Account.find();
            return res.status(200).send({msg:"All Accounts Transactions",data:transactions});
        } catch (error) {
            return res.status(400).send({ msg: error.message });
        }
    },
    getTransactionsOfUser:async(req,res)=>{
        try {
            const transactions=await Account.find({user:req.user._id});
            return res.status(200).send({msg:"All Accounts Transactions of user",data:transactions});
        } catch (error) {
            return res.status(400).send({ msg: error.message });
        }
    }
}

module.exports = transactionController;

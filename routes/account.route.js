// 

const express = require('express');
const transactionController = require('../controllers/transaction.controller');

const transactionRouter = express.Router();

transactionRouter.post('/accountOpen', transactionController.createAccount);
transactionRouter.patch('/transaction', transactionController.performTransaction);

module.exports = transactionRouter;

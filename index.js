require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./config/db');
const PORT = process.env.PORT || 8080;
const app = express();
const authRouter = require('./routes/auth.route')
const transactionRouter = require('./routes/account.route');
const AuthMiddleware = require('./middleware/auth.middleware');
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send({ msg: "Api is Live" });
})

app.use('/api', authRouter);
app.use(AuthMiddleware)
app.use('/api', transactionRouter)

app.listen(PORT, async () => {
    try {
        await connect();
        console.log('listening on Port ' + PORT);
    } catch (error) {
        throw new Error(error);
    }
})
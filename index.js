require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./config/db');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.status(200).send({ msg: "Api is Live" });
})

app.use('/api', require('./routes/auth.route'));


app.listen(PORT, async () => {
    try {
        await connect();
        console.log('listening on Port ' + PORT);
    } catch (error) {
        throw new Error(error);
    }
})
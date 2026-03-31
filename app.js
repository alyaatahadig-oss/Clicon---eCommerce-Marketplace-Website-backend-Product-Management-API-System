// Dot ENV
require("dotenv").config();
// Express
const express = require("express");
const app = express();
// Midleware
app.use(express.json());
// port
const port = process.env.port || 5000;
// DB connection
const mongoose = require("mongoose");
async function dbConnection() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected!");
    } catch (error) {
        console.log(error);
    }
}

dbConnection()
// Run Server
app.listen(port, () => {
    console.log(`Server Is Running At Port ${port}`);
});
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require('mongoose');


require('dotenv').config();
main()
    .then(() => {
        console.log("Connection Successful with Database 📊!");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_KEY);
};

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to the server!!!")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Connected to server ${PORT} 🚀!`);
})
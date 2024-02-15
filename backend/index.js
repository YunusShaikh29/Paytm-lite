const express = require("express");
const rootRouter = require('./routes/index')
require("dotenv").config()
// const cors = require("cors")
const PORT = process.env.PORT
const app = express()

// app.use(cors())


app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
  });

app.use("/api/v1", rootRouter)

app.listen(PORT, () => {
    console.log(`server listening`)
})
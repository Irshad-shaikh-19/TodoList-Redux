require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const TodoRoutes = require('./routes/todo')

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.URL).then(()=>console.log("Database connected Succesfully")).catch((err)=>console.log("Failed to connect database",err))

app.use("/api",TodoRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port:${process.env.PORT}`)
})
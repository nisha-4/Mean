const express  = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://shweta:UserListing@cluster0.wfqyc.mongodb.net/UserListing?retryWrites=true&w=majority")
mongoose.connection.once('open',()=>{
    console.log("Mongodb connected")
})
const PORT = 4000;

const app = express()

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => res.send("Hey, API is working!!"));

app.use("/admin",require("./routes/AdminRoutes"));


app.listen(PORT, ()=>{
    console.log(`server started on ${PORT}`)
})
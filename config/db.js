const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://hanishasarai1000:Project123@cluster0.tvq9zr2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const db = mongoose.connection;

db.on("connected",()=>{
    console.log("database is connected")
})

module.exports=db;
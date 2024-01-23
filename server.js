require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");   
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/job")

// Create a server
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

// connect to db
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("⚡⚡⚡Db Connected⚡⚡⚡"))
  .catch((error) => console.log("🤯Failed to connect🤯", error));

app.get("/", (req,res)=>{
    console.log("You are in / route")
    res.json({message: "Welcome in your API"})
});

// health api
app.get("/health", (req,res)=>{
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date()
    })
})

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/job", jobRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})

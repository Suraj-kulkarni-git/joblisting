const express = require("express");

const app = express();

const PORT = 3000

app.get("/", (req,res)=>{
    console.log("You are in / route")
    res.json({message: "Welcome in your API"})
});

app.get("/health", (req,res)=>{
    res.json({
        service: "job listing server",
        status: "Active",
        time: new Date()
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})

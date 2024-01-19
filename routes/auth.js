const express = reqire("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res)=>{
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password){
            return res.status(400).json({
                errorMessage: "Bad Request"
            });
        }

        const isExistingUser = await User.findOne({ email: email} && { mobile: mobile });
        if (isExistingUser) {
            return res.status(409).json({message: "User Already Exists"});
        }

        const hashedPassword = await bcrypt.has(password, 10);

        const UserData = new User({
            name, 
            email, 
            mobile, 
            password: hashedPassword,
        });

        const userResponse = UserData.save();

        const token = await jwt.sign({ userId: userResponse._id},process.env.JWT_SECRET);

        res.json({message: "User Created Sucessfully", token: token});

    } catch(error){}
    
});

module.exports = router;

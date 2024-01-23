const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next)=>{
    try{
        const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({messaage: "Unauthorized user"})
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if(!decode) return res.status(401).json({message: "Invalid token"});
    // request.body.userId = decode.userId;
    next();
    }catch(error){
        res.status(401).json({message: "Invalid token"});
    }
    
};

module.exports = verifyJwt
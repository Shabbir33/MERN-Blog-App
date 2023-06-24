const jwt = require("jsonwebtoken")
const User = require("../models/User")


async function requireAuth(req, res, next){
    try{
        //Read token off cookies
        const token = req.cookies.Authorization;

        console.log(token)


        //Decode the token
        const decoded = jwt.verify(token, process.env.SECRET)
        console.log("Hello World")

        //Check expiration
        if(Date.now() > decoded.exp) return res.sendStatus(401);

        console.log("Hello World")
        
        //Find user using decoded sub
        const user = await User.findById(decoded.sub);
        if(!user) return res.sendStatus(401);

        //attach user to req
        // req.user = user;
        res.json({user: user});

        //continue on
        next();
        
    }catch(err){
        return res.sendStatus(401);
    }
}

module.exports = requireAuth;
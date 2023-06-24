var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cookies = require('universal-cookie')


const registerUser = async (req, res) => {
    try{
        const {username, password} = req.body;
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, 8),
        })
        res.json({user: userDoc});
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        const userDoc = await User.findOne({username})
        if(!userDoc) return res.sendStatus(401)

        const passwordMatch = bcrypt.compareSync(password, userDoc.password);
        if(!passwordMatch) return res.sendStatus(401)

        //JWT WebToken
        const exp = Date.now() + 1000 * 60 * 60 * 24* 30;
        const token = jwt.sign({ sub: userDoc._id, exp, username }, process.env.SECRET);
        console.log(token)

    
        //Set the cookie
        res.cookie('Authorization', token, { 
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        });

        res.json({user: userDoc})
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}

const checkAuth = (req, res) => {
    try {
        // res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}

const logoutUser = (req, res) => {
    try{
        res.clearCookie("Authorization")
        res.sendStatus(200);
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

module.exports = {registerUser, loginUser, checkAuth, logoutUser}
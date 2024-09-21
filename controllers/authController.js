const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleLogin = async (req, res) => {

    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ "Message": "Username and password required" });
    }

    const foundUser = await User.findOne({
        $or: [
            { username: user }, 
            { ID: user }        
        ]
    });

    if (!foundUser) {
        return res.status(401).json({ "Message": "Unauthorized" });
    }

    const match = await bcrypt.compare(pwd, foundUser.password)

    if (match) {
        //Creating Access token
        const accessToken = jwt.sign(
            { 
                "UserInformation":{
                    'username': foundUser.username,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20m' }
        );

        //Creating Refresh token
        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        
        //To save the refresh token in database
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()
        

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true,sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken }); // In front end we need to store this in memory not in cookie or local storage
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }
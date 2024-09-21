const User = require('../models/User')
const jwt=require('jsonwebtoken')


const handleLogout=async(req,res)=>{


    // User should delete the accessToken from front end
    //localStorage.setItem('token', '');
    const cookies=req.cookies
    if(!cookies?.jwt)return res.sendStatus(204)  //Success , but no content to send

    const refreshToken=cookies.jwt

    const foundUser = await User.findOne({ refreshToken }).exec();


    if (!foundUser){
        res.clearCookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true,maxAge: 24 * 60 * 60 * 1000 })
        return res.status(403)
    }
    
    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}
module.exports={handleLogout}
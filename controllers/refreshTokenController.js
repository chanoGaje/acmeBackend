const User = require('../models/User')
const jwt=require('jsonwebtoken')


const handleRefreshToken=async(req,res)=>{
    const cookies=req.cookies
    console.log(cookies)
    if(!cookies?.jwt)return res.sendStatus(401)
    const refreshToken=cookies.jwt
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser){
        return res.status(403).json({"Message":"Forbidden"})
    }

    console.log(foundUser + ' this is the found user')
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err||foundUser.username!==decoded.username){
                return res.json("Somthing went wrong")
            }
            const accessToken=jwt.sign(
                {
                    "UserInfromation":{
                        "username":decoded.username,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'30s'}//30 seconds
            )
            res.json({accessToken})
        }
    )
}
module.exports={handleRefreshToken}
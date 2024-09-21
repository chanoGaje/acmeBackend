const User=require('../../models/User')
const bcrypt= require('bcrypt')
const router = require('../../routes/API/userRoutes')

const adminRegisterController = async (req,res)=>{
    const {user,pwd,email}=req.body
    
    if(!user||!pwd ||!email){
        return res.status(400).json({"message":"User name ,password and email are Required"})
    }
    
    const duplicate =await User.findOne({username:user}).exec()
    
    if(duplicate){
        return res.sendStatus(409)//conflict
    }
    try{
        const hashedPass=await bcrypt.hash(pwd,10)
        //Storing new user and create 
        const result=await User.create({
            "username":user,
            "password":hashedPass,
            "email":email,
        })
        res.status(201).json({"Success":`New user ${user} was created`})
    }catch(err){
        return res.status(500).json({"Message":err.message})
    }
}

module.exports = {adminRegisterController}
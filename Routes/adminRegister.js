const express=require('express')
const router=express.Router()
const adminRegisterController=require("../controllers/CRUD/adminRegisterController")

router.post('/',adminRegisterController.adminRegisterController)

module.exports=router
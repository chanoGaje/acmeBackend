require('dotenv').config();
const express = require('express');
const path=require('path')
const cors=require('cors')
const corsOptions=require("./config/corsOptions")
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT=require('./middleware/verifyJWT')
const cookieParser=require('cookie-parser')
const credentials=require('./middleware/credentials')

const app = express();
const PORT = process.env.PORT || 3500;

//Database connection
connectDB()

//custom middle ware
app.use(logger)

//handle options credentials check-before cors
//and fetch cookies credentials requirements
app.use(credentials)


//cors
app.use(cors(corsOptions))


//adding middle ware

app.use(express.urlencoded({extended:false}))//to get form data to res body

app.use(express.json()) //to get json data

app.use(cookieParser())

app.use('/',express.static(path.join(__dirname,'/public'))) //to serve static files
app.use('/subdir',express.static(path.join(__dirname,'/public')))


//using the routes
app.use('/',require('./Routes/subdir'))
app.use('/register', require('./Routes/adminRegister'))
app.use('/auth', require('./Routes/auth'))  //login
app.use('/refresh', require('./Routes/refresh')) //Refresh
app.use('/logout', require('./Routes/logout')) //logout
app.use('/inventory', require('./Routes/API/inventoryRoutes'));
app.use('/reports', require('./Routes/API/pdfGen'));
app.use('/companies', require('./Routes/API/companyRoutes'));

app.use(verifyJWT)
app.use('/users', require('./Routes/API/userRoutes'))

//404
app.all('*',(req,res)=>{
  res.status(404)
  if(req.accepts('html')){
      res.sendFile(path.join(__dirname,"views","404.html"))
  }
  else if(accepts('json')){
      res.json({Error:"404 Not Found"})
  }
  else{
      res.type('txt').send("Not Found 404")
  }
})

app.use(errorHandler)

mongoose.connection.once('open',()=>{
  console.log("Connected to MongoDB")
  app.listen(PORT,()=>console.log(`Running on port ${PORT}`))
})

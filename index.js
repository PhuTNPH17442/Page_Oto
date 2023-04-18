const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const handlebar = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const AuthController = require('./routes/auth')
const CoffeeController = require('./routes/coffee')
const MilkController = require('./routes/milk')
const app = express()
require('dotenv').config()
mongoose.set('strictQuery', false);
mongoose.connect(process.env.URI_MONGO)
const db = mongoose.connection;
db.on('error',(err)=>{
  console.log(err)
})
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('_method'))
app.engine('hbs',handlebar.engine({
    extname:'.hbs'
}))
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'views'))
//Connection MONGO


const PORT = process.env.PORT||4321

app.get('/',(req, res , next)=>{
  res.render('home')
})

// router 
app.use('/',AuthController)
app.use('/coffee',CoffeeController)
app.use('/milk',MilkController)


app.get('/register',(req,res)=>{
  res.render('register',{
    layout:'login'
  })
})
app.get('/login',(req,res,next)=>{
  res.render('login',{
    layout: 'login'
  })
})
app.get('/addCar',(req,res)=>{
  res.render('addCar')
})

app.listen(PORT,()=> console.log(`Sever running in `+PORT))
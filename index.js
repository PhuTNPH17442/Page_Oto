const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const handlebar = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const path = require('path')
const AuthController = require('./routes/auth')
const CoffeeController = require('./routes/product')
const CartControl = require('./routes/cart')
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
app.use(session({secret:'mysecret',resave: false , saveUninitialized:false}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
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
app.use('/product',CoffeeController)
app.use('/cart',CartControl)


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
app.listen(PORT,()=> console.log(`Sever running in `+PORT))
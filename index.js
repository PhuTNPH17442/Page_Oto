const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const handlebar = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const AuthController = require('./routes/auth')
const app = express()
require('dotenv').config()
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://phu1203:12032001aA@cluster0.lig7t.mongodb.net/oto_page?retryWrites=true&w=majority')
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


const PORT = process.env.PORT||4000

app.get('/',(req, res , next)=>{
  res.render('home')
})
app.use('/',AuthController)
app.get('/login',(req,res,next)=>{
  res.render('login',{
    layout: 'login'
  })
})
app.listen(PORT,()=> console.log(`Sever running in `+PORT))
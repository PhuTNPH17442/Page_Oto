const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const handlebar = require('express-handlebars')
const methodOverride = require('method-override')
const path = require('path')
const app = express()
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

const PORT = process.env.PORT||4000

app.get('/',(req, res , next)=>{
  res.render('home')
})
app.get('/login',(req,res,next)=>{
  res.render('login',{
    layout: 'login'
  })
})
app.listen(PORT,()=> console.log(`Sever running in `+PORT))
const User = require ('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = async(req,res,next)=>{
    try {
        const {name,email,password,phone,adress} = req.body

        const userExists = await User.findOne({email,phone});
        if(userExists){
            return res.status(400).json({
                message: 'Email or Phone already exists'
            })
        }
        //hash
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        //new user
        const user = new User({name,email,passwordrs:hashedPassword,phone,adress})
        const userSaved = await user.save();

        // token 
        const token = jwt.sign({userID : userSaved._id},"fakervap",{
            expiresIn:'1h',
        })

        res.status(201).json({token})
    } catch (error) {
        res.status(500).json({message: error})
    }
}
const login = async(req,res,next)=>{
    var email = req.body.email
    var password = req.body.password

    User.findOne({$or : [{email:email}]})
    .then(user=>{
        if (!user) {
            return res.status(401).json({
              message: 'Authentication failed. User not found.',
            });
          }
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.log(err)
              return res.status(401).json({
                message: 'Authentication failed. Wrong password.',
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user._id,
                },
                "fakervap",
                {
                  expiresIn: '1h',
                }
              );
              return res.status(200).json({
                message: 'Authentication successful.',
                token: token,
              });
            }
            return res.status(401).json({
              message: 'Authentication failed. Wrong password.',
            });
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    
}
module.exports ={
    register,login
}
const User = require ('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(req,res,next)=>{
    try {
        const {name,email,password,phone,adress} = req.body
        const emailRegex = /^[^\s@]+@gmail\.com$/;
        const passRegex = /^[a-zA-Z ]*$/;
        // const nameRegex =/^[a-zA-Z ]*$/;
        const phoneRegex = /^\d{10}$/ ;
        const errors = [];
        if(!passRegex || password.length<8){
          // return res.status(400).render('register',{error:'Password must be at least 8 characters',layout:'login'})
          errors.push('Password must be at least 8 characters')
        }
        if(!emailRegex.test(email)){
          // return res.status(400).render('register',{error:"Định dạng email không đúng",layout:'login'})
          errors.push('Định dạng email không đúng')
        }
        // if(!nameRegex.test(name)){
        //   errors.push('Tên không thể chứa ký tự đặc biệt ')
        // }
        if(phone.length<10||isNaN(phone)==true){
          errors.push('Số điện thoại không đúng định dạng')
        }
        if(errors.length>0){
          return res.status(400).render('register',{errors,layout:'login'})
        }
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
        const user = new User({name,email,password:hashedPassword,phone,adress})
        const userSaved = await user.save();

        // token 
        const token = jwt.sign({userID : userSaved._id},process.env.JWT_SECRET,{
            expiresIn:'1h',
        })
        const userData = {name: user.name}
        res.status(200).render('home',{userData, token})
    } catch (error) {
        res.status(500).redirect('/')
    }
}
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).render('login',{error:'Tài khoản không tồn tại'})
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).render('login',{error:"Sai mật khẩu",layout:'login'})
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    const userData = {name: user.name}
    // res.status(200).json(token)
    res.status(200).render('home',{userData, token})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};
 const logout = async(req,res,next)=>{
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);

    // Remove token from blacklist or database if necessary

    // Respond with success message
    res.json({ msg: 'User logged out successfully' });
  } catch (err) {
    // Respond with error message
    res.status(500).json({ msg: 'Server error' });
  }
 }
module.exports ={
    register,login,logout
}
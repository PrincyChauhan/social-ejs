const User = require("../Model/User");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { render } = require("ejs");

// =======================Register User ========================== //

const register = async (req, res, next) => {
    try {
        if(req.session.login){
            res.redirect('/user/home');
        }else{
            res.render('register');   
        }   
    } catch (error) {
        console.log(error);
        errorMsg = { error: "Something went wrong" };
        res.status(500).json(errorMsg);
    }
};

const home = async (req, res, next) => {
    if(req.session.login){
        const userList = await User.findAll({
                where: {
                    id : {
                    [Op.ne]: req.session.user_id
                    }
                }
            });
        res.render('home', {data : userList} ); 
    }else{
        res.redirect('/user/login');   
    }
};

const login = async (req, res, next) => {
    try {
        if(req.session.login){
            res.redirect('/user/home');
        }else{
            res.render('login');   
        }   
    } catch (error) {
        console.log(error);
        errorMsg = { error: "Something went wrong" };
        res.status(500).json(errorMsg);
    }
};

const registerUser = async (req, res, next) => {
  try {
        //check if user already exists or not with mobile 
        const user = await User.findOne({
            where: {
                mobile: req.body.mobile,
            },
        });
        // if mobile found then user exists else register themself
        if (user) {
            errorMsg = { error: "User already Exists" };
            return res.status(400).json(errorMsg);
        }
       
        var b64string = req.body.password;
      
        var buf = new Buffer.from(b64string, "base64");
        var hashedPassword = md5(buf);
        req.body.password = hashedPassword;
        
        newUser = await User.create(req.body);
        res.render('login');  
    } catch (error) {
        console.log(error);
        errorMsg = { error: "Something went wrong" };
        res.status(500).json(errorMsg);
    }
};

// =====================Login ========================== //

const loginUser = async (req, res) => {
  try {
    var buf = new Buffer.from(req.body.password, "base64");
    var hashedPassword = md5(buf);

    // if user found with mobile then generate jwt token
    const loginUser = await User.findOne({
      where: { 
        mobile: req.body.mobile,
        password: hashedPassword,
      },
    });

    if (loginUser && loginUser != null) {
        var session = req.session;
        session.login = true;
        session.user_id = loginUser.id;
        session.name = loginUser.first_name + " " + loginUser.last_name;
        res.redirect('/user/home');
    } else {
        errorMsg = { error: "Invalid Login Credentials" };
        return res.status(400).json(errorMsg);
    }
  } catch (error) {
    console.log(error)
    errorMsg = { error: "Something went wrong" };
    res.status(500).json(errorMsg);
  }
};

const logout = async (req, res, next) => {
  
    req.session.destroy(function(err){  
        if(err){  
            console.log(err);  
        }  
        else  
        {  
            res.redirect('/user/login');  
        }  
    });  
};  


module.exports = {
    registerUser,
    loginUser,
    register,
    login,
    logout,
    home,
}

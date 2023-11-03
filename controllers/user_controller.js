const UserServices = require('../services/user_service');


exports.register = async (req ,res,next)=>{
try {
    console.log(req.body);
    const {email,password} = req.body;
    if (email != null ||email != undefined && password != null ||password != undefined ) {
        
    const successRes = await UserServices.registerUser(email,password);
    res.json({status : true,success:"User Registerd Successfully"});   
    }else{
        res.json({status : false,success:"Please Enter email or password"});   
 
    }
} catch (error) {
    // throw new Error(error.toString());
    res.json({status : false,error});   
}
};

exports.login = async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error("User doesn't exist");
        }
        const isMatched = await user.comparePassword(password);
        if (isMatched === false) {
            throw new Error("Password is incorrect");
        }
        let tokenData = {_id:user._id,email: user.email};

        const token  = await UserServices.generateToken(tokenData,"*******",'1h');

        res.status(200).json({
            status: true,
            token ,
            success : "User logged in Successfully"
        });
        
    } catch (error) {
        res.json({status : false,error});   
    }
};
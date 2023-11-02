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
    
    res.json({status : false,error});   
}
};
const UserServices = require('../services/user_service');
// const Err = require('../exceptions/base_error');
// const statusCode = require('../exceptions/exception_enums');

exports.register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password , username} = req.body;


        if ((email != null && email != undefined) && (password != null && password != undefined) && (username != null && username != undefined)) {
            const user = await UserServices.checkUser(email);
            if (user) {
           return  res.status(409).json({ status: false, error: "User Already Exist" });
            }
            const successRes = await UserServices.registerUser(email, password, username);
            return  res.json({status: true, success: "User Registerd Successfully" });


        } else {
            return   res.status(400).json({ status: false, error: "Email or password are required" });

        }

    } catch (error) {
        console.log(error);
        return   res.status(500).json({ status: false, error : error.toString()});
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserServices.checkUser(email);
        if (!user) {
            return  res.status(404).json({ status: false, error: "User Not Found" });         
        }
        const isMatched = await user.comparePassword(password);
        if (isMatched === false) {
            return  res.status(401).json({ status: false, error: "Password is incorrect" });
         
            throw new Error("Password is incorrect");
        }
        let tokenData = { _id: user._id, email: user.email , username: user.username};

        const token = await UserServices.generateToken(tokenData, "*******", '36h');

        res.status(200).json({
            status: true,
            success: "User logged in Successfully",
            data:{
                _id: user._id,
                email: user.email,
                username: user.username,
                token: token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });

    } catch (error) {
        throw new Error("Password is incorrect");
     
        // res.json({ status: false, error });
    }
};
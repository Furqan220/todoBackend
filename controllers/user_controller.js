const UserServices = require('../services/user_service');
// const Err = require('../exceptions/base_error');
// const statusCode = require('../exceptions/exception_enums');

exports.register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;


        if ((email != null && email != undefined) && (password != null && password != undefined)) {
            const user = await UserServices.checkUser(email);
            if (user) {
           return  res.status(409).json({ status: false, error: "User Already Exist" });
            }
            const successRes = await UserServices.registerUser(email, password);
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
            throw new Error("User doesn't exist");
        }
        const isMatched = await user.comparePassword(password);
        if (isMatched === false) {
            throw new Error("Password is incorrect");
        }
        let tokenData = { _id: user._id, email: user.email };

        const token = await UserServices.generateToken(tokenData, "*******", '1h');

        res.status(200).json({
            status: true,
            token,
            success: "User logged in Successfully"
        });

    } catch (error) {
        res.json({ status: false, error });
    }
};
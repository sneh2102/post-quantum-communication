const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie=(id,res)=> {
    const type = "access_token";
    const token = jwt.sign({id,type}, process.env.JWT_SECRET, {expiresIn: "15d"});

    res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 15
    });
};

module.exports = generateTokenAndSetCookie;
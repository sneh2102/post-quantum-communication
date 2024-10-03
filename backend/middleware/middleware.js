const jwt = require("jsonwebtoken");
const User = require("../models/user")

const middleware = async (req,res,next) => {
    try {
    const token = req.cookies.access_token;
    if (!token) { 
        return res.status(401).json({ success: false, msg: "No token, authorization denied" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
        return res.status(401).json({ success: false, msg: "Token is not valid" });
    }
    req.user = user;
    next();
}
catch(err){
    return res.status(401).json({ success: false, msg: "Token is not valid" });
}

}

module.exports = middleware;

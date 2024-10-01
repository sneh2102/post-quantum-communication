const jwt = require("jsonwebtoken");

const middleware =(req,res,next) => {
    try {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ success: false, msg: "No token, authorization denied" });
    }

    token = token.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decode._id;
    next();
}
catch(err){
    return res.status(401).json({ success: false, msg: "Token is not valid" });
}

}

module.exports = middleware;

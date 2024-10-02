const User = require('../models/user');

async function getUser(req, res) {
    try {
        const loggedInUser = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } });

        res.status(200).json(filteredUser);
    }
    catch (err) {
        console.log("error in getUser", err)
        res.status(500).json({ error: err.message });
    }
}


module.exports = {getUser};
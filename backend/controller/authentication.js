const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendEmail = require("../service/sendEmail");
const generateTokenAndSetCookie = require("../service/generateToken");
async function register(req, res) {
  try {
      const { username, email, password, birthday, phoneNo, gender } = req.body;

      if (!username || !email || !password || !birthday || !phoneNo || !gender) {
          return res.status(400).send("All input is required");
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).send("User already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
          username,
          email,
          password: hashedPassword,
          birthday,
          phoneNo,
          gender,
          profilePicture: gender=="male"?`https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`,
          confirmationStatus: false,
      });
      
          await user.save();

          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "20m" });
          const url = `http://localhost:5000/api/v1/auth/confirmation/${token}`;
          const subject = "Email Confirmation"; 
          const content = `Please click this link to confirm your email: <a href="${url}">${url}</a>`;

          await sendEmail(email, subject, content);

          res.status(200).send("User created. Please check your email to confirm your account");


  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during registration");
  }
}

async function confirmation(req, res) {
    const { token } = req.params;
    try{
        if (token === "") {
        res.status(400).send("Token is required");
        }
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(400).send("Invalid token");
        }
        const { email } = decoded;
        console.log(email);
        
        const user =  await User.findOne({ email: email });
        console.log(user.email);
        if (!user) {
            res.status(400).send("User does not exist");
        }
        user.confirmationStatus = true;
        await user.save();
        res.status(200).send("Email confirmed");
        });
      }
      catch (error) {
        console.error(error); 
        res.status(500).send("An error occurred during confirmation");
      }
}

async function login(req, res) { 
  try {
    const { email, password } = req.body;

    // Check if email or password is empty
    if (!email || !password) {
      return res.status(400).send("All input is required");  // Return here to stop further execution
    }

    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).send("User does not exist");  // Return here
    }

    // Check if email is confirmed
    if (!user.confirmationStatus) {
      return res.status(400).send("Email not confirmed");  // Return here
    }

    // Check if password is valid
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });  // Return here
    }

    // If all checks pass, generate the token and send a response
    const token = generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      profilePicture: user.profilePicture,
      token: token, // Sending token is optional since it's in the cookie
    });

  } catch (err) {
    console.error(err);  // For debugging
    return res.status(500).send("Server error");
  }
}


async function logout(req, res) {
  res.cookie("access_token","",{maxAge:0});
  res.clearCookie("access_token");
  res.status(200).send("Logged out");
}

module.exports = { register, confirmation, login, logout };
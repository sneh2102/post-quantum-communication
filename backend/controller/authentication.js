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
          const url = `http://localhost:5000/api/v1/confirmation/${token}`;
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
  const { email, password } = req.body;
    if (email === "" || password === "") {
      res.status(400).send("All input is required");
    }
    console.log(email, password);
    const user = await User.findOne({email: email});
    console.log(user);
    const id = user._id;
    if (!user) {
      res.status(400).send("User does not exist");
    }
    if (!user.confirmationStatus) {
      res.status(400).send("Email not confirmed");
    }
    const valid = bcrypt.compare(password, user.password) 
    if (!valid) {
      res.status(400).send("Invalid password");
    }
    
    if (user){
      await generateTokenAndSetCookie(email, res);
      res.status(200).json({id, email, username: user.username, profilePicture: user.profilePicture});
    }
    
}


async function logout(req, res) {
  res.cookie("access_token","",{maxAge:0});
  res.clearCookie("access_token");
  res.status(200).send("Logged out");
}

module.exports = { register, confirmation, login, logout };
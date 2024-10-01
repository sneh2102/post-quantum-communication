const nodemailer = require("nodemailer");
     
const sendEmail = async (email, subject, content) => {

 // Save the user to the database
 const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(400).send("Error sending email");
        }
        console.log("Email sent: " + info.response);
        return "Email Sent"
    });
}

module.exports = sendEmail;
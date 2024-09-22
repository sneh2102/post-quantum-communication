const User = require("../models/user");

export function login(req, res) {
  const { email, password } = req.body;
    if (email === "" || password === "") {
      res.status(400).send("All input is required");
    }
    res.status(200).send("Login Successful");
}
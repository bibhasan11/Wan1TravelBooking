import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//user registration
export const register = async (req, res) => {
  try {
    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
      redirectUrl: "login.html", // Redirect to the login page after successful registration
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};


//user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const checkCorrectPassword = await bcrypt.compare(password, user.password);

    if (!checkCorrectPassword)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d" }
    );

    const redirectUrl = user.role === 'admin' ? 'tour.html' : 'index.html';

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token: token,
        redirectUrl: redirectUrl,
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};




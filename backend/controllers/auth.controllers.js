import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    let { fullName, username, password, confirmPassword, gender, profilePic } =
      req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    //hash password
    const salt = await bcrypt.genSalt(10); //higher the better but higher value will take more time to generate
    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    console.log(profilePic);
    if (!profilePic) {
      profilePic = gender === "male" ? boyProfilePic : girlProfilePic;
    }

    const newUser = await User({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic,
    });
    if (newUser) {
      //generate JWT token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (err) {
    console.log("error in signup controllers", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isMatch = await bcrypt.compare(password, user?.password || "");
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    //generate JWT token
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("error in login controllers", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("error in logout controllers", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

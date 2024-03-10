import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsersByQuery = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const query = req.query.search;
    let filter = { _id: { $ne: loggedInUser } };
    if (query) {
      filter = {
        ...filter,
        $or: [
          { fullName: { $regex: query, $options: "i" } },
          { username: { $regex: query, $options: "i" } }, //case insensitive search
        ],
      };
    }
    const allUsers = await User.find(filter).select("-password");
    res.status(200).json(allUsers);
  } catch (err) {
    console.log("error in get users controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (err) {
    console.log("error in get users controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

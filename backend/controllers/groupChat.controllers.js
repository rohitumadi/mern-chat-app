import Conversation from "../models/conversation.model.js";

export const createGroupChat = async (req, res) => {
  try {
    const users = req.body.users;

    const groupName = req.body.groupName;
    const loggedInUser = req.user;
    if (!users || !groupName) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    if (users.length < 2) {
      return res.status(400).json({ message: "Please enter atleast 2 users" });
    }

    users.push(loggedInUser._id);
    const groupChat = await Conversation.create({
      isGroupChat: true,
      groupChatName: groupName,
      groupAdmin: loggedInUser,
      participants: users,
    });
    groupChat.save();
    res.status(201).json(groupChat);
  } catch (err) {
    console.log("error in create group chat controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const renameGroupChat = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { groupName } = req.body;
    const loggedInUser = req.user;
    if (!groupName) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    const groupChat = await Conversation.findById(groupId);
    if (!groupChat) {
      return res.status(404).json({ error: "Group chat not found" });
    }
    if (groupChat.groupAdmin.toString() !== loggedInUser._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only group admin can rename group chat" });
    }
    groupChat.groupChatName = groupName;
    await groupChat.save();
    res.status(200).json(groupChat);
  } catch (err) {
    console.log("error in rename group chat controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const loggedInUser = req.user;
    if (!userId) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    const groupChat = await Conversation.findById(groupId);
    if (!groupChat) {
      return res.status(404).json({ message: "Group chat not found" });
    }
    if (groupChat.groupAdmin.toString() !== loggedInUser._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only group admin can add user to group chat" });
    }
    groupChat.participants.push(userId);
    await groupChat.save();
    res.status(200).json(groupChat);
  } catch (err) {
    console.log("error in add user controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { groupId } = req.params;

    const { userId } = req.body;
    const loggedInUser = req.user;
    if (!userId) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }

    const groupChat = await Conversation.findById(groupId);
    if (!groupChat) {
      return res.status(404).json({ message: "Group chat not found" });
    }
    if (
      userId !== loggedInUser._id.toString() &&
      groupChat.groupAdmin.toString() !== loggedInUser._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Only group admin can remove user from group chat" });
    }
    groupChat.participants = groupChat.participants.filter(
      (user) => user.toString() !== userId
    );
    await groupChat.save();
    res.status(200).json(groupChat);
  } catch (err) {
    console.log("error in remove user controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

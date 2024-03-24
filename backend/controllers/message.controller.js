import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const { message } = req.body;
    if (!message)
      return res.status(400).json({ error: "Message content cannot be empty" });
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      //match all fields
      _id: chatId,
    });
    if (!conversation) {
      return res.status(404).json({ error: "Chat not found" });
    }
    let newMessage = new Message({
      senderId,
      message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);
    const receiverIds = conversation.participants;
    // await conversation.save();
    // await newMessage.save();
    //this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    newMessage = newMessage.toJSON();
    newMessage.chatId = conversation._id.toString();
    //SOCKET IO functionality will go here
    const receiverSocketIds = getReceiverSocketId(receiverIds);

    if (receiverSocketIds) {
      //io.to is use to send events to specific client
      receiverSocketIds.map((receiverSocketId) => {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      });
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("error in send message controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      _id: chatId,
    }).populate("messages"); //mongoose will populate messages instead of id
    if (!conversation) return res.status(404).json({ error: "Chat not found" });

    res.status(200).json(conversation.messages);
  } catch (err) {
    console.log("error in get message controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getChats = async (req, res) => {
  try {
    const senderId = req.user._id;
    const chats = await Conversation.find({
      participants: { $all: [senderId] },
    }).populate([
      {
        path: "messages",
        options: { sort: { createdAt: -1 }, perDocumentLimit: 1 },
      },
      {
        path: "participants",
        select: "-password",
        match: { _id: { $ne: senderId } },
      },
    ]); //mongoose will populate messages instead of id
    if (!chats) return res.status(404).json({ error: "Chat not found" });

    res.status(200).json(chats);
  } catch (err) {
    console.log("error in get chats controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUser = req.user;
    if (!userId) {
      return res.status(400).json({ message: "Please enter all the fields" });
    }
    const isExistingChat = await Conversation.findOne({
      participants: { $all: [loggedInUser._id, userId] },
      isGroupChat: false,
    });
    if (isExistingChat) {
      return res.status(400).json({ message: "Chat already exists" });
    }
    const chat = await Conversation.create({
      participants: [loggedInUser._id, userId],
    });
    res.status(201).json(chat);
  } catch (err) {
    console.log("error in create chat controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

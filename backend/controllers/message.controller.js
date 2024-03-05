import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      //match all fields
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) conversation.messages.push(newMessage._id);

    // await conversation.save();
    // await newMessage.save();
    //this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    //SOCKET IO functionality will go here
    const receiverSocketId = getReceiverId(receiverId);
    if (receiverSocketId)
      //io.to is use to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("error in send message controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages"); //mongoose will populate messages instead of id
    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (err) {
    console.log("error in get message controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const chats = await Conversation.find({
      participants: { $all: [senderId] },
    }).populate([
      {
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      },
      {
        path: "participants",
        select: "-password",
        match: { _id: { $ne: senderId } },
      },
    ]); //mongoose will populate messages instead of id
    if (!chats) return res.status(200).json([]);

    res.status(200).json(chats);
  } catch (err) {
    console.log("error in get chats controller", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

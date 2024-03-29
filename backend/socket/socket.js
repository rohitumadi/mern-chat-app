import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000, //wait 60 seconds before closing connection
  // to save bandwidth
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const userSocketMap = {}; //userId:socket
export function getReceiverSocketId(receiverIds) {
  return receiverIds.map((receiverId) => userSocketMap[receiverId]);
}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log(userSocketMap);

  //socket.on() is used to listen to the events can be used
  //both client and server
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };

import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();
export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(
    function () {
      if (authUser) {
        //https://chat-app-prod-5crw.onrender.com/
        //http://localhost:8000
        const socket = io("http://localhost:8000", {
          query: { userId: authUser._id },
        });

        socket.on("getOnlineUsers", (users) => setOnlineUsers(users));
        setSocket(socket);

        return () => {
          socket.close();
        };
      } else {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      }
    },
    [authUser]
  );
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
}

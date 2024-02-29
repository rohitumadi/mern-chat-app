import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";

export function useListenMessages() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationContext();

  useEffect(
    function () {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      });

      return () => socket?.off("newMessage");
    },
    [socket, setMessages, messages]
  );
}

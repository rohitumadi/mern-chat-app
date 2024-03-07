import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";

export function useListenMessages() {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } =
    useConversationContext();

  useEffect(
    function () {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        if (selectedConversation._id !== newMessage.senderId) return;
        setMessages([...messages, newMessage]);
      });

      return () => socket?.off("newMessage");
    },
    [setMessages, messages, socket, selectedConversation]
  );
}

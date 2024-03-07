import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";

export function useListenMessages() {
  const { socket } = useSocketContext();
  const { messages, selectedConversation, dispatch } = useConversationContext();

  useEffect(
    function () {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        if (selectedConversation._id !== newMessage.senderId) return;
        dispatch({ type: "message/received", payload: newMessage });
      });

      return () => socket?.off("newMessage");
    },
    [messages, socket, selectedConversation, dispatch]
  );
}

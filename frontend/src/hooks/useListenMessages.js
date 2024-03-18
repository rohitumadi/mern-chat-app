import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";
import { useGetChats } from "./useGetChats";
import { useMessageContext } from "../context/MessageContext";

export function useListenMessages() {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversationContext();
  const { messages, dispatch } = useMessageContext();
  const { getChats } = useGetChats();
  useEffect(
    function () {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;

        const isSelectedReceiverId =
          selectedConversation?._id === newMessage.chatId;
        if (!isSelectedReceiverId) {
          getChats();
          return;
        }
        getChats();

        dispatch({ type: "message/received", payload: newMessage });
      });

      return () => socket?.off("newMessage");
    },
    [messages, socket, selectedConversation, dispatch, getChats]
  );
}

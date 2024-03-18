import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";
import { useGetChats } from "./useGetChats";

export function useListenMessages() {
  const { socket } = useSocketContext();
  const { messages, selectedConversation, dispatch } = useConversationContext();
  const { getChats } = useGetChats();
  useEffect(
    function () {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const isSelectedReceiverId = selectedConversation?.receiverIds.includes(
          newMessage.senderId
        );
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

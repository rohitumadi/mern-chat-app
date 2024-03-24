import { useEffect } from "react";
import { useConversationContext } from "../context/ConversationContext";
import { useSocketContext } from "../context/SocketContext";
import { useGetChats } from "./useGetChats";
import { useMessageContext } from "../context/MessageContext";
import { useAuthContext } from "../context/AuthContext";

export function useListenMessages() {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const { dispatch } = useMessageContext();
  const { refetch } = useGetChats();
  useEffect(
    function () {
      socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const isSelectedReceiverId =
          newMessage.senderId !== authUser._id &&
          selectedConversation?._id === newMessage.chatId;
        if (!isSelectedReceiverId) {
          refetch();
          return;
        }
        refetch();

        dispatch({ type: "message/received", payload: newMessage });
      });

      return () => socket?.off("newMessage");
    },
    [socket, selectedConversation, dispatch, refetch, authUser]
  );
}

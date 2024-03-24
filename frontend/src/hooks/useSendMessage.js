import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";
import { useGetChats } from "./useGetChats";
import { useState } from "react";
import { useMessageContext } from "../context/MessageContext";

export function useSendMessage() {
  const navigate = useNavigate();
  const { selectedConversation } = useConversationContext();
  const { dispatch } = useMessageContext();
  const { refetch } = useGetChats();
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  async function sendMessage(message) {
    try {
      setSendMessageLoading(true);
      const chatId = selectedConversation._id;
      const res = await fetch(`/api/messages/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");

      if (rateLimitRemaining === "1") {
        navigate("/rate-limit");
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      dispatch({ type: "message/sent", payload: data });

      refetch();
    } catch (error) {
      console.error("Error while sending message", error.message);
      toast.error(error.message);
    } finally {
      setSendMessageLoading(false);
    }
  }
  return { sendMessage, sendMessageLoading };
}

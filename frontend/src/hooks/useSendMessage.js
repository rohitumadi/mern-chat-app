import { useState } from "react";

import toast from "react-hot-toast";
import { useConversationContext } from "../context/ConversationContext";

export function useSendMessage() {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } =
    useConversationContext();
  async function sendMessage(message) {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      console.log("Error while sending message", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return { loading, sendMessage };
}

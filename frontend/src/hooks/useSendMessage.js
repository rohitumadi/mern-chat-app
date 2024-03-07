import { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";

export function useSendMessage() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const { messages, setMessages, selectedConversation } =
    useConversationContext();
  async function sendMessage(message) {
    try {
      setLoading(true);
      const receiverId = selectedConversation._id;
      const res = await fetch(`/api/messages/send/${receiverId}`, {
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

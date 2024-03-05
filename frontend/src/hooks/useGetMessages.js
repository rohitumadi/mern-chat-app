import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";

export function useGetMessages() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const { messages, setMessages, selectedConversation } =
    useConversationContext();

  useEffect(
    function () {
      async function getMessages() {
        try {
          setLoading(true);
          const res = await fetch(`/api/messages/${selectedConversation._id}`);
          const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
          if (rateLimitRemaining === "1") {
            navigate("/rate-limit");
          }
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setMessages(data);
        } catch (error) {
          console.log("Error while fetching messages", error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
      if (selectedConversation?._id) getMessages();
    },
    [selectedConversation._id, setMessages, navigate]
  );
  return { messages, loading };
}

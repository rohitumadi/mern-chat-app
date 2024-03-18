import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";

export function useGetMessages() {
  const navigate = useNavigate();
  const { selectedConversation, dispatch } = useConversationContext();
  const [getMessagesLoading, setGetMessagesLoading] = useState(false);

  useEffect(
    function () {
      async function getMessages() {
        try {
          setGetMessagesLoading(true);
          const chatId = selectedConversation._id;
          const res = await fetch(`/api/messages/${chatId}`);
          const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
          if (rateLimitRemaining === "1") {
            navigate("/rate-limit");
          }
          const data = await res.json();

          if (data.error) {
            throw new Error(data.error);
          }
          dispatch({ type: "messages/loaded", payload: data });
        } catch (error) {
          console.error("Error while fetching messages", error.message);
          toast.error(error.message);
        } finally {
          setGetMessagesLoading(false);
        }
      }
      if (selectedConversation?._id) getMessages();
    },
    [selectedConversation, navigate, dispatch]
  );
  return { getMessagesLoading };
}

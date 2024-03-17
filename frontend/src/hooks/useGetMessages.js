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
      console.count("useEffect in useGetMessages");
      async function getMessages() {
        try {
          console.log("getting messages");
          setGetMessagesLoading(true);
          const receiverId =
            selectedConversation.receiverId || selectedConversation._id;
          console.log("receiverId", receiverId);
          const res = await fetch(`/api/messages/${receiverId}`);
          const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
          if (rateLimitRemaining === "1") {
            navigate("/rate-limit");
          }
          const data = await res.json();

          if (data.error) {
            throw new Error(data.error);
          }
          console.log("got messages", data);
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

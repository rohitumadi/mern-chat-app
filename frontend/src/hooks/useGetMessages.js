import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";

export function useGetMessages() {
  const navigate = useNavigate();

  const { selectedConversation, dispatch } = useConversationContext();

  useEffect(
    function () {
      console.count("useEffect in useGetMessages");
      async function getMessages() {
        try {
          console.log("getting messages");
          dispatch({ type: "messages/loading" });

          const receiverId =
            selectedConversation.receiverId || selectedConversation._id;
          const res = await fetch(`/api/messages/${receiverId}`);
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
        }
      }
      if (selectedConversation?._id) getMessages();
    },
    [selectedConversation, navigate, dispatch]
  );
}

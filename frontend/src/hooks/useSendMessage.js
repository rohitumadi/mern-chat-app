import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";
import { useGetChats } from "./useGetChats";

export function useSendMessage() {
  const navigate = useNavigate();
  const { getChats } = useGetChats();

  const { dispatch, selectedConversation } = useConversationContext();
  async function sendMessage(message) {
    try {
      dispatch({ type: "message/sending" });
      const receiverId =
        selectedConversation.receiverId || selectedConversation._id;
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
      dispatch({ type: "message/sent", payload: data });

      getChats();
    } catch (error) {
      console.error("Error while sending message", error.message);
      toast.error(error.message);
    }
  }
  return { sendMessage };
}

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";
import { useGetChats } from "./useGetChats";

export function useCreateSingleChat() {
  const navigate = useNavigate();
  const { dispatch } = useConversationContext();
  const { getChats } = useGetChats();
  async function createSingleChat(data) {
    try {
      //call create chat api
      const res = await fetch("/api/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
      if (rateLimitRemaining === "1") {
        navigate("/rate-limit");
      }
      const json = await res.json();
      if (json.error) {
        throw new Error(json.error);
      }

      // get new chats api
      getChats();
      //set selected chat to new chat
      dispatch({ type: "chat/created", payload: json });
    } catch (error) {
      console.log("Error while creating chat", error.message);
      toast.error(error.message);
    }
  }
  return { createSingleChat };
}

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";

export function useCreateGroupChat() {
  const navigate = useNavigate();
  const { dispatch } = useConversationContext();
  async function createGroupChat(data) {
    try {
      const res = await fetch("/api/group/", {
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
      dispatch({ type: "groupChat/created", payload: json });
    } catch (error) {
      console.log("Error while creating group chat", error.message);
      toast.error(error.message);
    }
  }
  return { createGroupChat };
}

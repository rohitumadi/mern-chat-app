import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";
import toast from "react-hot-toast";
import { useState } from "react";
import { useGetChats } from "./useGetChats";

export function useRenameGroupChat() {
  const navigate = useNavigate();
  const { refetch } = useGetChats();
  const [renameLoading, setRenameLoading] = useState(false);
  async function renameGroupChat(data) {
    const { groupId } = data;
    try {
      setRenameLoading(true);
      const res = await fetch(`/api/group/${groupId}`, {
        method: "PATCH",
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

      toast.success("Group chat updated successfully");
      refetch();
      // dispatch({ type: "groupChat/created", payload: json });
    } catch (error) {
      console.log("Error while creating group chat", error.message);
      toast.error(error.message);
    } finally {
      setRenameLoading(false);
    }
  }
  return { renameGroupChat, renameLoading };
}

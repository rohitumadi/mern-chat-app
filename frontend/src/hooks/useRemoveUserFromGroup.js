import { useNavigate } from "react-router-dom";
import { useGetChats } from "./useGetChats";
import { useState } from "react";
import toast from "react-hot-toast";

export function useRemoveUserFromGroup() {
  const navigate = useNavigate();
  const { refetch } = useGetChats();
  const [removeUserLoading, setRemoveUserLoading] = useState(false);

  async function removeUserFromGroup(data, action) {
    const { groupId } = data;
    try {
      setRemoveUserLoading(true);
      const res = await fetch(`/api/group/remove-user/${groupId}`, {
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
      refetch();
      if (action === "leave") {
        toast.success("You left the group");
        document.getElementById("my_modal_4").close();
      } else if (action === "remove")
        toast.success("User removed successfully");
    } catch (error) {
      console.log("Error while removing user to group chat", error.message);
      toast.error(error.message);
    } finally {
      setRemoveUserLoading(false);
    }
  }

  return { removeUserLoading, removeUserFromGroup };
}

import { useNavigate } from "react-router-dom";
import { useGetChats } from "./useGetChats";
import { useState } from "react";
import toast from "react-hot-toast";

export function useAddUserToGroup() {
  const navigate = useNavigate();
  const { refetch } = useGetChats();
  const [addUserLoading, setAddUserLoading] = useState(false);

  async function addUserToGroup(data) {
    const { groupId } = data;
    try {
      setAddUserLoading(true);
      const res = await fetch(`/api/group/add-user/${groupId}`, {
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

      toast.success("User added successfully");
      refetch();
    } catch (error) {
      console.log("Error while adding user to group chat", error.message);
      toast.error(error.message);
    } finally {
      setAddUserLoading(false);
    }
  }

  return { addUserToGroup, addUserLoading };
}

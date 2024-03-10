import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConversationContext } from "../context/ConversationContext";
import { useLogout } from "./useLogout";
import toast from "react-hot-toast";

export function useGetChats() {
  const navigate = useNavigate();
  // const { logout } = useLogout();
  const { dispatch } = useConversationContext();

  useEffect(
    function () {
      console.count("useEffect");
      async function getChats() {
        console.log("getting chats");

        dispatch({ type: "chats/loading" });

        try {
          const res = await fetch("/api/messages");
          const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
          if (rateLimitRemaining === "1") {
            navigate("/rate-limit");
          }
          const data = await res.json();
          dispatch({ type: "chats/loaded", payload: data });
          if (data.error) {
            if (data.error === "Token Expired") {
              toast.error("Login expired. Please login again");
              // logout();
            }
          }
        } catch (err) {
          toast.error("Could not load conversations");
          console.log("Error while fetching conversations", err.message);
        }
      }
      getChats();
    },
    [navigate, dispatch]
  );
}

import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../services/apiChats";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "./useLogout";

export function useConversations() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const {
    isRefetching: loading,
    data: conversations,
    rateLimitReached,
    loginExpired,
    error,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  useEffect(
    function () {
      if (loginExpired) logout();
    },
    [logout, loginExpired]
  );

  useEffect(
    function () {
      if (rateLimitReached) {
        navigate("/rate-limit");
      }
    },
    [navigate, rateLimitReached]
  );
  return { loading, conversations, error };
}

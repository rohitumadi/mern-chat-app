import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getChats } from "../services/apiChats";
import { useLogout } from "./useLogout";

export function useGetChats() {
  const navigate = useNavigate();

  const {
    isRefetching: loading,
    data: chats,
    rateLimitReached,
    loginExpired,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });
  const { logout } = useLogout();
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

  return { loading, chats, error };
}

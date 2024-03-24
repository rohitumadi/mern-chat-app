import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getChats } from "../services/getChatsApi";

export function useGetChats() {
  const navigate = useNavigate();
  // const { logout } = useLogout();
  const {
    isRefetching: loading,
    data: chats,
    rateLimitReached,
    loginExpired,
    refetch,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  if (rateLimitReached) {
    navigate("/rate-limit");
  }

  return { loading, chats, error, refetch };
}

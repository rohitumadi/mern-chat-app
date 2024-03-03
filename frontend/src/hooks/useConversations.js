import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../services/apiChats";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useConversations() {
  const navigate = useNavigate();
  const {
    loading,
    data: conversations,
    rateLimitReached,
    error,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

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

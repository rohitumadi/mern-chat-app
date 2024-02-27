import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../services/apiChats";

export function useConversations() {
  const {
    loading,
    data: conversations,
    error,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });
  return { loading, conversations, error };
}

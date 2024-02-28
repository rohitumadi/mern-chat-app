import { useEffect, useState } from "react";
import { useConversationContext } from "../context/ConversationContext";
import toast from "react-hot-toast";

export function useGetMessages() {
  const [loading, setLoading] = useState();
  const { messages, setMessages, selectedConversation } =
    useConversationContext();

  useEffect(
    function () {
      async function getMessages() {
        try {
          setLoading(true);
          const res = await fetch(`/api/messages/${selectedConversation._id}`);
          const data = await res.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setMessages(data);
        } catch (error) {
          console.log("Error while fetching messages", error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      }
      if (selectedConversation?._id) getMessages();
    },
    [selectedConversation._id, setMessages]
  );
  return { messages, loading };
}

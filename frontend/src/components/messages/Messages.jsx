import { useEffect } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

function Messages() {
  const { messages, loading } = useGetMessages();

  useEffect(function () {}, []);

  return (
    <div className="px-4  overflow-auto">
      {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">No messages yet</p>
      )}
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
    </div>
  );
}

export default Messages;

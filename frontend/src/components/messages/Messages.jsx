import { useEffect, useRef } from "react";
import { useConversationContext } from "../../context/ConversationContext";
import { useGetMessages } from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

function Messages() {
  const { getMessagesLoading } = useGetMessages();

  const { messages } = useConversationContext();
  const lastMessageRef = useRef();

  useEffect(
    function () {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    [messages]
  );
  return (
    <div className="px-4  overflow-auto">
      {getMessagesLoading &&
        [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!getMessagesLoading && messages.length === 0 && (
        <p className="text-center">No messages yet</p>
      )}
      {!getMessagesLoading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
    </div>
  );
}

export default Messages;

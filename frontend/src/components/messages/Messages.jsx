import { useEffect, useRef } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useListenMessages } from "../../hooks/useListenMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import { useConversationContext } from "../../context/ConversationContext";

function Messages() {
  useGetMessages();
  useListenMessages();
  const { messages, isGettingMessage } = useConversationContext();
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
      {isGettingMessage &&
        [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!isGettingMessage && messages.length === 0 && (
        <p className="text-center">No messages yet</p>
      )}
      {!isGettingMessage &&
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

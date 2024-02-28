import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContext";
import { extractTime } from "../../utils/extractTime";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const fromMe = message.senderId === authUser._id;
  const chatClassMe = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleClass = fromMe ? "bg-secondary" : "";
  const formattedTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassMe}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleClass}`}>{message.message}</div>
      <div className="chat-footer">
        <time className="text-xs opacity-50">{formattedTime}</time>
      </div>
    </div>
  );
}

export default Message;

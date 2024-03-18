import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContext";
import { extractTime } from "../../utils/extractTime";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversationContext();
  const fromMe = message.senderId === authUser._id;
  const senderName =
    !fromMe &&
    selectedConversation.participants.find((p) => p._id === message.senderId)
      .fullName;
  const chatClassMe = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.participants.find((p) => p._id === message.senderId)
        .profilePic;
  const bubbleClass = fromMe ? "bg-secondary" : "";
  const formattedTime = extractTime(message.createdAt);
  const shouldShake = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassMe}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble ${bubbleClass} ${shouldShake} flex flex-col `}
      >
        {senderName && (
          <span className="text-xs text-green-400">{senderName}</span>
        )}
        {message.message}
      </div>
      <div className="chat-footer">
        <time className="text-xs opacity-50">{formattedTime}</time>
      </div>
    </div>
  );
}

export default Message;

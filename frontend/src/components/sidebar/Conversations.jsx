import { useConversationContext } from "../../context/ConversationContext";
import Conversation from "./Conversation";

function Conversations() {
  let { chats } = useConversationContext();
  chats = chats?.map((chat) => {
    const participant = chat.participants[0];
    const lastMessage = chat.lastMessage || chat.messages[0];
    const id = participant._id;
    const lastMessageTime = chat.lastMessageTime || chat.updatedAt;

    return {
      _id: id,
      fullName: participant.fullName,
      profilePic: participant.profilePic,
      lastMessage: lastMessage.message ? lastMessage.message : lastMessage,
      lastMessageTime,
    };
  });
  chats = chats.sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );
  return (
    <div className="flex flex-col py-2 overflow-auto ">
      <div className="flex justify-center flex-col">
        {chats?.map((chat, idx) => (
          <Conversation
            key={chat._id}
            chat={chat}
            lastIdx={idx === chats.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Conversations;

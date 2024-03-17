import { useConversationContext } from "../../context/ConversationContext";
import Conversation from "./Conversation";
import { groupProfilePic } from "../../../public/img/groupChatPic";
function Conversations() {
  let { chats } = useConversationContext();
  console.log(chats);
  chats = chats?.map((chat) => {
    const participants = chat.isGroupChat
      ? chat.participants.map((p) => p._id)
      : chat.participants[0];
    const groupChatName = chat.isGroupChat ? chat.groupChatName : "";
    const lastMessage = chat.messages[0] || "";
    const id = chat._id;
    const lastMessageTime = chat.updatedAt;

    return {
      _id: id,
      receiverId: chat.isGroupChat ? participants : participants._id,
      isGroupChat: chat.isGroupChat,
      chatName: chat.isGroupChat ? chat.groupChatName : participants.fullName,
      participants,
      profilePic: chat.isGroupChat ? groupProfilePic : participants.profilePic,
      lastMessage: lastMessage.message ? lastMessage.message : lastMessage,
      lastMessageTime,
    };
  });
  chats = chats.sort(
    (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );
  return (
    <div className="flex flex-col py-2 overflow-auto  ">
      <div className="flex justify-center flex-col ">
        {chats?.map((chat, idx) => (
          <Conversation
            dividerOn={true}
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

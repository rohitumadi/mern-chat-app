import { useConversationContext } from "../../context/ConversationContext";
import Conversation from "./Conversation";
import { groupProfilePic } from "../../../public/img/groupChatPic";
function Conversations() {
  let { chats } = useConversationContext();
  console.log(chats);
  chats = chats?.map((chat) => {
    const participantsIds = chat.isGroupChat
      ? chat.participants.map((p) => p._id)
      : [chat.participants[0]._id];
    const participants = chat.participants;
    const lastMessage = chat.messages[0] || "";
    const id = chat._id;
    const lastMessageTime = chat.updatedAt;
    const chatName = chat.isGroupChat
      ? chat.groupChatName
      : participants[0].fullName;
    return {
      _id: id,
      receiverIds: participantsIds,
      participants,
      groupAdmin: chat.groupAdmin,
      isGroupChat: chat.isGroupChat,
      chatName,
      profilePic: chat.isGroupChat
        ? groupProfilePic
        : participants[0].profilePic,
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

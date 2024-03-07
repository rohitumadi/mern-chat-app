import { useGetChats } from "../../hooks/useGetChats";
import Conversation from "./Conversation";

function Conversations() {
  let { chats } = useGetChats();
  chats = chats?.map((chat) => {
    const participant = chat.participants[0];
    const lastMessage = chat.messages[0];
    const id = participant._id;

    return {
      _id: id,
      fullName: participant.fullName,
      profilePic: participant.profilePic,
      lastMessage: lastMessage?.message,
    };
  });
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

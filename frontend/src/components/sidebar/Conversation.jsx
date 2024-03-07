import { useConversationContext } from "../../context/ConversationContext";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ chat, lastIdx }) {
  const { fullName, profilePic, lastMessage } = chat;

  const { selectedConversation, setSelectedConversation } =
    useConversationContext();

  const isSelected = selectedConversation?._id === chat._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(chat._id);

  return (
    <>
      <div
        className={`flex gap-2 ${
          isSelected ? "bg-secondary" : ""
        } hover:bg-secondary rounded w-full p-2 py-1 items-center cursor-pointer`}
        onClick={() => setSelectedConversation(chat)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} />
          </div>
        </div>

        <div className=" flex flex-1  ">
          <div className="flex flex-1 flex-col justify-between">
            <p className="font-bold text-gray-200">{fullName}</p>
            <span className="text-xs">
              {lastMessage && lastMessage.substring(0, 20)}
            </span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider" />}
    </>
  );
}

export default Conversation;

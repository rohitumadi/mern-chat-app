import { useConversationContext } from "../../context/ConversationContext";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ chat, lastIdx, dividerOn, onClick }) {
  const { chatName, profilePic, lastMessage, receiverIds } = chat;

  const { selectedConversation, dispatch } = useConversationContext();
  const isSelected = selectedConversation?._id === chat._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = receiverIds?.some((receiverId) =>
    onlineUsers.includes(receiverId)
  );
  const handleClick = () => {
    dispatch({ type: "chat/selected", payload: chat });
  };

  return (
    <>
      <div
        className={`flex gap-2  ${
          isSelected ? "bg-secondary" : ""
        } hover:bg-secondary rounded w-full p-2 py-1  items-center  cursor-pointer`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} />
          </div>
        </div>

        <div className=" flex flex-1  ">
          <div className="flex flex-1 flex-col justify-between">
            <p className="font-bold capitalize text-gray-200">{chatName}</p>
            <span className="text-xs">
              {lastMessage && lastMessage.substring(0, 20)}
            </span>
          </div>
        </div>
      </div>
      {!lastIdx && dividerOn && <div className="divider " />}
    </>
  );
}

export default Conversation;

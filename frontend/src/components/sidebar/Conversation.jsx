import { useConversationContext } from "../../context/ConversationContext";
import { useSocketContext } from "../../context/SocketContext";

function Conversation({ conversation, lastIdx }) {
  const { fullName, profilePic } = conversation;
  const { selectedConversation, setSelectedConversation } =
    useConversationContext();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  console.log(onlineUsers);

  return (
    <>
      <div
        className={`flex gap-2 ${
          isSelected ? "bg-secondary" : ""
        } hover:bg-secondary rounded p-2 py-1 items-center cursor-pointer`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} />
          </div>
        </div>

        <div className=" flex flex-1  ">
          <div className="flex flex-1 justify-between">
            <p className="font-bold text-gray-200">{fullName}</p>
            {/* <span>Last message...</span> */}
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider" />}
    </>
  );
}

export default Conversation;

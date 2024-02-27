import { useConversationContext } from "../../context/ConversationContext";
import { useConversations } from "../../hooks/useConversations";
import Conversation from "./Conversation";

function Conversations() {
  const { loading, conversations } = useConversations();

  return (
    <div className="flex flex-col py-2 overflow-auto ">
      {loading ? (
        <span className="loading loading-spinner text-primary mr-2"></span>
      ) : (
        conversations?.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
}

export default Conversations;

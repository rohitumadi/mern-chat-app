import { useConversations } from "../../hooks/useConversations";
import Conversation from "./Conversation";

function Conversations() {
  const { loading, conversations, refetch } = useConversations();

  return (
    <div className="flex flex-col py-2 overflow-auto ">
      {!loading && (
        <button
          className="btn btn-primary btn-xs rounded-sm w-fit cursor-pointer mb-2"
          onClick={() => refetch()}
        >
          Refresh
        </button>
      )}

      <div className="flex justify-center flex-col">
        {loading ? (
          <span className="loading loading-spinner text-primary mr-2 "></span>
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
    </div>
  );
}

export default Conversations;

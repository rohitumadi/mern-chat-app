import { useEffect } from "react";
import { useConversationContext } from "../../context/ConversationContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  const { selectedConversation, dispatch } = useConversationContext();

  useEffect(() => {
    // Cleanup function to reset selected conversation when component unmounts
    return () => {
      dispatch({ type: "chat/selected", payload: null });
    };
  }, [dispatch]);

  if (!selectedConversation) return <NoChatSelected />;
  return (
    <div className="flex flex-1 flex-col md:min-w-[450px]">
      <>
        <div className="bg-secondary px-4 py-2 ">
          <span className="text-gray-900 font-bold">
            {selectedConversation.fullName}
          </span>
        </div>
        <Messages />
        <MessageInput />
      </>
    </div>
  );
}

export default MessageContainer;

function NoChatSelected() {
  const { authUser } = useAuthContext();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex text-xl items-center font-semibold px-4 text-gray-200 flex-col gap-2 text-center">
        <p className="capitalize">Welcome 👋 {authUser.fullName}</p>
        <p>Select a conversation to start messaging</p>
        <TiMessages className=" text-6xl" />
      </div>
    </div>
  );
}

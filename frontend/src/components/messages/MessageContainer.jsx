import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

function MessageContainer() {
  const noChatSelected = true;
  if (noChatSelected) return <NoChatSelected />;
  return (
    <div className="flex flex-1 flex-col md:min-w-[450px]">
      <>
        <div className="bg-secondary px-4 py-2 ">
          <span className="label-text">To:</span>
          <span className="text-gray-900 font-bold">Rohit</span>
        </div>
        <Messages />
        <MessageInput />
      </>
    </div>
  );
}

export default MessageContainer;

function NoChatSelected() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex text-xl items-center font-semibold px-4 text-gray-200 flex-col gap-2 text-center">
        <p>Welcome 👋 Rohit</p>
        <p>Select a conversation to start messaging</p>
        <TiMessages className=" text-6xl" />
      </div>
    </div>
  );
}
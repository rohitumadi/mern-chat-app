import { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { useSendMessage } from "../../hooks/useSendMessage";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { sendMessage, sendMessageLoading } = useSendMessage();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message || !message.trim()) return;
    await sendMessage(message);
    setMessage("");
  }
  return (
    <form className="px-4 my-3 mt-auto" onSubmit={handleSubmit}>
      <label className="input input-primary flex items-center gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="grow"
          placeholder="Send a message"
        />
        <button type="submit" className="kbd kbd-sm border-primary ">
          {sendMessageLoading ? (
            <span className="loading loading-spinner text-primary mr-2"></span>
          ) : (
            <BiSolidSend className="text-primary " />
          )}
        </button>
      </label>
    </form>
  );
}

export default MessageInput;

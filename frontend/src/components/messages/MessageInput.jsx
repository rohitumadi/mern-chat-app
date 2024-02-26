import { BiSolidSend } from "react-icons/bi";

function MessageInput() {
  return (
    <form className="px-4 my-3">
      <label className="input input-primary flex items-center gap-2">
        <input type="text" className="grow" placeholder="Send a message" />
        <button type="submit" className="kbd kbd-sm border-primary ">
          <BiSolidSend className="text-primary " />
        </button>
      </label>
    </form>
  );
}

export default MessageInput;

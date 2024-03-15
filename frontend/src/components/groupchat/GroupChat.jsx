import { TiGroup } from "react-icons/ti";
import GroupChatModal from "./GroupChatModal";
function GroupChat() {
  return (
    <div className="">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-sm ring-2 ring-primary"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <TiGroup size={28} />
      </button>
      <dialog id="my_modal_3" className="modal">
        <GroupChatModal />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default GroupChat;

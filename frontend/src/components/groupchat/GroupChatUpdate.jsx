import { AiOutlineUsergroupAdd } from "react-icons/ai";
import GroupChatUpdateModal from "./GroupChatUpdateModal";

function GroupChatUpdate() {
  return (
    <>
      <div className="ml-auto">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn btn-sm"
          onClick={() => document.getElementById("my_modal_4").showModal()}
        >
          <AiOutlineUsergroupAdd size={28} />
        </button>
        <dialog id="my_modal_4" className="modal">
          <GroupChatUpdateModal />
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default GroupChatUpdate;

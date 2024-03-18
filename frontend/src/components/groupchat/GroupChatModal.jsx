import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateGroupChat } from "../../hooks/useCreateGroupChat";
import { useUsers } from "../../hooks/useUsers";
import User from "../users/User";
import UserBadge from "./UserBadge";

function GroupChatModal() {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading, error } = useUsers(searchQuery);

  const { createGroupChat } = useCreateGroupChat();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!groupChatName || !selectedUsers) {
      toast.error("Please fill all the fields");
      return;
    }
    await createGroupChat({
      groupName: groupChatName,
      users: selectedUsers.map((u) => u._id),
    });
    toast.success("Group chat created successfully");
    setSelectedUsers([]);
    setGroupChatName("");
    document.getElementById("my_modal_3").close();
  }

  function handleSelectUser(user) {
    if (selectedUsers.includes(user)) {
      toast.error("User already selected");
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  }

  function handleRemoveUser(user) {
    setSelectedUsers(selectedUsers.filter((u) => u !== user));
  }
  return (
    <div className="modal-box w-1/3 h-1/2 no-scrollbar">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h2 className="font-bold text-lg text-center mb-4">Create Group Chat</h2>

      <form method="dialog " className="flex flex-col gap-3 items-center">
        {/* if there is a button in form, it will close the modal */}
        <input
          type="text"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
          placeholder="Chat Name"
          className="input input-sm w-fit input-bordered input-primary   max-w-xs"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Add User"
          className="input input-sm w-fit  input-bordered input-primary  max-w-xs"
        />
        {error && (
          <span className="text-red-500 text-xs text-center  ">{error}</span>
        )}
        {/* selected User  */}
        <div className="flex gap-2">
          {selectedUsers.map((user) => (
            <UserBadge
              onClick={() => handleRemoveUser(user)}
              key={user._id}
              user={user.fullName}
            />
          ))}
        </div>
        {/* render search user  */}
        <div className="flex flex-col gap-3 mb-2">
          {!loading &&
            users.map((user) => (
              <User
                onClick={() => handleSelectUser(user)}
                key={user._id}
                user={user}
              />
            ))}
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-sm  btn-ghost ml-auto self-end "
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default GroupChatModal;

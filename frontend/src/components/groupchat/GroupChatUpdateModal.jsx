import { useState } from "react";
import { useConversationContext } from "../../context/ConversationContext";
import { useUsers } from "../../hooks/useUsers";
import UserBadge from "./UserBadge";
import { useRenameGroupChat } from "../../hooks/useRenameGroupChat";
import toast from "react-hot-toast";
import Conversation from "../sidebar/Conversation";
import { useAuthContext } from "../../context/AuthContext";
import { useAddUserToGroup } from "../../hooks/useAddUserToGroup";
import { useRemoveUserFromGroup } from "../../hooks/useRemoveUserFromGroup";

function GroupChatUpdateModal() {
  const { selectedConversation } = useConversationContext();
  const { addUserToGroup, addUserLoading } = useAddUserToGroup();
  const { removeUserFromGroup } = useRemoveUserFromGroup();
  const { authUser } = useAuthContext();
  const [groupChatName, setGroupChatName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { users, loading, error } = useUsers(searchQuery);
  const { renameGroupChat, renameLoading } = useRenameGroupChat();

  async function handleRenameGroup() {
    if (!groupChatName) {
      toast.error("Please fill all the fields");
      return;
    }
    await renameGroupChat({
      groupId: selectedConversation._id,
      groupName: groupChatName,
    });

    setGroupChatName("");
  }

  async function handleAddUser(user) {
    if (selectedConversation.participants.find((u) => u._id === user._id)) {
      toast.error("User already in the group");
      return;
    }
    if (selectedConversation.groupAdmin !== authUser._id) {
      toast.error("Only group admin can add users");
      return;
    }
    await addUserToGroup({
      groupId: selectedConversation._id,
      userId: user._id,
    });
    setSearchQuery("");
  }

  async function handleRemoveUser(user) {
    if (selectedConversation.groupAdmin !== authUser._id) {
      toast.error("Only group admin can remove users");
      return;
    }
    await removeUserFromGroup(
      {
        groupId: selectedConversation._id,
        userId: user._id,
      },
      "remove"
    );
  }

  async function handleLeaveGroup() {
    await removeUserFromGroup(
      {
        groupId: selectedConversation._id,
        userId: authUser._id,
      },
      "leave"
    );
  }

  return (
    <div className="modal-box flex flex-col gap-4 items-center">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 className="font-bold text-center capitalize text-lg ">
        {selectedConversation.groupChatName}
      </h3>
      <div className="flex gap-2 justify-center">
        {selectedConversation.participants.map((user) => (
          <UserBadge
            onClick={() => handleRemoveUser(user)}
            key={user._id}
            user={user.fullName}
          />
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        <input
          type="text"
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
          placeholder="Update Group Name"
          className="input input-bordered input-primary input-sm w-fit max-w-xs"
        />
        {renameLoading ? (
          <span className="loading loading-spinner text-primary mr-2"></span>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={handleRenameGroup}
          >
            Rename Group
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2  w-fit">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Add User"
          className="input input-sm w-fit block input-bordered input-primary  max-w-xs"
        />
        {error && (
          <span className="text-red-500 text-xs text-center  ">{error}</span>
        )}

        {!loading &&
          users.map((user) => (
            <Conversation
              onClick={() => handleAddUser(user)}
              key={user._id}
              chat={user}
            />
          ))}
      </div>
      <button
        onClick={handleLeaveGroup}
        className="btn btn-error btn-sm w-fit ml-auto"
      >
        Leave Group
      </button>
    </div>
  );
}

export default GroupChatUpdateModal;

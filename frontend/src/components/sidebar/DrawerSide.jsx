import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import UserSkeleton from "../skeletons/UserSkeleton";
import User from "../users/User";
import SearchInput from "./SearchInput";
import { useCreateSingleChat } from "../../hooks/useCreateSingleChat";

function DrawerSide({ checked }) {
  const [query, setQuery] = useState("");
  const { users, loading, error } = useUsers(query);
  const { createSingleChat } = useCreateSingleChat();
  async function handleCreateChat(user) {
    await createSingleChat({ userId: user._id });
  }
  return (
    <div className="drawer-side z-20">
      <label
        htmlFor="my-drawer"
        // aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-1/4 min-h-full bg-base-200 text-base-content ">
        <SearchInput query={query} setQuery={setQuery} error={error} />
        {/* Sidebar content here */}
        {loading && [...Array(5)].map((_, idx) => <UserSkeleton key={idx} />)}
        {!loading &&
          users.map((user, idx) => (
            <User
              onClick={() => handleCreateChat(user)}
              dividerOn={true}
              lastIdx={idx === users.length - 1}
              key={user._id}
              user={user}
            />
          ))}
      </ul>
    </div>
  );
}

export default DrawerSide;

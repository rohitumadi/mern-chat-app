import { useState } from "react";
import SearchInput from "./SearchInput";
import { useUsers } from "../../hooks/useUsers";
import Conversation from "./Conversation";
import UserSkeleton from "../skeletons/UserSkeleton";

function DrawerSide() {
  const [query, setQuery] = useState("");
  const { users, loading, error } = useUsers(query);
  return (
    <div className="drawer-side z-10">
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
          users.map((user) => (
            <Conversation dividerOn={true} key={user._id} chat={user} />
          ))}
      </ul>
    </div>
  );
}

export default DrawerSide;

import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import UserSkeleton from "../skeletons/UserSkeleton";
import User from "../users/User";
import SearchInput from "./SearchInput";

function DrawerSide() {
  const [query, setQuery] = useState("");
  const { users, loading, error } = useUsers(query);
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
        {/* TODO add onclick create new chat handler */}
        {!loading &&
          users.map((user, idx) => (
            <User
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

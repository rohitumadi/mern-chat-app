import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useConversationContext } from "../../context/ConversationContext";
import { useConversations } from "../../hooks/useConversations";
function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversationContext();
  const { loading, conversations } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;
    if (query.length < 3)
      return toast.error("Search must be at least 3 characters long");
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(query.toLowerCase())
    );
    if (!conversation) return toast.error("User not found");
    setSelectedConversation(conversation);

    setSearch("");
  }

  return (
    <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
      <label className="input input-bordered input-primary flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="grow"
          placeholder="Search"
        />
      </label>
      {loading ? (
        <span className="loading loading-spinner text-primary mr-2"></span>
      ) : (
        <button type="submit">
          <IoSearchCircleSharp className="w-10 h-10 text-primary hover:text-secondary " />
        </button>
      )}
    </form>
  );
}

export default SearchInput;

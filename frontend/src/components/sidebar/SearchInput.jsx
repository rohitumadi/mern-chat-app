import { IoSearchCircleSharp } from "react-icons/io5";
function SearchInput() {
  return (
    <form className="flex gap-2 items-center">
      <label className="input input-bordered input-primary flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
      </label>
      <button>
        <IoSearchCircleSharp className="w-10 h-10 text-primary" />
      </button>
    </form>
  );
}

export default SearchInput;

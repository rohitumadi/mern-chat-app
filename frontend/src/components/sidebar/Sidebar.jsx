import { useGetChats } from "../../hooks/useGetChats";
import Conversations from "./Conversations";
import Drawer from "./Drawer";
import LogoutBtn from "./LogoutBtn";
import SearchInput from "./SearchInput";

function Sidebar() {
  useGetChats();
  return (
    <div className="border-r w-1/4 border-slate-500 p-4 flex flex-col">
      {/* <SearchInput /> */}
      <Drawer />
      <div className="divider "></div>
      <Conversations />
      <LogoutBtn />
    </div>
  );
}

export default Sidebar;

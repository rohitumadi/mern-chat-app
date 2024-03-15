import { useGetChats } from "../../hooks/useGetChats";
import Conversations from "./Conversations";
import Drawer from "./Drawer";
import GroupChat from "../groupchat/GroupChat";
import LogoutBtn from "./LogoutBtn";

function Sidebar() {
  useGetChats();
  return (
    <div className="border-r w-1/4 border-slate-500 p-4 flex flex-col">
      <div className="flex items-center gap-2 ">
        <Drawer />
        <GroupChat />
      </div>
      <div className="divider "></div>
      <Conversations />
      <LogoutBtn />
    </div>
  );
}

export default Sidebar;

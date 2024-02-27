import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

function Home() {
  return (
    <div className="flex  border-2 w-full border-primary rounded-lg overflow-hidden h-[650px] lg:h-[750px]">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default Home;

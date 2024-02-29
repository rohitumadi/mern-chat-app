import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

function Home() {
  return (
    <div className="flex  border-2 w-full border-primary rounded-lg overflow-hidden h-full ">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default Home;

import { useSocketContext } from "../../context/SocketContext";

function User({ user, onClick, dividerOn, lastIdx }) {
  const { onlineUsers } = useSocketContext();
  const { fullName, profilePic } = user;
  const isOnline = onlineUsers.includes(user._id);
  const handleClick = () => {
    onClick(); // Pass the chat object to the onClick function
  };
  return (
    <>
      <div
        className={`flex gap-2  hover:bg-secondary rounded w-full p-2 py-1  items-center  cursor-pointer`}
        onClick={handleClick}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={profilePic} />
          </div>
        </div>

        <div className=" flex flex-1  ">
          <div className="flex flex-1 flex-col justify-between">
            <p className="font-bold capitalize text-gray-200">{fullName}</p>
          </div>
        </div>
      </div>
      {!lastIdx && dividerOn && <div className="divider " />}
    </>
  );
}

export default User;

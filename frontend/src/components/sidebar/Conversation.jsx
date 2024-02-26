function Conversation() {
  return (
    <>
      <div className="flex gap-2 hover:bg-secondary rounded p-2 py-1 items-center cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>

        <div className=" flex flex-1  ">
          <div className="flex flex-1 justify-between">
            <p className="font-bold text-gray-200">John</p>
            <span>Last message...</span>
          </div>
        </div>
      </div>
      <div className="divider" />
    </>
  );
}

export default Conversation;

import { RxCross2 } from "react-icons/rx";
function UserBadge({ user, onClick }) {
  return (
    <div className="badge badge-primary badge-sm">
      {user}
      <RxCross2 onClick={onClick} className="cursor-pointer" />
    </div>
  );
}

export default UserBadge;

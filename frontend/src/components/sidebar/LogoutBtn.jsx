import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../../hooks/useLogout";
function LogoutBtn() {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner text-primary mr-2"></span>
      ) : (
        <BiLogOut
          onClick={logout}
          className="h-6 w-6 text-white cursor-pointer"
        />
      )}
    </div>
  );
}

export default LogoutBtn;

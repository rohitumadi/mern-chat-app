import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
function RateLimit() {
  const [timeLeft, setTimeLeft] = useState(null);
  const { logout } = useLogout();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  // useEffect(function () {
  //   if (authUser) logout();
  // }, []);
  useEffect(
    function () {
      async function getHealth() {
        try {
          const res = await fetch("/api/health");
          const retryAfter = res.headers.get("Retry-After");
          setTimeLeft(parseInt(retryAfter));
        } catch (error) {
          console.log("Error while fetching health", error);
        }
      }
      if (timeLeft === null) getHealth();
    },
    [timeLeft]
  );
  useEffect(
    function () {
      const id = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            clearInterval(id);
            navigate("/login");
            return 0;
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
      return () => clearInterval(id);
    },
    [navigate]
  );

  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  return (
    <div className="">
      <h1 className="text-3xl text-red-600">
        <BiSolidError className="inline" />
        Too many requests from this IP
      </h1>
      <p className="font-bold  text-2xl text-center">
        Please try again in
        <span className="mx-2">
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}.
        </span>
      </p>
      <p className="text-center">Upgrade your plan to get unlimited access</p>
    </div>
  );
}

export default RateLimit;

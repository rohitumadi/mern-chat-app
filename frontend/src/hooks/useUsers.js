import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useUsers(query) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  useEffect(
    function () {
      console.count("useEffect in get Users");
      const controller = new AbortController();
      async function getUsers() {
        console.log("getting users");

        setLoading(true);
        try {
          const res = await fetch(`/api/users?search=${query}`, {
            signal: controller.signal,
          });
          const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
          if (rateLimitRemaining === "1") {
            navigate("/rate-limit");
          }
          const data = await res.json();
          setUsers(data);
          if (data.error) {
            if (data.error === "Token Expired") {
              toast.error("Login expired. Please login again");
              // logout();
            }
          }
        } catch (err) {
          toast.error("Could not load users");
          console.log("Error while fetching users", err.message);
        } finally {
          setLoading(false);
        }
      }
      if (query.length > 3) {
        setError("");
        getUsers();
      } else if (query.length > 0 && query.length <= 3) {
        setError("Please enter more than 3 characters");
        setUsers([]);
      } else {
        setError("");
        setUsers([]);
      }
      return function () {
        controller.abort();
      };
    },
    [navigate, query]
  );
  return { loading, users, error };
}

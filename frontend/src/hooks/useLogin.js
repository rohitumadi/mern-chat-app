import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setAuthUser } = useAuthContext();

  async function login(inputs) {
    const { username, password } = inputs;
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
      if (rateLimitRemaining === "1") {
        navigate("/rate-limit");
      }
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        toast.error(data.error);
        return;
      }
      toast.success("Logged in successfully");
      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
    } catch (error) {
      console.log("Error while logging in", error.message);
      toast.error("Error while logging in");
    } finally {
      setLoading(false);
    }
  }
  return { loading, login };
}

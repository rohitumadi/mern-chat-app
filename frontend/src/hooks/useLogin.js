import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export function useLogin() {
  const [loading, setLoading] = useState(false);
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
      const data = await res.json();
      if (data.error) {
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

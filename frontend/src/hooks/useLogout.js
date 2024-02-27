import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  async function logout() {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      toast.success("Logged out successful");
      localStorage.removeItem("authUser");
      setAuthUser(null);
    } catch (error) {
      console.log("Error while logging out", error);
      toast.error("Error while logging out");
    } finally {
      setLoading(false);
    }
  }
  return { loading, logout };
}

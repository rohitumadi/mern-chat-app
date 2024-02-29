import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { convertImgToBinary } from "../utils/convertImgToBinary";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  async function signup(inputs) {
    let { fullName, username, password, confirmPassword, gender, profilePic } =
      inputs;
    if (!profilePic) profilePic = await convertImgToBinary(profilePic[0]);
    else profilePic = null;

    gender = gender[0];
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
          profilePic,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully");
      } else {
        toast.error(data.error);
        return;
      }
      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { signup, loading };
}

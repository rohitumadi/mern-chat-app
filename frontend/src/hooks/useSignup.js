import { useState } from "react";
import toast from "react-hot-toast";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  async function signup(inputs) {
    let { fullName, username, password, confirmPassword, gender } = inputs;
    gender = gender[0];
    console.log(fullName, username, password, confirmPassword, gender);
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
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully");
      } else {
        toast.error(data.error);
      }
      return data;
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  return { signup, loading };
}

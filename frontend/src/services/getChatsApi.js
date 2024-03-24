import toast from "react-hot-toast";

export async function getChats() {
  try {
    console.count("getChats called");
    const res = await fetch("/api/messages");
    const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
    if (rateLimitRemaining === "1") {
      //   navigate("/rate-limit");
      return { data: null, rateLimitReached: true };
    }
    const data = await res.json();
    // dispatch({ type: "chats/loaded", payload: data });
    if (data.error) {
      if (data.error === "Token Expired") {
        toast.error("Login expired. Please login again");
        // logout();
      }
    }
    return data;
  } catch (err) {
    toast.error("Could not load Chats");
    console.error("Error while fetching Chats", err.message);
  }
}

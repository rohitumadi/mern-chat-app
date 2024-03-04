import toast from "react-hot-toast";

export async function getConversations() {
  const res = await fetch("/api/users");

  const rateLimitRemaining = res.headers.get("X-RateLimit-Remaining");
  if (rateLimitRemaining === "1") {
    return { data: null, rateLimitReached: true };
  }
  const data = await res.json();

  if (data.error) {
    if (data.error === "Token Expired") {
      toast.error("Login expired. Please login again");

      return { data: null, loginExpired: true };
    }
    console.log("Error while fetching conversations", data.error);
    toast.error("Could not load conversations");
  }
  return data;
}

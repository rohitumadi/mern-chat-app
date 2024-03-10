export function extractTime(timeStr) {
  // Parse the input time string
  const dt = new Date(timeStr);

  // Get the UTC offset in milliseconds
  const utcOffset = dt.getTimezoneOffset() * 60 * 1000;

  // Convert UTC to Indian Standard Time (IST)
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(dt.getTime() + utcOffset + istOffset);

  // Format the date and time in IST
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // 12-hour clock format
    timeZone: "Asia/Kolkata",
  };
  const formattedIST = istTime.toLocaleString("en-US", options);

  return formattedIST;
}

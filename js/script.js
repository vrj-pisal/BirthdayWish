async function logVisitor(pageName) {
  let userID = localStorage.getItem('userID');
  if (!userID) {
    userID = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    localStorage.setItem('userID', userID);
  }

  const userAgent = navigator.userAgent;
  const os = navigator.platform;
  const time = new Date().toLocaleString();

  // Attempt to extract browser name
  let browser = "Unknown";
  if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
  else if (userAgent.includes("Edg")) browser = "Edge";

  let location = "Unknown";
  try {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    location = `${data.city}, ${data.region}, ${data.country_name}`;
  } catch (error) {
    console.log("Location fetch failed:", error);
  }

  fetch("https://sheetdb.io/api/v1/xynpa6kuoq8ag", {
    method: "POST",
    body: JSON.stringify({
      data: [{
        Page: pageName,
        UserID: userID,
        OS: os,
        Browser: browser,
        Device: userAgent,
        Time: time,
        Location: location
      }]
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

async function logVisitor(pageName) {
  // Generate or fetch unique user ID from localStorage
  let userID = localStorage.getItem('userID');
  if (!userID) {
    userID = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    localStorage.setItem('userID', userID);
  }

  // Device info
  const device = navigator.userAgent;
  const os = navigator.platform;
  const browser = navigator.appCodeName + " " + navigator.appVersion;

  // Time
  const time = new Date().toLocaleString();

  // Location (via IP)
  let location = "Unknown";
  try {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    location = `${data.city}, ${data.region}, ${data.country_name}`;
  } catch (e) {
    console.log("Location fetch failed", e);
  }

  // Send to SheetDB
  fetch("https://sheetdb.io/api/v1/YOUR_API_ID", {
    method: "POST",
    body: JSON.stringify({
      data: [{
        Page: pageName,
        Device: device,
        OS: os,
        Browser: browser,
        Time: time,
        Location: location,
        UserID: userID
      }]
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

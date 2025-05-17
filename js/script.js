async function logVisitor(pageName) {
  let userID = localStorage.getItem('userID');
  if (!userID) {
    userID = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    localStorage.setItem('userID', userID);
  }

  const device = navigator.userAgent;
  const os = navigator.platform;

  let browser = "Unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

  const time = new Date().toLocaleString();

  let location = "Unknown";
  try {
    const response = await fetch("https://ipinfo.io/json?token=f8a6f678fbce51");
    const data = await response.json();
    location = `${data.city}, ${data.region}, ${data.country_name}, ${data.postal}, (Lat: ${data.loc.split(',')[0]}, Lon: ${data.loc.split(',')[1]}), ${data.org},(ip:${data.ip})`;  } catch (error) {
    console.error("Location fetch failed:", error);
  }

  const payload = {
    data: [{
      Page: pageName,
      UserID: userID,
      Device: device,
      OS: os,
      Browser: browser,
      Time: time,
      Location: location
    }]
  };

  fetch("https://sheetdb.io/api/v1/xynpa6kuoq8ag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(res => {
    if (!res.ok) {
      console.error("SheetDB error:", res.statusText);
    }
  }).catch(err => console.error("Request failed:", err));
}

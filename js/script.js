async function logVisitor(pageName) {
  let userID = localStorage.getItem('userID');
  if (!userID) {
    userID = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    localStorage.setItem('userID', userID);
  }

  // Device and OS details
  const device = navigator.userAgent || "Unknown";
  const os = navigator.platform || "Unknown";

  // Browser detection (manual)
  let browser = "Unknown";
  if (navigator.userAgent.indexOf("Chrome") !== -1) {
    browser = "Chrome";
  } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
    browser = "Firefox";
  } else if (navigator.userAgent.indexOf("Safari") !== -1) {
    browser = "Safari";
  } else if (navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode) {
    browser = "Internet Explorer";
  }

  // Time (local timestamp)
  const time = new Date().toLocaleString();

  // Location using ipapi
  let location = "Unknown";
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      location = `${data.city}, ${data.region}, ${data.country_name}`;
    }
  } catch (err) {
    console.log("Location fetch failed:", err);
  }

  // Submit to SheetDB
  fetch("https://sheetdb.io/api/v1/xynpa6kuoq8ag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: [{
        Page: pageName,
        UserID: userID,
        Device: device,
        OS: os,
        Browser: browser,
        Time: time,
        Location: location
      }]
    })
  });
}

// track.js

async function getUserInfo() {
  const device = navigator.userAgent;
  const time = new Date().toLocaleString();
  let os = "Unknown";
  let browser = "Unknown";

  if (navigator.userAgentData) {
    const uaData = navigator.userAgentData;
    os = uaData.platform;
    browser = uaData.brands.map(b => `${b.brand} ${b.version}`).join(", ");
  } else {
    const ua = navigator.userAgent;

    if (ua.indexOf("Win") !== -1) os = "Windows";
    else if (ua.indexOf("Mac") !== -1) os = "MacOS";
    else if (ua.indexOf("Linux") !== -1) os = "Linux";
    else if (/Android/.test(ua)) os = "Android";
    else if (/iPhone|iPad/.test(ua)) os = "iOS";

    if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
    else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
    else if (ua.indexOf("Safari") !== -1) browser = "Safari";
    else browser = "Unknown";
  }

  // Optional: Get user's location using IP-based geolocation API
  let location = "Unknown";
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    location = `${data.city}, ${data.region}, ${data.country_name}`;
  } catch (e) {
    console.warn("Location fetch failed:", e);
  }

  return { device, os, browser, time, location };
}

async function logToSheet() {
  const info = await getUserInfo();

  fetch("https://sheetdb.io/api/v1/xynpa6kuoq8ag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data: info })
  })
    .then(res => res.json())
    .then(data => console.log("Logged to SheetDB:", data))
    .catch(err => console.error("SheetDB logging error:", err));
}

logToSheet();

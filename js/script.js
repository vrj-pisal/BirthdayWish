async function logVisitor(pageName) {
  function getMobileModel() {
    const ua = navigator.userAgent;

    // Try to match common Android model patterns
    let match = ua.match(/Android [\d.]+; ([^;()]+) Build\//);
    if (match && match[1]) {
      console.log('Android model detected:', match[1]);
      return match[1].trim();
    }

    // Some browsers might not include "Build/", fallback to other pattern
    match = ua.match(/Android [\d.]+; ([^;()]+)[;)]/);
    if (match && match[1]) {
      console.log('Android model detected (fallback):', match[1]);
      return match[1].trim();
    }

    // Try to match Samsung/other Androids with SM- or other codes
    match = ua.match(/(SM-[A-Za-z0-9]+|Redmi [^;()]+|Mi [^;()]+|ONEPLUS [^;()]+|Pixel [^;()]+)/i);
    if (match && match[1]) {
      console.log('Android model detected (brand pattern):', match[1]);
      return match[1].trim();
    }

    // iOS device fallback (model not available in UA)
    if (/iPhone/.test(ua)) {
      console.log('iOS device detected: iPhone');
      return "iPhone";
    }
    if (/iPad/.test(ua)) {
      console.log('iOS device detected: iPad');
      return "iPad";
    }

    // If not detected, log the UA for debugging
    console.log('Mobile model not detected. User agent:', ua);
    return "Unknown";
  }


  function getDeviceType() {
    const ua = navigator.userAgent;

    if (/Mobi|Android/i.test(ua)) return "Mobile";
    if (/Tablet|iPad/i.test(ua)) return "Tablet";
    return "Desktop/Laptop";
  }

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
    location = `(city: ${data.city}), (region: ${data.region}),(country: ${data.country_name}), (Postal: ${data.postal}), (Lat: ${data.loc.split(',')[0]}, Lon: ${data.loc.split(',')[1]}), (org: ${data.org}),(ip:${data.ip})`;
  } catch (error) {
    console.error("Location fetch failed:", error);
  }

  const mobileModel = getMobileModel();
  const deviceType = getDeviceType();

  const payload = {
    data: [{
      Page: pageName,
      UserID: userID,
      Device: device,
      OS: os,
      Browser: browser,
      DeviceType: deviceType,
      MobileModel: mobileModel,
      Time: time,
      Location: location,
      UserAgent: ua, 
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

async function logVisitor(pageName) {
  console.log('🚀 logVisitor function called for page:', pageName);
  
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

  function formatDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  }

  try {
    let userID = localStorage.getItem('userID');
    if (!userID) {
      userID = 'user_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
      localStorage.setItem('userID', userID);
      console.log('✅ New userID created:', userID);
    } else {
      console.log('✅ Existing userID found:', userID);
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

    const time = formatDateTime();
    let location = "Unknown";

    console.log('📍 Fetching location data...');
    try {
      const response = await fetch("https://ipinfo.io/json?token=f8a6f678fbce51");
      if (!response.ok) {
        console.error('❌ Location API error:', response.status, response.statusText);
      } else {
        const data = await response.json();
        console.log('✅ Location data received:', data);
        location = `(city: ${data.city || 'N/A'}), (region: ${data.region || 'N/A'}), (country: ${data.country || 'N/A'}), (Postal: ${data.postal || 'N/A'}), (Lat: ${data.loc ? data.loc.split(',')[0] : 'N/A'}, Lon: ${data.loc ? data.loc.split(',')[1] : 'N/A'}), (org: ${data.org || 'N/A'}), (ip: ${data.ip || 'N/A'})`;
      }
    } catch (error) {
      console.error("❌ Location fetch failed:", error);
      location = "Location fetch failed";
    }

    const mobileModel = getMobileModel();
    const deviceType = getDeviceType();

    const payload = {
      Page: pageName,
      UserID: userID,
      Device: device,
      OS: os,
      Browser: browser,
      DeviceType: deviceType,
      MobileModel: mobileModel,
      Time: time,
      Location: location,
      UserAgent: ua
    };

    console.log('📤 Sending data to Google Apps Script:', payload);

    // IMPORTANT: Replace 'YOUR_SCRIPT_URL_HERE' with your actual Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzbRgf16ViSlIfJbFUOvY5fTbQhAH8oVm_Ewv0ytWHoM3b0KHhgVEUG9Cp1M_Tr8DOJZw/exec';
    
    const scriptResponse = await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // Important for Google Apps Script
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    // Note: With no-cors mode, we can't read the response, but the data will be logged
    console.log("✅ Data sent to Google Apps Script successfully!");

  } catch (error) {
    console.error("❌ Critical error in logVisitor:", error);
  }
}

// Auto-execute for testing (comment out in production if called from HTML)
// logVisitor('test-page');
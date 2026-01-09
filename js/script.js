async function logVisitor(pageName) {
  try {
    // Generate or get unique user ID
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = "user_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
      localStorage.setItem("userID", userID);
    }

    const ua = navigator.userAgent;
    const device = ua;
    const os = navigator.platform;

    // Detect browser
    let browser = "Unknown";
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

    // Detect device type
    const deviceType = /Mobi|Android/i.test(ua) ? "Mobile" : /Tablet|iPad/i.test(ua) ? "Tablet" : "Desktop/Laptop";

    // Detect mobile model
    let mobileModel = "Unknown";
    const match = ua.match(/(SM-[A-Za-z0-9]+|Redmi [^;]+|Mi [^;]+|ONEPLUS [^;]+|Pixel [^;]+)/i);
    if (match) mobileModel = match[1];

    // Time
    const now = new Date();
    const time = `${String(now.getDate()).padStart(2,"0")}/${String(now.getMonth()+1).padStart(2,"0")}/${now.getFullYear()}, ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;

    // Location via IP info
    let location = "Unknown";
    try {
      const res = await fetch("https://ipinfo.io/json?token=f8a6f678fbce51");
      const data = await res.json();
      location = `${data.city || ""}, ${data.region || ""}, ${data.country || ""} | IP: ${data.ip || ""}`;
    } catch(e) {}

    // Your Google Apps Script Web App URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbzH3bK8vhj8S7Nd9vJclOZQui2r9wKLqm2kefU7FVRScAzk8suWX-yMeZqM_xgJKZYVQQ/exec"; // replace with your deployed URL

    // Send as GET request via Image() to avoid CORS
    const params = new URLSearchParams({
      Page: pageName,
      Device: device,
      OS: os,
      Browser: browser,
      Time: time,
      Location: location,
      UserID: userID,
      DeviceType: deviceType,
      MobileModel: mobileModel,
      UserAgent: ua
    });

    const img = new Image();
    img.src = scriptURL + "?" + params.toString();

    console.log("✅ Visitor data sent successfully");

  } catch(err) {
    console.error("❌ logVisitor error:", err);
  }
}

async function logVisitor(pageName) {
  try {
    console.log("🚀 logVisitor called:", pageName);

    // ===== USER ID (persistent) =====
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = "user_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
      localStorage.setItem("userID", userID);
    }

    // ===== BASIC INFO =====
    const ua = navigator.userAgent;
    const device = ua;
    const os = navigator.platform;

    let browser = "Unknown";
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

    // ===== DEVICE TYPE =====
    let deviceType = "Desktop/Laptop";
    if (/Mobi|Android/i.test(ua)) deviceType = "Mobile";
    if (/Tablet|iPad/i.test(ua)) deviceType = "Tablet";

    // ===== MOBILE MODEL =====
    function getMobileModel() {
      let match = ua.match(/Android [\d.]+; ([^;()]+) Build\//);
      if (match) return match[1].trim();

      match = ua.match(/(SM-[A-Za-z0-9]+|Redmi [^;()]+|Mi [^;()]+|ONEPLUS [^;()]+|Pixel [^;()]+)/i);
      if (match) return match[1].trim();

      if (/iPhone/.test(ua)) return "iPhone";
      if (/iPad/.test(ua)) return "iPad";

      return "Unknown";
    }

    const mobileModel = getMobileModel();

    // ===== TIME =====
    const now = new Date();
    const time =
      String(now.getDate()).padStart(2, "0") + "/" +
      String(now.getMonth() + 1).padStart(2, "0") + "/" +
      now.getFullYear() + ", " +
      String(now.getHours()).padStart(2, "0") + ":" +
      String(now.getMinutes()).padStart(2, "0") + ":" +
      String(now.getSeconds()).padStart(2, "0");

    // ===== LOCATION (IPINFO) =====
    let location = "Unknown";
    try {
      const res = await fetch("https://ipinfo.io/json?token=f8a6f678fbce51");
      const data = await res.json();
      location = `${data.city || ""}, ${data.region || ""}, ${data.country || ""} | IP: ${data.ip || ""}`;
    } catch (e) {
      location = "Location unavailable";
    }

    // ===== SEND DATA (NO CORS, IMAGE BEACON) =====
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbxNJQH4KWPyeEJdeLPvCl4rYCjqNKCh3Z7oLC9n-Bh7txO1XIPc7AfHjzqhUD0gx45d7g/exec";

    const params = new URLSearchParams({
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
    });

    const img = new Image();
    img.src = scriptURL + "?" + params.toString();

    console.log("✅ Visitor logged successfully");

  } catch (err) {
    console.error("❌ logVisitor error:", err);
  }
}

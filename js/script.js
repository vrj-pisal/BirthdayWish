async function logVisitor(pageName) {
  try {
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = "user_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
      localStorage.setItem("userID", userID);
    }

    const ua = navigator.userAgent;
    const device = ua;
    const os = navigator.platform;

    let browser = "Unknown";
    if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";

    let deviceType = /Mobi|Android/i.test(ua) ? "Mobile" : /Tablet|iPad/i.test(ua) ? "Tablet" : "Desktop/Laptop";

    let mobileModel = "Unknown";
    let match = ua.match(/(SM-[A-Za-z0-9]+|Redmi [^;]+|Mi [^;]+|ONEPLUS [^;]+|Pixel [^;]+)/i);
    if (match) mobileModel = match[1];

    const now = new Date();
    const time = `${String(now.getDate()).padStart(2,"0")}/${String(now.getMonth()+1).padStart(2,"0")}/${now.getFullYear()}, ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;

    let location = "Unknown";
    try {
      const res = await fetch("https://ipinfo.io/json?token=f8a6f678fbce51");
      const data = await res.json();
      location = `${data.city || ""}, ${data.region || ""}, ${data.country || ""} | IP: ${data.ip || ""}`;
    } catch(e) {}

    const scriptURL = "https://script.google.com/macros/s/AKfycbyXo2i6G1nAXJ3RsDLjebq7-5o3G8uUNMAmWSuun3pPhbvXtYVV2h5ZpHp2KZf2brJ3KQ/exec";

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

    console.log("✅ Visitor data sent successfully");

  } catch(err) {
    console.error("❌ logVisitor error:", err);
  }
}

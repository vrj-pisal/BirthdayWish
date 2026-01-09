function logVisitor(pageName) {
  try {
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = "user_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
      localStorage.setItem("userID", userID);
    }

    function getDeviceType() {
      const ua = navigator.userAgent;
      if (/Tablet|iPad/i.test(ua)) return "Tablet";
      if (/Mobi|Android/i.test(ua)) return "Mobile";
      return "Desktop";
    }

    function getOS() {
      const ua = navigator.userAgent;
      if (/Windows NT/i.test(ua)) return "Windows";
      if (/Android/i.test(ua)) return "Android";
      if (/iPhone|iPad/i.test(ua)) return "iOS";
      if (/Mac OS X/i.test(ua)) return "MacOS";
      if (/Linux/i.test(ua)) return "Linux";
      return "Unknown";
    }

    function getBrowser() {
      const ua = navigator.userAgent;
      if (ua.includes("Edg")) return "Edge";
      if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      if (ua.includes("Safari")) return "Safari";
      return "Unknown";
    }

    function getMobileModel() {
      const ua = navigator.userAgent;
      let match =
        ua.match(/Android [\d.]+; ([^;()]+) Build\//) ||
        ua.match(/(SM-[A-Za-z0-9]+|Redmi [^;()]+|Pixel [^;()]+|ONEPLUS [^;()]+)/i);

      if (match && match[1]) return match[1].trim();
      if (/iPhone/i.test(ua)) return "iPhone";
      if (/iPad/i.test(ua)) return "iPad";
      return "Unknown";
    }

    let location = "Unknown";
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        location = `${data.city || "N/A"}, ${data.region || "N/A"}, ${data.country_name || "N/A"}`;
      })
      .finally(() => sendData(location));

    function sendData(locationText) {
      const payload = {
        Page: pageName,
        UserID: userID,
        DeviceType: getDeviceType(),
        OS: getOS(),
        Browser: getBrowser(),
        MobileModel: getMobileModel(),
        Time: new Date().toLocaleString(),
        Location: locationText,
        UserAgent: navigator.userAgent
      };

      fetch(
        "https://script.google.com/macros/s/AKfycbw_7wPYbVOEJkxLa9b_jQOEXZBr3Tng2Jipij7Rr_LA8EWClWKKUxB-0aPXkwJynJQe5w/exec",
        {
          method: "POST",
          mode: "no-cors", // ✅ REQUIRED
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
    }

  } catch (err) {
    console.error("Visitor tracking failed:", err);
  }
}

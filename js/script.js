async function logVisitor(pageName) {
  try {
    // ---------- USER ID ----------
    let userID = localStorage.getItem('userID');
    if (!userID) {
      userID = 'user_' + crypto.randomUUID();
      localStorage.setItem('userID', userID);
    }

    // ---------- DEVICE TYPE ----------
    function getDeviceType() {
      const ua = navigator.userAgent;
      if (/Tablet|iPad/i.test(ua)) return "Tablet";
      if (/Mobi|Android/i.test(ua)) return "Mobile";
      return "Desktop/Laptop";
    }

    // ---------- OS ----------
    function getOS() {
      const ua = navigator.userAgent;
      if (/Windows NT/i.test(ua)) return "Windows";
      if (/Android/i.test(ua)) return "Android";
      if (/iPhone|iPad/i.test(ua)) return "iOS";
      if (/Mac OS X/i.test(ua)) return "MacOS";
      if (/Linux/i.test(ua)) return "Linux";
      return "Unknown";
    }

    // ---------- BROWSER ----------
    function getBrowser() {
      const ua = navigator.userAgent;
      if (ua.includes("Edg")) return "Edge";
      if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      if (ua.includes("Safari")) return "Safari";
      return "Unknown";
    }

    // ---------- MOBILE MODEL ----------
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

    // ---------- TIME ----------
    const time = new Date().toLocaleString();

    // ---------- LOCATION (SAFE API) ----------
    let location = "Unknown";
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      location = `${data.city || "N/A"}, ${data.region || "N/A"}, ${data.country_name || "N/A"}`;
    } catch (_) {}

    // ---------- PAYLOAD ----------
    const payload = {
      Page: pageName,
      UserID: userID,
      DeviceType: getDeviceType(),
      OS: getOS(),
      Browser: getBrowser(),
      MobileModel: getMobileModel(),
      Time: time,
      Location: location,
      UserAgent: navigator.userAgent
    };

    // ---------- SEND ----------
    await fetch("https://script.google.com/macros/s/AKfycbxXlt-5DWwTCpQvR6njuNNQ0-PJYoh5z2OKq1vXxlkOoP78NCWXx-Dx3w13o9XfDdQcyw/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

  } catch (err) {
    console.error("Visitor log failed:", err);
  }
}

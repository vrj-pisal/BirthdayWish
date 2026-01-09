function logVisitor(pageName) {
  try {
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = "user_" + Date.now();
      localStorage.setItem("userID", userID);
    }

    const ua = navigator.userAgent;

    const params = new URLSearchParams({
      Page: pageName,
      Device: ua,
      OS: navigator.platform,
      Browser: ua.includes("Chrome") ? "Chrome" : "Other",
      Time: new Date().toLocaleString(),
      Location: "Unknown",
      UserID: userID,
      DeviceType: /Mobi/i.test(ua) ? "Mobile" : "Desktop",
      MobileModel: "Unknown",
      UserAgent: ua
    });

    const img = new Image();
    img.src = "https://script.google.com/macros/s/AKfycby3ygzRrrWUgPEH3S-FI2DWABrSr0IGOQZ7jbnUVjCPVSQPhwNNmTGsraAInwnRYwXbiQ/exec" + "?" + params.toString();

    console.log("✅ Visitor logged");

  } catch (e) {
    console.error("❌ Visitor log failed", e);
  }
}

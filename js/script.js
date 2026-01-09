async function logVisitor(pageName) {
  try {
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = "user_" + crypto.randomUUID();
      localStorage.setItem("userID", userID);
    }

    function getDeviceType() {
      if (/Tablet|iPad/i.test(navigator.userAgent)) return "Tablet";
      if (/Mobi|Android/i.test(navigator.userAgent)) return "Mobile";
      return "Desktop";
    }

    const payload = {
      Page: pageName,
      UserID: userID,
      DeviceType: getDeviceType(),
      OS: navigator.platform,
      Browser: navigator.userAgent,
      Time: new Date().toLocaleString(),
      Location: "Unknown",
      UserAgent: navigator.userAgent
    };

    await fetch(
      "https://script.google.com/macros/s/AKfycbxXlt-5DWwTCpQvR6njuNNQ0-PJYoh5z2OKq1vXxlkOoP78NCWXx-Dx3w13o9XfDdQcyw/exec",
      {
        method: "POST",
        mode: "no-cors", // ✅ THIS IS REQUIRED
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    // If no error → data sent successfully
  } catch (err) {
    console.error("Visitor log failed:", err);
  }
}

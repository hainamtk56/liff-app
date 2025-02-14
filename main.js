import liff from "@line/liff";

const liffId = import.meta.env.VITE_LIFF_ID; // Thay bằng LIFF ID của bạn

async function initializeLiff() {
  try {
    await liff.init({ liffId });
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      displayProfile();
      // setupButtons();
    }
  } catch (err) {
    console.error("LIFF Initialization failed", err);
  }
}

async function displayProfile() {
  const profile = await liff.getProfile();
  document.getElementById("pictureUrl").src = profile.pictureUrl;
  document.getElementById("userId").textContent = `User ID: ${profile.userId}`;
  document.getElementById(
    "displayName"
  ).textContent = `Display Name: ${profile.displayName}`;
  document.getElementById("statusMessage").textContent = `Status: ${
    profile.statusMessage || "-"
  }`;

  if (liff.getOS() === "web") {
    const email = liff.getDecodedIDToken()?.email;
    document.getElementById("email").textContent = `Email: ${email || "-"}`;
  }
}

// function setupButtons() {
//   // Nút chia sẻ tin nhắn
//   document.getElementById("btnShare").onclick = async () => {
//     try {
//       await liff.shareTargetPicker([
//         {
//           type: "text",
//           text: "Hello from LIFF App!",
//         },
//       ]);
//     } catch (err) {
//       console.error("Error sharing message:", err);
//     }
//   };

//   // Nút quét mã QR
//   document.getElementById("btnScan").onclick = async () => {
//     if (!liff.isInClient()) {
//       alert("QR scanning is only available in LINE app");
//       return;
//     }
//     try {
//       const result = await liff.scanCode();
//       alert(`QR Code: ${result.value}`);
//     } catch (err) {
//       console.error("Error scanning QR code:", err);
//     }
//   };

//   // Nút đóng cửa sổ
//   document.getElementById("btnClose").onclick = () => {
//     if (liff.isInClient()) {
//       liff.closeWindow();
//     }
//   };
// }

initializeLiff();

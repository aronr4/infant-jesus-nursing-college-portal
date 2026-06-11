// ============================================================
// WhatsApp Direct Notification Utility (via CallMeBot API)
// ============================================================
// HOW TO GET YOUR API KEY (One-time setup):
// 1. Save +34 644 45 08 60 in WhatsApp contacts as "CallMeBot"
// 2. Send this message to CallMeBot on WhatsApp:
//    "I allow callmebot to send me messages"
// 3. You will receive your API key in reply
// 4. Replace "YOUR_API_KEY_HERE" below with your actual key
// ============================================================

const WHATSAPP_NUMBER = '919025232903'; // College WhatsApp number with country code
const CALLMEBOT_API_KEY = 'YOUR_API_KEY_HERE'; // 🔑 Replace with your CallMeBot API key

export async function sendWhatsAppNotification(message) {
  if (CALLMEBOT_API_KEY === 'YOUR_API_KEY_HERE') {
    console.warn('⚠️ CallMeBot API key not set. Please follow setup instructions in src/utils/sendWhatsApp.js');
    return;
  }

  try {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}&apikey=${CALLMEBOT_API_KEY}`;

    // Use no-cors mode since CallMeBot doesn't support CORS headers
    await fetch(url, { method: 'GET', mode: 'no-cors' });
    console.log('✅ WhatsApp notification sent successfully');
  } catch (error) {
    console.error('❌ Failed to send WhatsApp notification:', error);
  }
}

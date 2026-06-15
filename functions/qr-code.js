import QRCode from "qrcode";

export async function handler(event) {
  const text = event.queryStringParameters?.text || event.queryStringParameters?.url;
  if (!text) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "QR text or url is required." })
    };
  }

  try {
    const svg = await QRCode.toString(text, {
      type: "svg",
      errorCorrectionLevel: "M",
      margin: 1,
      color: {
        dark: "#2c1742",
        light: "#fffaf4"
      }
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      },
      body: svg
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message || "Could not generate QR code." })
    };
  }
}

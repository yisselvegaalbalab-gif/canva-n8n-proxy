export default async function handler(req, res) {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).send("❌ No 'code' received from Canva");
    }

    // Redirige el código hacia tu instancia de n8n
    const n8nRedirect = `https://oauth.n8n.cloud/oauth2/callback?code=${encodeURIComponent(code)}${
      state ? `&state=${encodeURIComponent(state)}` : ""
    }`;

    console.log("✅ Redirecting to:", n8nRedirect);
    return res.redirect(n8nRedirect);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).send("Internal Server Error");
  }
}

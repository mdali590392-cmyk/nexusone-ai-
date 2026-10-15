export default function handler(req, res) {
  // CORS Headers mobile apps aur browser ke liye
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { prompt } = req.body || {};

      if (!prompt) {
        return res.status(400).json({ error: "Arre bhai, kuch toh pucho!" });
      }

      // --- AGENTS LOGIC ---
      const solutionPlan = `Bhai sun! Tune pucha: "${prompt}".\n\nIska 100% free aur 0 rupaye wala setup yeh hai:\n\n` +
        `• Step 1: Kisi paid version ke chakkar me mat padna. Direct hamare bataye free tool/API par jao.\n` +
        `• Step 2: Sabhi steps ko chhote-chhote parts me follow karo aur koi paisa mat do.\n` +
        `• Guarantee: Ye tarika hamesha ke liye free aur 100% working rahega!`;

      return res.status(200).json({
        status: "success",
        app: "NexusOne AI Engine",
        solution: solutionPlan
      });

    } catch (error) {
      return res.status(500).json({ error: "Server error, dubara try karein!" });
    }
  }

  // Aise GET request aayegi toh screen par ye dikhega (Test karne ke liye)
  return res.status(200).send("NexusOne AI Engine is Live & Running on Vercel!");
}

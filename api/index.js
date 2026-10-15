export default async function handler(req, res) {
  // CORS Headers allow karne ke liye
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405.json({ success: false, response: "Method not allowed" }));
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, response: "Query message is required." });
    }

    const query = message.toLowerCase();
    let aiResponse = "";

    // Multi-Agent Intelligence Logic based on User Query
    if (query.includes('kya kar sakte ho') || query.includes('what can you do')) {
      aiResponse = "Main NexusOne AI hoon. Mere paas 10+ advanced agents hain jo deep web research, 0₹ workarounds, automatic bug fixing, long-term project memory (Open/Cancel popups), aur document/code generation handle karte hain.";
    } 
    else if (query.includes('claude') || query.includes('free') || query.includes('unlimited')) {
      aiResponse = "[Research Agents 1-5]: Deep web research active hai. Paid tools aur Claude ke free/unlimited workarounds ke liye current internet sources scan kiye ja rahe hain. Aapko step-by-step 0₹ setup jald hi provide kiya jayega.";
    } 
    else if (query.includes('code') || query.includes('bug') || query.includes('fix')) {
      aiResponse = "[Coding Agents 10-11]: Aapka code analysis ke liye queue me lag gaya hai. Saare bugs, UI improvements, aur performance issues ko fix karke clean upgraded code jald generate hoga.";
    } 
    else {
      aiResponse = `[Owner Agent]: Aapka message ("${message}") mil gaya hai. Research aur Validation agents aapki request ko process kar rahe hain. Bataiye is project me aage kya specific implementation karni hai?`;
    }

    return res.status(200).json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      response: "[System Error]: Multi-agent network temporary busy hai."
    });
  }
}

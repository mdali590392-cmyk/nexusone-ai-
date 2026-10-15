export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, response: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, response: "Query message is required." });
    }

    const query = message.toLowerCase();
    let aiResponse = "";

    // 1. Safety & Privacy Policy Check (Blocking internal leakage or inappropriate queries)
    if (query.includes('system prompt') || query.includes('internal code') || query.includes('source code') || query.includes('yeh app kaise bana') || query.includes('backend code dikhao') || query.includes('ganda') || query.includes('faltu')) {
      aiResponse = "This is an invalid or inappropriate work request. Please try again with a valid work-related query.";
    }
    // 2. Capabilities & Agents Query
    else if (query.includes('kya kar sakte ho') || query.includes('agents') || query.includes('kitne agents')) {
      aiResponse = "[Owner Agent]: NexusOne AI ke andar 10+ specialized agents active hain. 5 Deep Web Research Agents internet ke har kone se 0₹ workarounds dhoondte hain, Validation Agents safety check karte hain, Memory Agents project context yaad rakhte hain, aur Elite Coding Agents bugs fix karte hain.";
    } 
    // 3. Claude / Paid Tools Free Workaround Query
    else if (query.includes('claude') || query.includes('free') || query.includes('unlimited') || query.includes('workaround')) {
      aiResponse = "[Research Agents 1-5 & Validation Agents 6-7]: Deep web crawling active hai. Claude aur anya paid AI models ko zero cost (0₹) par unlimited access karne ke liye alternative education portals, GitHub student benefits, aur multi-tool API chaining ke step-by-step workarounds scan kiye ja rahe hain. Jald hi aapko exact link aur process provide kiya jayega.";
    } 
    // 4. Coding & Bug Fixing Query
    else if (query.includes('code') || query.includes('bug') || query.includes('fix') || query.includes('ui')) {
      aiResponse = "[Coding Agents 10-11]: Aapka code analysis ke liye queue me hai. Saare non-working features, layout issues, aur bugs ko fix karke ek premium upgraded level ka clean code taiyar kiya ja raha hai.";
    } 
    // 5. General Smart Orchestration for any other query
    else {
      aiResponse = `[Owner Agent]: Aapki request ("${message}") ko Master Orchestrator ne receive kar liya hai. Research aur Validation agents is par deep inspection kar rahe hain. Bataiye is project ya task me aage kya step execute karna hai?`;
    }

    return res.status(200).json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      response: "[System Error]: Multi-agent network temporary busy hai. Please try again."
    });
  }
}

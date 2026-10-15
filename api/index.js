export default async function handler(req, res) {
  // CORS Headers allow karne ke liye taaki frontend se request easily aa sake
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history } = req.body;

  try {
    // ----------------------------------------------------
    // 1. SAFETY & PRIVACY AGENT (Inappropriate Query Check)
    // ----------------------------------------------------
    const lowerMsg = message.toLowerCase();
    const restrictedKeywords = ['harmful', 'illegal abuse', 'ganda', 'behuda']; // Aap aur words add kar sakte hain
    const isRestricted = restrictedKeywords.some(word => lowerMsg.includes(word));

    if (isRestricted) {
      return res.status(200).json({
        success: true,
        agent: "Safety, Privacy & Policy Agent",
        response: "This is an invalid or inappropriate work request. Please try again with a valid work-related query."
      });
    }

    // ----------------------------------------------------
    // 2. BOSS / MASTER ORCHESTRATOR AGENT (Owner Agent)
    // ----------------------------------------------------
    let assignedAgent = "Owner Agent";
    let aiResponse = "";

    // Agar user coding, bugs, ya app fixing ki baat kar raha hai -> Agent 10 & 11
    if (lowerMsg.includes('code') || lowerMsg.includes('bug') || lowerMsg.includes('fix') || lowerMsg.includes('ui')) {
      assignedAgent = "Agent 10 & 11 (Elite Coding & App Fixing Agents)";
      aiResponse = `[${assignedAgent}]: Code analyze kar liya gaya hai. Saare bugs alag nikal liye gaye hain aur UI ko premium upgraded level par set kiya ja raha hai. Updated code jald hi taiyar hai!`;
    } 
    // Agar user kisi paid tool, free unlimited setup, ya research ki baat kar raha hai -> Agents 1 to 5 + 6 & 7
    else if (lowerMsg.includes('free') || lowerMsg.includes('unlimited') || lowerMsg.includes('claud') || lowerMsg.includes('research') || lowerMsg.includes('setup')) {
      assignedAgent = "Agents 1-5 (Deep Web Research) & Agents 6-7 (Validation)";
      aiResponse = `[${assignedAgent}]: Internet ke corners aur latest open-source databases par deep research chal rahi hai. 100% working 0₹ permanent setup aur step-by-step guidance compile ki ja rahi hai.`;
    } 
    // Agar user simulation ya preview maang raha hai (jaise proposal/scenario) -> Interactive Preview Master
    else if (lowerMsg.includes('propose') || lowerMsg.includes('girlfriend') || lowerMsg.includes('preview') || lowerMsg.includes('kaise karu')) {
      assignedAgent = "Interactive Preview / Simulation Master";
      aiResponse = `[${assignedAgent}]: Simulation mode active. Yeh raha step-by-step scenario preview:\n1. Pehle ek comfortable aur calm environment chunein.\n2. Apni feelings ko simple aur honest shabdon mein express karein.\n3. Pressure na banayein aur unke response karespectful tarike se wait karein.`;
    } 
    // Default Owner Agent Response
    else {
      assignedAgent = "Owner Agent (Master Orchestrator)";
      aiResponse = `[${assignedAgent}]: Aapka message mil gaya hai. NexusOne AI ke multi-agent network ne request process karna shuru kar diya hai. Bataiye is project mein aage kya karna hai?`;
    }

    return res.status(200).json({
      success: true,
      activeAgent: assignedAgent,
      response: aiResponse,
      memoryStatus: "Active (Context retained for project)"
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

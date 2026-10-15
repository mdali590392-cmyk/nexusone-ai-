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
    let filePayload = null;

    // 1. Safety & Privacy Policy Check
    if (query.includes('system prompt') || query.includes('internal code') || query.includes('source code') || query.includes('yeh app kaise bana') || query.includes('backend code dikhao')) {
      aiResponse = "This is an invalid or inappropriate work request. Please try again with a valid work-related query.";
    }
    // 2. HTML / Website Code Generation Request
    else if (query.includes('html') || query.includes('website code') || query.includes('ui code') || query.includes('index.html')) {
      aiResponse = "[Coding Agents 10-11]: Yeh lijiye aapka complete Neumorphic HTML/CSS code file tayyar hai. Aap iska live preview dekh sakte hain ya direct download kar sakte hain.";
      filePayload = {
        name: "index.html",
        type: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NexusOne Generated Page</title>
<style>
  body { background: #e0e5ec; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
  .card { padding: 30px; background: #e0e5ec; border-radius: 20px; box-shadow: 8px 8px 16px #bec3c9, -8px -8px 16px #ffffff; text-align: center; color: #2d3748; }
  h1 { color: #6366f1; margin-bottom: 10px; }
</style>
</head>
<body>
  <div class="card">
    <h1>NexusOne AI Workspace</h1>
    <p>This file was dynamically built and previewed successfully!</p>
  </div>
</body>
</html>`
      };
    }
    // 3. CSS Styling Code Request
    else if (query.includes('css') || query.includes('style')) {
      aiResponse = "[Coding Agents 10-11]: Yeh lijiye style.css file.";
      filePayload = {
        name: "style.css",
        type: "css",
        content: `/* NexusOne AI Custom Stylesheet */
body {
  background-color: #e0e5ec;
  color: #2d3748;
}
.neumorphic-box {
  background: #e0e5ec;
  box-shadow: 6px 6px 12px #bec3c9, -6px -6px 12px #ffffff;
}`
      };
    }
    // 4. JavaScript Code Request
    else if (query.includes('javascript') || query.includes('script.js') || query.includes('js code')) {
      aiResponse = "[Coding Agents 10-11]: Yeh lijiye script.js file tayyar hai.";
      filePayload = {
        name: "script.js",
        type: "js",
        content: `// NexusOne AI Automation Script
console.log("NexusOne Multi-Agent Engine Initialized Successfully.");
function runAgentTask() {
  alert("Agents are active and processing requests!");
}`
      };
    }
    // 5. General Capabilities Query
    else if (query.includes('kya kar sakte ho') || query.includes('agents')) {
      aiResponse = "[Owner Agent]: NexusOne AI ke andar 10+ specialized agents active hain jo deep web research, 0₹ workarounds, automatic bug fixing, aur document/code generation handle karte hain.";
    } 
    // 6. Claude / Paid Tools Free Workaround Query
    else if (query.includes('claude') || query.includes('free') || query.includes('unlimited') || query.includes('workaround')) {
      aiResponse = "[Research Agents 1-5]: Deep web crawling active hai. Paid tools aur Claude ke free/unlimited workarounds ke liye sources scan kiye ja rahe hain.";
    } 
    // 7. General Fallback Response
    else {
      aiResponse = `[Owner Agent]: Aapki request ("${message}") ko Master Orchestrator ne receive kar liya hai. Bataiye is task me aage kaunsi file ya code generate karna hai?`;
    }

    return res.status(200).json({
      success: true,
      response: aiResponse,
      file: filePayload
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      response: "[System Error]: Multi-agent network temporary busy hai."
    });
  }
}

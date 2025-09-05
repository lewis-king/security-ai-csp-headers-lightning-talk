import React from 'react';
import {
  Deck,
  Slide,
  Heading,
  Text,
  CodePane,
  Box,
  FlexBox,
  Appear
} from 'spectacle';

const theme = {
  colors: {
    primary: '#0f0f0f',
    secondary: '#ff6b6b',
    tertiary: '#4ecdc4', 
    quaternary: '#45b7d1',
    quinary: '#96ceb4',
    white: '#ffffff',
    gray: '#666666'
  },
  fonts: {
    header: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    text: '"SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif',
    monospace: '"SF Mono", "Monaco", "Cascadia Code", monospace'
  }
};

function Presentation() {
  return (
    <Deck theme={theme}>
      {/* Slide 1: Hook - The Hidden Danger */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="8rem" margin="0" textAlign="center">🕷️</Text>
          <Heading fontSize="4rem" color="secondary" margin="40px 0" textAlign="center">
            Your Website Has Visitors
          </Heading>
          <Appear>
            <Heading fontSize="3rem" color="white" margin="20px 0" textAlign="center">
              Some Are Not Welcome
            </Heading>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 2: XSS Definition and Severity */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Heading fontSize="6rem" color="secondary" margin="0" textAlign="center">
            XSS
          </Heading>
          <Text fontSize="2.5rem" color="white" margin="20px 0" textAlign="center">
            Cross-Site Scripting
          </Text>
          <Text fontSize="1.8rem" color="gray" margin="20px 0" textAlign="center">
            Attackers inject malicious code into trusted websites
          </Text>
          <Appear>
            <Box backgroundColor="#8B0000" padding="20px" borderRadius="10px" margin="30px auto" maxWidth="800px">
              <Text fontSize="1.8rem" color="white" textAlign="center" fontWeight="bold">
                🚨 CVE Severity: 9.8/10 (Critical)
              </Text>
              <Text fontSize="1.4rem" color="white" textAlign="center" margin="10px 0 0 0">
                OWASP Top 10 #3 • 94% of web applications vulnerable
              </Text>
            </Box>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 3: Attack Vectors - How XSS Gets In */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Heading fontSize="3.5rem" color="secondary" margin="0 0 40px 0" textAlign="center">
            How Attackers Strike
          </Heading>
          <FlexBox flexDirection="column" alignItems="flex-start" maxWidth="900px" margin="0 auto">
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                🗨️ <Text color="quaternary">User Input Forms</Text> - Contact forms, comments, reviews
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                📧 <Text color="quaternary">Social Engineering</Text> - "Please submit this for me..."
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                🔗 <Text color="quaternary">Third-party Data</Text> - APIs, imports, partner systems
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                🥷 <Text color="quaternary">Compromised Accounts</Text> - Hijacked user sessions
              </Text>
            </Appear>
          </FlexBox>
          <Appear>
            <Box backgroundColor="#8B4513" padding="15px" borderRadius="10px" margin="40px auto 0" maxWidth="700px">
              <Text fontSize="1.5rem" color="white" textAlign="center">
                ⚠️ Attackers don't need direct access to admin panels
              </Text>
            </Box>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 4: The Stakes - What XSS Can Do */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Heading fontSize="3.5rem" color="secondary" margin="0 0 40px 0" textAlign="center">
            What XSS Attackers Can Do
          </Heading>
          <FlexBox flexDirection="column" alignItems="flex-start" maxWidth="1000px" margin="0 auto">
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                🍪 <Text color="tertiary">Steal Authentication</Text> - Session cookies, JWT tokens
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                🔍 <Text color="tertiary">Access Private Data</Text> - Customer info, financial records
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                🎭 <Text color="tertiary">Impersonate Users</Text> - Make requests as logged-in users
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                🌐 <Text color="tertiary">Redirect to Phishing</Text> - Harvest credentials on fake sites
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="2rem" color="white" margin="15px 0">
                💰 <Text color="tertiary">Financial Fraud</Text> - Unauthorized transactions, account takeover
              </Text>
            </Appear>
          </FlexBox>
          <Appear>
            <Box backgroundColor="#8B0000" padding="20px" borderRadius="10px" margin="30px auto 0" maxWidth="800px">
              <Text fontSize="1.6rem" color="white" textAlign="center" fontWeight="bold">
                💀 Complete compromise with zero user awareness
              </Text>
            </Box>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 5: Demo Transition - Real World Scenario */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="6rem" margin="0" textAlign="center">👀</Text>
          <Heading fontSize="4rem" color="quaternary" margin="30px 0" textAlign="center">
            Live Demo
          </Heading>
          <Text fontSize="2.2rem" color="white" margin="20px 0" textAlign="center">
            Ten Lifestyle Member Portal
          </Text>
          <FlexBox flexDirection="column" alignItems="center" maxWidth="800px" margin="0 auto">
            <Text fontSize="1.6rem" color="gray" margin="15px 0" textAlign="center">
              ➤ Member submits dining request with "special requirements"
            </Text>
            <Text fontSize="1.6rem" color="gray" margin="15px 0" textAlign="center">
              ➤ Staff views request in Lifestyle Manager Portal
            </Text>
            <Text fontSize="1.6rem" color="secondary" margin="15px 0" textAlign="center" fontWeight="bold">
              ➤ Watch the account takeover unfold...
            </Text>
          </FlexBox>
        </FlexBox>
      </Slide>

      {/* Slide 6: The Solution - CSP Introduction */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="6rem" margin="0" textAlign="center">🛡️</Text>
          <Heading fontSize="4rem" color="tertiary" margin="30px 0" textAlign="center">
            Content Security Policy
          </Heading>
          <Text fontSize="2.2rem" color="white" margin="20px 0" textAlign="center">
            Browser-enforced security boundary
          </Text>
          <FlexBox flexDirection="column" alignItems="flex-start" maxWidth="900px" margin="0 auto">
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                ✅ <Text color="tertiary">Whitelist Approach</Text> - Only approved scripts execute
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                🌐 <Text color="tertiary">Browser Enforcement</Text> - Built into modern browsers
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                🚫 <Text color="tertiary">Blocks XSS</Text> - Prevents malicious script execution
              </Text>
            </Appear>
          </FlexBox>
          <Appear>
            <Box backgroundColor="#006400" padding="20px" borderRadius="10px" margin="30px auto 0" maxWidth="700px">
              <Text fontSize="1.5rem" color="white" textAlign="center" fontWeight="bold">
                🎯 Zero-trust model: Deny everything, allow explicitly
              </Text>
            </Box>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 7: The Nonce - Technical Implementation */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="4rem" margin="0" textAlign="center">🔑</Text>
          <Heading fontSize="3.5rem" color="tertiary" margin="20px 0" textAlign="center">
            Nonce-Based CSP
          </Heading>
          <Text fontSize="1.8rem" color="white" margin="10px 0" textAlign="center">
            "Number Used Once" - Cryptographic randomness
          </Text>
          
          <Box backgroundColor="#1a1a1a" padding="25px" borderRadius="10px" margin="25px auto" maxWidth="1000px">
            <CodePane language="http" theme="dark" fontSize="1rem">
{`Content-Security-Policy: script-src 'nonce-a8f7h3kl9' 'strict-dynamic';
                         style-src 'nonce-a8f7h3kl9';`}
            </CodePane>
          </Box>
          
          <Box backgroundColor="#1a1a1a" padding="25px" borderRadius="10px" margin="15px auto" maxWidth="1000px">
            <CodePane language="html" theme="dark" fontSize="1rem">
{`<script nonce="a8f7h3kl9">
  // Only this script can execute
</script>`}
            </CodePane>
          </Box>
          
          <FlexBox justifyContent="space-around" width="100%" margin="30px 0 0 0">
            <Appear>
              <Box textAlign="center">
                <Text fontSize="1.4rem" color="tertiary" fontWeight="bold">✅ Legitimate</Text>
                <Text fontSize="1.2rem" color="white">Has valid nonce</Text>
              </Box>
            </Appear>
            <Appear>
              <Box textAlign="center">
                <Text fontSize="1.4rem" color="secondary" fontWeight="bold">❌ Malicious</Text>
                <Text fontSize="1.2rem" color="white">No nonce = blocked</Text>
              </Box>
            </Appear>
          </FlexBox>
        </FlexBox>
      </Slide>

      {/* Slide 8: Implementation Approach - Production Ready */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Heading fontSize="3.5rem" color="tertiary" margin="0 0 30px 0" textAlign="center">
            Production Implementation
          </Heading>
          <Text fontSize="1.8rem" color="white" margin="15px 0" textAlign="center">
            Lambda@Edge / Server-Side Nonce Injection
          </Text>
          
          <FlexBox flexDirection="column" alignItems="flex-start" maxWidth="1000px" margin="30px auto">
            <Appear>
              <Text fontSize="1.6rem" color="white" margin="12px 0">
                🎲 <Text color="quaternary">Generate</Text> cryptographic nonce per request
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.6rem" color="white" margin="12px 0">
                📝 <Text color="quaternary">Inject</Text> nonce into CSP headers and HTML elements
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.6rem" color="white" margin="12px 0">
                🛡️ <Text color="quaternary">Enforce</Text> strict CSP: scripts + styles require nonces
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.6rem" color="white" margin="12px 0">
                ⚡ <Text color="quaternary">Edge Deploy</Text> minimal latency impact
              </Text>
            </Appear>
          </FlexBox>
          
          <Box backgroundColor="#1a1a1a" padding="20px" borderRadius="10px" margin="30px auto" maxWidth="900px">
            <CodePane language="javascript" theme="dark" fontSize="0.9rem">
{`const nonce = crypto.randomBytes(16).toString('base64');
res.setHeader('CSP', \`script-src 'nonce-\${nonce}'\`);`}
            </CodePane>
          </Box>
        </FlexBox>
      </Slide>

      {/* Slide 9: Demo Transition - Secure Version */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="5rem" margin="0" textAlign="center">🔒</Text>
          <Heading fontSize="4rem" color="tertiary" margin="30px 0" textAlign="center">
            Secure Demo
          </Heading>
          <Text fontSize="2.2rem" color="white" margin="20px 0" textAlign="center">
            Same Portal, CSP Protected
          </Text>
          <FlexBox flexDirection="column" alignItems="center" maxWidth="800px" margin="0 auto">
            <Text fontSize="1.6rem" color="gray" margin="15px 0" textAlign="center">
              ➤ Identical Ten Maid portal with CSP headers
            </Text>
            <Text fontSize="1.6rem" color="gray" margin="15px 0" textAlign="center">
              ➤ Same XSS payload, same viewing process
            </Text>
            <Text fontSize="1.6rem" color="tertiary" margin="15px 0" textAlign="center" fontWeight="bold">
              ➤ Watch the attack get neutralized...
            </Text>
          </FlexBox>
        </FlexBox>
      </Slide>

      {/* Slide 10: Before/After - The Victory */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Heading fontSize="3.5rem" color="white" margin="0 0 60px 0" textAlign="center">
            The Result
          </Heading>
          
          <FlexBox width="100%" justifyContent="space-around">
            <Box textAlign="center" width="40%">
              <Text fontSize="6rem" margin="0">😱</Text>
              <Text fontSize="2rem" color="secondary" margin="20px 0">BEFORE</Text>
              <Box backgroundColor="secondary" padding="20px" borderRadius="10px">
                <Text fontSize="1.5rem" color="white">
                  XSS Executes
                </Text>
              </Box>
            </Box>

            <Box textAlign="center" width="40%">
              <Text fontSize="6rem" margin="0">🛡️</Text>
              <Text fontSize="2rem" color="tertiary" margin="20px 0">AFTER</Text>
              <Box backgroundColor="tertiary" padding="20px" borderRadius="10px">
                <Text fontSize="1.5rem" color="white">
                  XSS Blocked
                </Text>
              </Box>
            </Box>
          </FlexBox>

          <Appear>
            <Text fontSize="2.5rem" color="quinary" margin="60px 0 0 0" textAlign="center">
              Attack Neutralized ✨
            </Text>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 11: What We Achieved */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Heading fontSize="3.5rem" color="quaternary" margin="0 0 40px 0" textAlign="center">
            What We Built in 15 Minutes
          </Heading>
          <FlexBox flexDirection="column" alignItems="flex-start" maxWidth="1000px" margin="0 auto">
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                🎯 <Text color="tertiary">Identified Critical XSS Vulnerability</Text> (CVE 9.8/10)
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                🛡️ <Text color="tertiary">Implemented Production CSP</Text> with nonce-based protection
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                👀 <Text color="tertiary">Demonstrated Real Attack</Text> and successful defense
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                🚀 <Text color="tertiary">Zero Impact Deployment</Text> via Lambda@Edge approach
              </Text>
            </Appear>
          </FlexBox>
          
          <Appear>
            <Box backgroundColor="#006400" padding="25px" borderRadius="10px" margin="40px auto 0" maxWidth="900px">
              <Text fontSize="1.8rem" color="white" textAlign="center" fontWeight="bold">
                🎉 From vulnerable to bulletproof in minutes, not months
              </Text>
            </Box>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 12: AI-Powered Security Engineering */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="5rem" margin="0" textAlign="center">🤖</Text>
          <Heading fontSize="3.5rem" color="quaternary" margin="30px 0" textAlign="center">
            AI-Powered Security Engineering
          </Heading>
          <FlexBox flexDirection="column" alignItems="flex-start" maxWidth="1000px" margin="0 auto">
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                ⚡ <Text color="quaternary">Rapid Prototyping</Text> - Full-stack demo in minutes
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                🔍 <Text color="quaternary">Vulnerability Analysis</Text> - Identify attack vectors instantly
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                🛠️ <Text color="quaternary">Solution Implementation</Text> - Production-ready code generation
              </Text>
            </Appear>
            <Appear>
              <Text fontSize="1.8rem" color="white" margin="15px 0">
                📚 <Text color="quaternary">Knowledge Transfer</Text> - This presentation included!
              </Text>
            </Appear>
          </FlexBox>
          
          <Appear>
            <Box backgroundColor="#4B0082" padding="20px" borderRadius="10px" margin="30px auto 0" maxWidth="800px">
              <Text fontSize="1.6rem" color="white" textAlign="center" fontWeight="bold">
                AI doesn't replace security engineers - it supercharges them
              </Text>
            </Box>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 13: Call to Action & Next Steps */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="4rem" margin="0" textAlign="center">🚀</Text>
          <Heading fontSize="3.5rem" color="tertiary" margin="30px 0" textAlign="center">
            Implement CSP in Your Organization
          </Heading>
          
          <FlexBox justifyContent="space-around" width="100%" margin="40px 0">
            <FlexBox flexDirection="column" alignItems="center" width="45%">
              <Text fontSize="2rem" color="quaternary" margin="0 0 20px 0" fontWeight="bold">Quick Wins</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">🎯 Start with report-only mode</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">🔍 Audit existing inline scripts</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">📝 Generate nonces server-side</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">🛡️ Enforce strict CSP headers</Text>
            </FlexBox>
            
            <FlexBox flexDirection="column" alignItems="center" width="45%">
              <Text fontSize="2rem" color="secondary" margin="0 0 20px 0" fontWeight="bold">Enterprise Scale</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">☁️ Deploy via Lambda@Edge</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">📊 Monitor CSP violations</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">🔄 Automate with CI/CD</Text>
              <Text fontSize="1.4rem" color="white" margin="10px 0">🤖 Accelerate with AI tools</Text>
            </FlexBox>
          </FlexBox>
          
          <Box margin="40px 0 0 0" textAlign="center">
            <Heading fontSize="3rem" color="quaternary">
              Questions?
            </Heading>
            <Text fontSize="1.2rem" color="gray" margin="20px 0">
              @lewisking • Senior Security Advocate
            </Text>
            <Text fontSize="1rem" color="gray">
              Demo code: https://github.com/lewis-king/security-ai-csp-headers-lightning-talk
            </Text>
          </Box>
        </FlexBox>
      </Slide>
    </Deck>
  );
}

export default Presentation;
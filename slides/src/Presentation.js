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

      {/* Slide 2: XSS in Big Bold Letters */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Heading fontSize="8rem" color="secondary" margin="0" textAlign="center">
            XSS
          </Heading>
          <Text fontSize="3rem" color="white" margin="40px 0" textAlign="center">
            Cross-Site Scripting
          </Text>
          <Appear>
            <Text fontSize="2rem" color="gray" textAlign="center">
              Attackers inject malicious code into trusted websites
            </Text>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 3: The Stakes - Visual Impact */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="6rem" margin="0" textAlign="center">💀</Text>
          <Heading fontSize="4rem" color="secondary" margin="40px 0" textAlign="center">
            Complete Compromise
          </Heading>
          <FlexBox flexDirection="column" alignItems="center">
            <Appear>
              <Text fontSize="2.5rem" color="white" margin="20px 0">🍪 Steal Sessions</Text>
            </Appear>
            <Appear>
              <Text fontSize="2.5rem" color="white" margin="20px 0">🔍 Read Private Data</Text>
            </Appear>
            <Appear>
              <Text fontSize="2.5rem" color="white" margin="20px 0">🎭 Impersonate Users</Text>
            </Appear>
          </FlexBox>
        </FlexBox>
      </Slide>

      {/* Slide 4: Demo Transition */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="6rem" margin="0" textAlign="center">👀</Text>
          <Heading fontSize="5rem" color="quaternary" margin="40px 0" textAlign="center">
            Let Me Show You
          </Heading>
          <Text fontSize="2rem" color="white" textAlign="center">
            Live XSS Demo
          </Text>
        </FlexBox>
      </Slide>

      {/* Slide 5: The Hero - CSP */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="6rem" margin="0" textAlign="center">🛡️</Text>
          <Heading fontSize="4.5rem" color="tertiary" margin="40px 0" textAlign="center">
            Content Security Policy
          </Heading>
          <Appear>
            <Text fontSize="2.5rem" color="white" margin="20px 0" textAlign="center">
              Browser-level protection
            </Text>
          </Appear>
          <Appear>
            <Text fontSize="2rem" color="gray" textAlign="center">
              Only approved scripts can run
            </Text>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 6: The Nonce - Technical but Visual */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="5rem" margin="0" textAlign="center">🔑</Text>
          <Heading fontSize="4rem" color="tertiary" margin="40px 0" textAlign="center">
            The Nonce
          </Heading>
          <Text fontSize="2rem" color="white" margin="20px 0" textAlign="center">
            "Number Used Once"
          </Text>
          <Box backgroundColor="#1a1a1a" padding="30px" borderRadius="10px" margin="40px">
            <CodePane language="http" theme="dark" fontSize="1.2rem">
{`Content-Security-Policy: script-src 'nonce-a8f7h3kl9'`}
            </CodePane>
          </Box>
          <Appear>
            <Text fontSize="1.5rem" color="gray" textAlign="center">
              Unique secret for every page load
            </Text>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 7: Before/After - The Victory */}
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

      {/* Slide 8: AI Integration */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="6rem" margin="0" textAlign="center">🤖</Text>
          <Heading fontSize="4rem" color="quaternary" margin="40px 0" textAlign="center">
            Built with AI
          </Heading>
          <Text fontSize="2rem" color="white" margin="20px 0" textAlign="center">
            Code generation, security review, and this presentation
          </Text>
          <Appear>
            <Text fontSize="1.8rem" color="gray" textAlign="center">
              AI accelerates secure development
            </Text>
          </Appear>
        </FlexBox>
      </Slide>

      {/* Slide 9: Call to Action */}
      <Slide backgroundColor="primary">
        <FlexBox height="100vh" flexDirection="column" justifyContent="center">
          <Text fontSize="5rem" margin="0" textAlign="center">🚀</Text>
          <Heading fontSize="3.5rem" color="tertiary" margin="40px 0" textAlign="center">
            Implement CSP Today
          </Heading>
          <FlexBox flexDirection="column" alignItems="center">
            <Text fontSize="2rem" color="white" margin="15px 0">✅ Generate nonces</Text>
            <Text fontSize="2rem" color="white" margin="15px 0">✅ Set CSP headers</Text>
            <Text fontSize="2rem" color="white" margin="15px 0">✅ Use AI to accelerate</Text>
          </FlexBox>
          
          <Box margin="60px 0 0 0" textAlign="center">
            <Heading fontSize="3rem" color="quaternary">
              Questions?
            </Heading>
            <Text fontSize="1.2rem" color="gray" margin="20px 0">
              @lewisking • Senior Security Advocate
            </Text>
          </Box>
        </FlexBox>
      </Slide>
    </Deck>
  );
}

export default Presentation;
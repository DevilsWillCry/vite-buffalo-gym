import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-10px);
  }
`;
const AnimatedBox = styled(Box)({
  animation: `${bounce} 3s infinite`,
});

//import React from 'react'
function MainComponent() {
  return (
    <div>
      <h1>Main Component</h1>
    </div>
  );
}

export default MainComponent;

import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import loadingIcon from "../assets/buffalo-logo.svg";

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


function LoadingComponent() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 3000);

  
  return (
    <AnimatedBox
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="img"
        alt={loadingIcon}
        src={loadingIcon}
        sx={{
          borderRadius: "50px",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontStyle: "italic",
          fontWeight: "bold",
        }}
      >
        Buffalo
      </Typography>
    </AnimatedBox>
  );
}

export default LoadingComponent;

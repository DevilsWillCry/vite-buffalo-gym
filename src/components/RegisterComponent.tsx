import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import loadingIcon from "../assets/buffalo-logo.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          component="img"
          alt={loadingIcon}
          src={loadingIcon}
          sx={{
            borderRadius: "50px",
            width: "200px",
            height: "200px",
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "80%", height:"30%"},
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            fullWidth
            id="outlined-name"
            label="Full Name"
            type="text"
            variant="outlined"
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "lightblue",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Email"
            type="email"
            variant="outlined"
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "lightblue",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
                    <TextField
            required
            fullWidth
            id="outlined-phone-number"
            label="Phone Number"
            type="number"
            variant="outlined"
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "lightblue",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <TextField
            required
            id="outlined-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    sx={{
                      color: "white", // Cambia el color del ícono
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputBase-input": {
                color: "white", // Color del texto
              },
              "& .MuiInputLabel-root": {
                color: "white", // Color del label
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white", // Color del label al enfocar
              },
            }}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          marginTop: "20px",
          marginBottom: "10px",
          width: "80%",
          padding: "10px",
          borderRadius: "10px",
          fontSize: "15px",
          color: "white",
          fontWeight: "bold",
          backgroundColor: "#2BE7E8",
          "&:hover": {
            backgroundColor: "#2CE7E5",
          },
        }}
      >
        Sing In
      </Button>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Or Sing In with</Typography>
        {/*Imagen de Google y Facebook*/}
        <Box display="flex" gap="20px" marginTop="5px" marginBottom="0.5rem">
          <GoogleIcon
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
          <FacebookIcon
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
        </Box>
      </Box>
      <Typography>
        Do have an account?
        <Box
          sx={{
            display:"inline-block",
            color: "#2BE7E8",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
        >
          <Link to="/login">Sing In</Link>
        </Box>
      </Typography>
    </Box>
  );
}

export default RegisterComponent;

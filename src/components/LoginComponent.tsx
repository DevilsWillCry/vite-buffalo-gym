import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  Button,
  Skeleton,
  Stack,
} from "@mui/material";
import { VariantType, useSnackbar } from "notistack";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import loadingIcon from "../assets/buffalo-logo.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
} from "../firebase/firebase.config";


import { User } from "../interfaces/types";
import { useDispatch } from "react-redux";

import { login } from "../redux/slices/userSlice";

function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [successAccount, setSuccessAccount] = useState(false);
  const [errorAccount, setErrorAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    if (!successAccount) {
      enqueueSnackbar("Invalid email or password!", { variant });
      return;
    }
    enqueueSnackbar("Welcome Back!", { variant });
  };

  useEffect(() => {
    if (!successAccount && errorAccount) {
      handleClickVariant("error")();
      setErrorAccount(false);
    } else if (successAccount && !errorAccount) {
      handleClickVariant("success")();
      setSuccessAccount(false);
    }
  }, [successAccount, errorAccount]);

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

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const updateUserData = (await getDoc(userDocRef)).data() as User;
      console.log(updateUserData);
      
      dispatch(login(updateUserData))
      
      console.log("Usuario autenticado con Google:", userCredential.user);
      setSuccessAccount(true);
      setLoading(false);
      navigate("/userData");
    } catch (error) {
      console.error("Error en autenticación con Google:", error);
      setErrorAccount(true);
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, facebookProvider);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const updateUserData = (await getDoc(userDocRef)).data() as User;
      console.log(updateUserData);

      dispatch(login(updateUserData))

      console.log("Usuario autenticado con Facebook:", userCredential.user);
      setSuccessAccount(true);
      setLoading(false);
      navigate("/userData");
    } catch (error) {
      console.error("Error en autenticación con Facebook:", error);
      setErrorAccount(true);
      setLoading(false);
    }
  };

  const signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed in successfully!", user);
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data() as User;
        console.log("User data from Firestore:", userData);
        dispatch(login(userData));
      } else {
        console.log("No such user data!");
        return
      }

      navigate("/userData");
      setSuccessAccount(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorAccount(true);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Stack spacing={3}>
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangular" width={210} height={210} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
        <Skeleton variant="text" width={210} height={40} />
        <Skeleton variant="text" width={210} height={40} />
      </Stack>
    );
  }

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
            width: "300px",
            height: "300px",
          }}
        />
        <FormControl
          component="form"
          onSubmit={signin}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "80%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
          noValidate
        >
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              marginBottom: "30px",
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
        </FormControl>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>Or Sing In with</Typography>
        {/*Imagen de Google y Facebook*/}
        <Box display="flex" gap="10px" marginTop="5px" marginBottom="2rem">
          <GoogleIcon
            onClick={signInWithGoogle}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
          <FacebookIcon
            onClick={signInWithFacebook}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
        </Box>
      </Box>
      <Typography marginTop="5px">
        Already have an account?{" "}
        <Box
          component={Link}
          to="/register"
          sx={{
            color: "#2BE7E8",
            fontWeight: "bold",
            textDecoration: "none",
            marginLeft: "5px",
          }}
        >
          Sign In
        </Box>
      </Typography>
    </Box>
  );
}

export default LoginComponent;

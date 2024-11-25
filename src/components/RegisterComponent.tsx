import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
  IconButton,
  FormControl,
  Skeleton,
  Stack,
} from "@mui/material";
import { VariantType, useSnackbar } from "notistack";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../firebase/firebase.config";
import { db } from "../firebase/firebase.config";
import { setDoc, doc, getDoc } from "firebase/firestore";

import loadingIcon from "../assets/buffalo-logo.svg";

import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import { User } from "../interfaces/types";

function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [successAccount, setSuccessAccount] = useState(false);
  const [errorAccount, setErrorAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    if (!successAccount) {
      enqueueSnackbar("Invalid email or password!", { variant });
      return;
    }
    enqueueSnackbar("Account created successfully!", { variant });
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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must only contain digits")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            name: values.name,
            phone: values.phone,
            email: values.email,
            createdAt: user.metadata.creationTime,
            isAdmin: false,
            age: null,
            gender: null,
            height: null,
            weight: null,
          });
        }

        const updateUserData = (await getDoc(userDocRef)).data() as User;
        dispatch(login(updateUserData));

        setSuccessAccount(true);
        setLoading(false);

        navigate("/userData");
      } catch (error) {
        console.error("Error creating user:", error);
        setErrorAccount(true);
        setLoading(false);
      }
    },
  });

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          phone: null,
          email: user.email,
          createdAt: user.metadata.creationTime,
          isAdmin: false,
          age: null,
          gender: null,
          height: null,
          weight: null,
        });
      }
      const updateUserData = (await getDoc(userDocRef)).data() as User;

      dispatch(login(updateUserData));

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
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName,
          phone: null,
          email: user.email,
          createdAt: user.metadata.creationTime,
          isAdmin: false,
          age: null,
          gender: null,
          height: null,
          weight: null,
        });
      }
      const updateUserData = (await getDoc(userDocRef)).data() as User;

      dispatch(login(updateUserData));

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

  if (loading) {
    return (
      <Stack spacing={3}>
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangular" width={210} height={210} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rectangular" width={210} height={60} />
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
          justifyContent: "center",
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
        <FormControl
          component="form"
          onSubmit={formik.handleSubmit}
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
            label="Full Name"
            name="name"
            type="text"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "lightblue" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
          <TextField
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "lightblue" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phone"
            type="number"
            variant="outlined"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "lightblue" },
              "& .MuiInputBase-input": { color: "white" },
            }}
          />
          <TextField
            required
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "hide password" : "show password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "#2E3562",
              borderRadius: "10px",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "lightblue" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: "20px",
              width: "80%",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "15px",
              color: "white",
              fontWeight: "bold",
              backgroundColor: "#2BE7E8",
              "&:hover": { backgroundColor: "#2CE7E5" },
            }}
          >
            Sign Up
          </Button>
        </FormControl>
      </Box>
      <Box
        textAlign="center"
        marginTop="20px"
        sx={{
          justifyContent: "center",
        }}
      >
        <Typography>Or Sign In with</Typography>
        <Box
          display="flex"
          gap="20px"
          marginTop="5px"
          textAlign="center"
          justifyContent="center"
        >
          <GoogleIcon
            onClick={signInWithGoogle}
            sx={{ width: "30px", height: "30px" }}
          />
          <FacebookIcon
            onClick={signInWithFacebook}
            sx={{ width: "30px", height: "30px" }}
          />
        </Box>
      </Box>
      <Typography marginTop="5px">
        Already have an account?{" "}
        <Box
          component={Link}
          to="/login"
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

export default RegisterComponent;

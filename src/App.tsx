//import { useState } from 'react'
import { Box } from "@mui/material";
import CarrouselImages from "./components/CarrouselImages";
import LoadingComponent from "./components/LoadingComponent";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";

function App() {
  return (
    <Box display="flex" flexDirection="column">
      <Routes>
        <Route path="/" element={<LoadingComponent />} />
        <Route path="/CarrouselImages" element={<CarrouselImages />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
      </Routes>
    </Box>
  );
}

export default App;

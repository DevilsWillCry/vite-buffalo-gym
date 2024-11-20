//import { useState } from 'react'
import { Box } from "@mui/material";
import CarrouselImages from "./components/CarrouselImages";
import LoadingComponent from "./components/LoadingComponent";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ScrollPicker from "./components/ScrollPicker";

function App() {
  const numbers = Array.from({ length: 50 }, (_, i) => 150 + i);
  return (
    <Box display="flex" flexDirection="column">
      <Routes>
        <Route path="/" element={<LoadingComponent />} />
        <Route path="/CarrouselImages" element={<CarrouselImages />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/userData" element={<ScrollPicker items={numbers} />} />
      </Routes>
    </Box>
  );
}

export default App;

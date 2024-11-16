//import { useState } from 'react'
import { Box } from "@mui/material";
import MainComponent from "./components/MainComponent";
import LoadingComponent from "./components/LoadingComponent";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box display="flex" flexDirection="column">
      <Routes>
        <Route path="/loadingScreen" element={<LoadingComponent />} />
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </Box>
  );
}

export default App;

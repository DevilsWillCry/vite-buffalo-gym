import { Box } from "@mui/material";
import CarrouselImages from "./components/CarrouselImages";
import LoadingComponent from "./components/LoadingComponent";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ScrollPicker from "./components/ScrollPicker";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const numbers = Array.from({ length: 50 }, (_, i) => 150 + i);

  return (
    <Box display="flex" flexDirection="column">
      <Routes>
        {/* Ruta pública para carga inicial */}
        <Route path="/" element={<LoadingComponent />} />

        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginComponent />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterComponent />
            </PublicRoute>
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/CarrouselImages"
          element={
            <PrivateRoute>
              <CarrouselImages />
            </PrivateRoute>
          }
        />
        <Route
          path="/userData"
          element={
            <PrivateRoute>
              <ScrollPicker items={numbers} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;

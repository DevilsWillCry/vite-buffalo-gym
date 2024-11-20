import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import store from "./redux/store"
import { Provider } from "react-redux";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);

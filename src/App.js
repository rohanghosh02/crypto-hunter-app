import { StyledEngineProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/styles/App.css";
import Header from "./components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import Alert from "./components/Alert";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="main">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Alert />
    </StyledEngineProvider>
  );
}

export default App;

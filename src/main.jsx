import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadingPractice from "./pages/ReadingPractice.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/reading" element={<ReadingPractice />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

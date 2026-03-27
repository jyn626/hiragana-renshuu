import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadType from "./pages/ReadType.jsx";
import CharactersList from "./pages/CharactersList.jsx";
import Reading from "./pages/Reading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/read-type" element={<ReadType />}></Route>
        <Route path="/characters" element={<CharactersList />}></Route>
        <Route path="/reading" element={<Reading />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

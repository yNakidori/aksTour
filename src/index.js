import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Destinys from "./Destinys";
import Services from "./Services";
import Contact from "./Contact";
import SignIn from "./auth/signin";
import LogIn from "./auth/login";
import Social from "./Social";
import Admin from "./Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/destinys" element={<Destinys />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/social" element={<Social />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

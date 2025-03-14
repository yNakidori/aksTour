import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import "./index.css";
import App from "./App";
import Destinys from "./Destinys";
import LocalDestinys from "./LocalDestinys";
import InternationalDestinys from "./InternationalDestinys";
import Events from "./Events";
import Cruise from "./Cruise";
import Services from "./Services";
import Contact from "./Contact";
import SignIn from "./auth/signin";
import LogIn from "./auth/login";
import Social from "./Social";
import Admin from "./Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HeroUIProvider>
    <ToastProvider />
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/destinys" element={<Destinys />} />
          <Route path="/destinys/nacionais" element={<LocalDestinys />} />
          <Route
            path="/destinys/internacionais"
            element={<InternationalDestinys />}
          />
          <Route path="/events" element={<Events />} />
          <Route path="/cruise" element={<Cruise />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/social" element={<Social />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </HeroUIProvider>
);

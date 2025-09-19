import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Destinys from "./Destinys";
import LocalDestinys from "./LocalDestinys";
import InternationalDestinys from "./InternationalDestinys";
import Events from "./Events";
import Cruise from "./Cruise";
import Bus from "./Bus";
import Services from "./Services";
import Contact from "./Contact";
import SignIn from "./auth/signin";
import LogIn from "./auth/login";
import Social from "./Social";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";
import TestPayment from "./TestPayment";

const stripePromise = loadStripe(""); 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
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
          <Route path="/bus" element={<Bus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/test-payment" element={<TestPayment />} />
          <Route path="/social" element={<Social />} />
        </Routes>
      </BrowserRouter>
    </Elements>
  </React.StrictMode>
);

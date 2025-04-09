import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firbase";
import { useNavigate } from "react-router-dom";
import Navbar from "../assets/navbar";
import Footer from "../assets/footer";

const API_KEY = "ZhQzWiPCEQ7WZBr8VoPrwy6QRdNP7pvuRXydUyZd4w5kRBC6MnkVmb8f";
const QUERY = "turism";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${QUERY}&per_page=1`,
          {
            headers: { Authorization: API_KEY },
          }
        );
        const data = await response.json();
        if (data.photos.length > 0) {
          setBackgroundImage(data.photos[0].src.landscape);
        }
      } catch (error) {
        console.log("Erro ao buscar imagem do Pexels:", error);
      }
    };

    fetchBackgroundImage();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuário logado: ", userCredential.user);
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage(null);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Email de redefinição de senha enviado!");
    } catch (error) {
      setResetMessage(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <section
        className="bg-gray-50 dark:bg-orange-200 min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <div className="bg-black bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">
            Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Seu email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary-300"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary-300"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 p-2 rounded-lg"
            >
              Login
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>

          <form onSubmit={handleResetPassword} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Email para redefinição de senha
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-primary-300"
                placeholder="name@company.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 p-2 rounded-lg"
            >
              Redefinir senha
            </button>
            {resetMessage && (
              <p className="text-green-500 text-center">{resetMessage}</p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;

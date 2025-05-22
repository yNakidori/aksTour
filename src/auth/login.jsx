import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firbase";
import { useNavigate } from "react-router-dom";
import swiss from "../assets/images/swiss.jpg";
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
          setBackgroundImage(data.photos[0].src.large2x);
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Email de redefinição de senha enviado!");
    } catch (error) {
      setResetMessage(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: `url(${swiss})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-6xl h-[700px] bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Seção do formulário */}
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white">
            <h2 className="text-4xl font-bold text-center mb-8">
              Bem-vindo de volta
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Senha"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                Entrar
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>

            <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Email para redefinir senha"
                required
              />
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-3 rounded-lg text-lg hover:bg-gray-700 transition"
              >
                Redefinir Senha
              </button>
              {resetMessage && (
                <p className="text-green-500 text-center">{resetMessage}</p>
              )}
            </form>
          </div>

          {/* Seção da imagem com chamada */}
          <div
            className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center text-white relative"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
            <div className="bg-black bg-opacity-60 p-12 rounded-2xl text-center max-w-sm">
              <h2 className="text-4xl font-bold mb-6">Comece sua jornada</h2>
              <p className="mb-6 text-lg">
                Explore, descubra novos lugares e inspire-se com as
                possibilidades.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

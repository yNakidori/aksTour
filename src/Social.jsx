import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import Lottie from "react-lottie";
import SocialLottie from "./assets/animations/SocialLottie.json";

const Social = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: SocialLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center h-screen bg-sky-200">
        <h1 className="text-4xl font-bold text-center text-orange-900 mb-4">
          Redes Sociais
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Estamos preparando algo incrível para você! Fique ligado nas nossas
          redes sociais e não perca nenhuma novidade. Siga-nos e faça parte da
          nossa comunidade!
        </p>
        <div className="w-full max-w-md">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Social;

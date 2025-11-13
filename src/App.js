import "./App.css";
import Navbar from "./assets/navbar";
import TravelCarousel from "./assets/carousel";
import CardsBar from "./assets/homepage/cardsBar";
import AccommodationList from "./assets/admin/AccommodationList";
import Savan from "./assets/homepage/savan";
import EuroTuor from "./assets/homepage/euroTuor";
import Featured from "./assets/homepage/featured";
import Companys from "./assets/homepage/companys";
import Clients from "./assets/homepage/clients";
import Footer from "./assets/footer";
import Whats from "./assets/whats";
import CartIcon from "./assets/animations/CartIcon.json";
import ReactiveButton from "reactive-button";
import Lottie from "react-lottie";
import { useState } from "react";

function App() {
  const [isCartHovered, setIsCartHovered] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const cartOptions = {
    loop: true,
    autoplay: isCartHovered,
    animationData: CartIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const whatsappNumber = "5511957700305";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá!`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  const handleCartClick = () => {
    window.location.href = "/store";
  }

  return (
    <div className=" ">
      <TravelCarousel />
      <Navbar />
      <div className="container mx-auto">
        <CardsBar />
      </div>

      <div className="container mx-auto">
        <Savan />
      </div>
      <div className="container mx-auto">
        <EuroTuor />
      </div>
      <div className="container mx-auto">
        <Featured />
      </div>

      {/* TÍTULO ANTES DA LISTA DE HOSPEDAGENS */}
      <div className="container mx-auto">
        <div className="text-center mt-10 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Confira aqui algumas das nossas opções de hospedagem!
          </h1>
          <div className="h-1 w-16 bg-pink-600 mx-auto mt-2 mb-6"></div>
        </div>
        <AccommodationList isAdmin={false} />
      </div>

      {/* NOVA SEÇÃO: Quem Somos */}
      <div className="container mx-auto my-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quem somos</h2>
        <div className="h-1 w-16 bg-blue-500 mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Somos uma agência especializada em criar experiências inesquecíveis.
          Seja uma viagem de férias, intercâmbio ou hospedagens exclusivas,
          nosso compromisso é com a sua satisfação e segurança. Conheça nossos
          destinos e venha viajar com tranquilidade!
        </p>
      </div>

      {/* NOVA SEÇÃO: Destaques da Semana */}
      <div className="container mx-auto my-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Destaques
        </h2>
        <div className="h-1 w-16 bg-yellow-500 mx-auto mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Promoções Relâmpago</h3>
            <p className="text-gray-600">
              Aproveite ofertas especiais em destinos selecionados por tempo
              limitado.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Destinos Exóticos</h3>
            <p className="text-gray-600">
              Descubra lugares fora do comum com pacotes exclusivos e
              personalizados.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
            <p className="text-gray-600">
              Nossa equipe está sempre disponível para te ajudar, antes, durante
              e depois da viagem.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <Companys />
      </div>
      <div className="container mx-auto">
        <Clients />
      </div>

      {/* NOVA SEÇÃO: Depoimento de Cliente */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            O que dizem nossos viajantes
          </h2>
          <div className="h-1 w-16 bg-green-500 mx-auto mb-6"></div>
          <div className="max-w-4xl mx-auto">
            <p className="italic text-gray-700 text-lg">
              “A melhor experiência que já tive! Tudo muito organizado,
              atendimento rápido e destinos incríveis. Recomendo para todos que
              querem viajar com tranquilidade.”
            </p>
            <span className="block mt-4 font-semibold text-gray-800">
              — Mariana Costa
            </span>
          </div>
        </div>
      </div>

      {/* Botões Flutuantes - WhatsApp e Carrinho */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
        <button 
          className="relative group cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 bg-white rounded-full p-1.5 shadow-lg hover:shadow-xl border-2 border-blue-500"
          onMouseEnter={() => setIsCartHovered(true)}
          onMouseLeave={() => setIsCartHovered(false)}
          onClick={handleCartClick}
        >
          <Lottie options={cartOptions} height={55} width={55} />
          
          {/* Badge "Loja" */}
          <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
            LOJA
          </span>
        </button>
        
        <button
          className="cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 rounded-full shadow-lg hover:shadow-xl"
          onClick={handleWhatsAppClick}
        >
          <Lottie options={defaultOptions} height={75} width={75} />
        </button>
      </div>

      {/* CHAMADA FINAL */}
      <div className="text-center mt-10 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Clique aqui e saiba tudo sobre as nossas oportunidades!
        </h1>
        <div className="h-1 w-16 bg-cyan-500 mx-auto mt-2 mb-6"></div>
      </div>
      <div className="items-center justify-center flex mb-8">
        <ReactiveButton
          idleText="Quero conhecer!"
          color="primary"
          size="large"
          rounded
          shadow
          onClick={handleWhatsAppClick}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;

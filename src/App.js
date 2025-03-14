import "./App.css";
import Navbar from "./assets/navbar";
import TravelCarousel from "./assets/carousel";
import CardsBar from "./assets/homepage/cardsBar";
import Vacation from "./assets/homepage/vacation";
import Featured from "./assets/homepage/featured";
import Gastro from "./assets/homepage/gastro";
import Companys from "./assets/homepage/companys";
import Clients from "./assets/homepage/clients";
import Footer from "./assets/footer";
import Whats from "./assets/whats";
import ReactiveButton from "reactive-button";
import Lottie from "react-lottie";
import { FlightsForm } from "./assets/flights/FlightsForm/FlightForm";

function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const whatsappNumber = "5511957700305";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Olá!`;

  const handleWhatsAppClick = () => {
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className=" ">
      <Navbar />
      <TravelCarousel />
      <div className="container mx-auto">
        <FlightsForm />
      </div>
      <div className="container mx-auto">
        <CardsBar />
      </div>
      <div className="container mx-auto">
        <Featured />
      </div>
      <div className="container mx-auto">
        <Vacation />
      </div>
      {/*<div className="container mx-auto">
        <Gastro />
      </div>*/}
      <div className="container mx-auto">
        <Companys />
      </div>
      <div className="container mx-auto">
        <Clients />
      </div>
      <div
        className="fixed bottom-5 right-5 z-50"
        onClick={handleWhatsAppClick}
      >
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
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

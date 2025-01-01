import "./App.css";
import Navbar from "./assets/navbar";
import TravelCarousel from "./assets/carousel";
import CardsBar from "./assets/homepage/cardsBar";
import Vacation from "./assets/homepage/vacation";
import Gastro from "./assets/homepage/gastro";
import Companys from "./assets/homepage/companys";
import Footer from "./assets/footer";
import Whats from "./assets/whats";
import Lottie from "react-lottie";

function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Whats,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className=" ">
      <Navbar />
      <TravelCarousel />
      <div className="container mx-auto">
        <CardsBar />
      </div>
      <div className="container mx-auto">
        <Vacation />
      </div>
      <div className="container mx-auto">
        <Gastro />
      </div>
      <div className="container mx-auto">
        <Companys />
      </div>
      <div className="fixed bottom-5 right-5 z-50">
        <Lottie options={defaultOptions} height={100} width={100} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

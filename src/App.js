import "./App.css";
import Navbar from "./assets/navbar";
import TravelCarousel from "./assets/carousel";
import CardsBar from "./assets/homepage/cardsBar";
import Footer from "./assets/footer";

function App() {
  return (
    <div className=" ">
      <Navbar />
      <TravelCarousel />
      <div className="container mx-auto">
        <CardsBar />
      </div>
      <div className="container mx-auto">
        <CardsBar />
      </div>
      <div className="container mx-auto">
        <CardsBar />
      </div>
      <div className="container mx-auto">
        <CardsBar />
      </div>
      <div className="container mx-auto">
        <CardsBar />
      </div>
      <Footer />
    </div>
  );
}

export default App;

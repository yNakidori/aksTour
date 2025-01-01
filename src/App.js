import "./App.css";
import Navbar from "./assets/navbar";
import TravelCarousel from "./assets/carousel";
import CardsBar from "./assets/homepage/cardsBar";
import Vacation from "./assets/homepage/vacation";
import Gastro from "./assets/homepage/gastro";
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
        <Vacation />
      </div>
      <div className="container mx-auto">
        <Gastro />
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

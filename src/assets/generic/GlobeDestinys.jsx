// src/data/destinos.js
// ny
import ny from "../images/globe/ny.png";
import ny2 from "../images/globe/ny2.png";
import ny3 from "../images/globe/ny3.png";
// mp
import mp from "../images/globe/mp.png";
import mp2 from "../images/globe/mp2.png";
import mp3 from "../images/globe/mp3.png";
// tk
import tk from "../images/globe/tk.png";
import tk2 from "../images/globe/tk2.png";
import tk3 from "../images/globe/tk3.png";
// sdn
import sdn from "../images/globe/sdn.png";
import sdn2 from "../images/globe/sdn2.png";
import sdn3 from "../images/globe/sdn3.png";
// lond
import lond from "../images/globe/lond.png";
import lond2 from "../images/globe/lond2.png";
import lond3 from "../images/globe/lond3.png";
// agra
import agra from "../images/globe/agra.png";
import agra2 from "../images/globe/agra2.png";
import agra3 from "../images/globe/agra3.png";
// paris
import paris from "../images/globe/paris.png";
import paris2 from "../images/globe/paris2.png";
import paris3 from "../images/globe/paris3.png";
// roma
import roma from "../images/globe/roma.png";
import roma2 from "../images/globe/roma2.png";
import roma3 from "../images/globe/roma3.png";
// vf
import vf from "../images/globe/vf.png";
import vf2 from "../images/globe/vf2.png";
import vf3 from "../images/globe/vf3.png";

const destinos = [
  {
    lat: 40.7128,
    lng: -74.006,
    size: 0.5,
    label: "Nova York",
    images: [ny, ny2, ny3],
    description:
      "Nova York é famosa por sua arquitetura imponente e vida agitada.",
  },
  {
    lat: 35.6895,
    lng: 139.6917,
    size: 0.5,
    label: "Tóquio",
    images: [tk, tk2, tk3],
    description:
      "Tóquio é a capital do Japão e um dos maiores centros urbanos do mundo.",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    size: 0.5,
    label: "Paris",
    images: [paris, paris2, paris3],
    description:
      "Paris, a cidade do amor, é conhecida por sua Torre Eiffel e museus icônicos.",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    size: 0.5,
    label: "Sydney",
    images: [sdn, sdn2, sdn3],
    description:
      "Sydney é famosa por sua Opera House e belas praias como Bondi Beach.",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    size: 0.5,
    label: "Londres",
    images: [lond, lond2, lond3],
    description:
      "Londres é uma cidade histórica com atrações como o Big Ben e o Palácio de Buckingham.",
  },
  {
    lat: 27.1751,
    lng: 78.0421,
    size: 0.5,
    label: "Agra",
    images: [agra, agra2, agra3],
    description:
      "Agra é lar do Taj Mahal, uma das sete maravilhas do mundo moderno.",
  },
  {
    lat: -13.1631,
    lng: -72.545,
    size: 0.5,
    label: "Machu Picchu",
    images: [mp, mp2, mp3],
    description:
      "Machu Picchu é uma antiga cidade inca localizada nas montanhas do Peru.",
  },
  {
    lat: 41.9028,
    lng: 12.4964,
    size: 0.5,
    label: "Roma",
    images: [roma, roma2, roma3],
    description:
      "Roma é conhecida por sua história antiga e monumentos como o Coliseu.",
  },
  {
    lat: -17.9243,
    lng: 25.8572,
    size: 0.5,
    label: "Victoria Falls",
    images: [vf, vf2, vf3],
    description:
      "Victoria Falls é uma das maiores e mais impressionantes cachoeiras do mundo.",
  },
];

export default destinos;

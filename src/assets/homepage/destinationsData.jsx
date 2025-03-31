import colombia from "../../assets/images/cards/colombia.png";
import chile from "../../assets/images/cards/chile.png";
import canada from "../../assets/images/cards/canada.png";
import grecia from "../../assets/images/cards/grecia.png";
import caribe from "../../assets/images/cards/caribe.png";
import disney from "../../assets/images/cards/disney/disney.png";
import d1 from "../../assets/images/cards/disney/d1.png";
import d2 from "../../assets/images/cards/disney/d2.png";
import d3 from "../../assets/images/cards/disney/d3.png";
import d4 from "../../assets/images/cards/disney/d4.png";
import d5 from "../../assets/images/cards/disney/d5.png";
import b1 from "../../assets/images/cards/bariloche/b1.png";
import b2 from "../../assets/images/cards/bariloche/b2.png";
import b3 from "../../assets/images/cards/bariloche/b3.png";
import b4 from "../../assets/images/cards/bariloche/b4.png";
import b5 from "../../assets/images/cards/bariloche/b5.png";
import cp1 from "../../assets/images/cards/capadocia/cp1.png";
import cp2 from "../../assets/images/cards/capadocia/cp2.png";
import cp3 from "../../assets/images/cards/capadocia/cp3.png";
import cp4 from "../../assets/images/cards/capadocia/cp4.png";
import cp5 from "../../assets/images/cards/capadocia/cp5.png";
import bariloche from "../../assets/images/cards/bariloche/bariloche.png";
import capadocia from "../../assets/images/cards/capadocia/capadocia.png";

const destinations = [
  {
    image: disney,
    title: "Walt Disney World Resort",
    location: "Orlando, EUA",
    description:
      "O Walt Disney World Resort é um dos destinos turísticos mais icônicos do mundo, localizado em Orlando, Flórida...",
    images: [d1, d2, d3, d4, d5],
  },
  {
    image: bariloche,
    title: "Bariloche",
    location: "Argentina",
    description:
      "Bariloche, localizada na região dos Lagos Andinos, é um destino de montanha que encanta visitantes com sua beleza natural.",
    images: [b1, b2, b3, b4, b5],
  },
  {
    image: capadocia,
    title: "Capadócia",
    location: "Turquia",
    description:
      "A Capadócia é uma região mágica na Turquia, famosa por suas formações rochosas únicas e balões de ar quente.",
    images: [cp1, cp2, cp3, cp4, cp5],
  },
  {
    image: colombia,
    title: "Parque e Palácio de Monserrate",
    location: "Sintra, Portugal",
    description:
      "Escondido entre as colinas de Sintra, o Parque e Palácio de Monserrate é um refúgio de beleza natural e arquitetura deslumbrante...",
    images: [colombia], // Adicione imagens extras se tiver
  },
  {
    image: chile,
    title: "Parque Nacional Torres del Paine",
    location: "Magallanes, Chile",
    description:
      "O Parque Nacional Torres del Paine é um paraíso para os amantes da natureza e da aventura...",
    images: [chile], // Adicione imagens extras se necessário
  },
  {
    image: canada,
    title: "Lago Moraine",
    location: "Banff, Canadá",
    description:
      "O Lago Moraine, situado no coração das Montanhas Rochosas canadenses, é um espetáculo natural...",
    images: [canada],
  },
  {
    image: grecia,
    title: "Santorini",
    location: "Santorini, Grécia",
    description:
      "Com suas casas brancas e cúpulas azuis que contrastam com o mar cristalino, Santorini é um dos destinos mais românticos do mundo...",
    images: [grecia],
  },
  {
    image: caribe,
    title: "Otrobanda",
    location: "Willemstad, Curaçao",
    description:
      "Otrobanda, uma das regiões mais vibrantes de Willemstad, em Curaçao, é um destino repleto de cores, cultura e história...",
    images: [caribe],
  },
];

export default destinations;

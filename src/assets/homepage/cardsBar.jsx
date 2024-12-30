import React, { useState } from "react";
import DestinyCard from "./destinyCard";
import Modal from "@mui/joy/Modal";
import { Box, Typography } from "@mui/joy";
import Fade from "@mui/material/Fade";
import Slider from "react-slick";
import colombia from "../../assets/images/cards/colombia.png";
import chile from "../../assets/images/cards/chile.png";
import canada from "../../assets/images/cards/canada.png";
import grecia from "../../assets/images/cards/grecia.png";
import caribe from "../../assets/images/cards/caribe.png";
import m1 from "../../assets/images/cards/monserrate/m1.png";
import m2 from "../../assets/images/cards/monserrate/m2.png";
import m3 from "../../assets/images/cards/monserrate/m3.png";
import m4 from "../../assets/images/cards/monserrate/m4.png";

const CardsBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpenModal = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const destinations = [
    {
      image: colombia,
      title: "Parque e Palácio de Monserrate",
      location: "Sintra, Portugal",
      description:
        "Escondido entre as colinas de Sintra, o Parque e Palácio de Monserrate é um refúgio de beleza natural e arquitetura deslumbrante. O palácio, com seu design inspirado no romantismo, é cercado por jardins exuberantes que abrigam plantas exóticas de todo o mundo. Este é um lugar perfeito para quem busca tranquilidade e admira a harmonia entre a natureza e a arte.",
      images: [m1, m2, m3, m4],
    },
    {
      image: chile,
      title: "Parque Nacional Torres del Paine",
      location: "Magallanes, Chile",
      description:
        "O Parque Nacional Torres del Paine é um paraíso para os amantes da natureza e da aventura. Com suas imponentes montanhas, lagos azul-turquesa e glaciares imaculados, este parque é um dos tesouros mais preciosos da Patagônia chilena. Cada trilha revela paisagens de tirar o fôlego, proporcionando uma experiência única em contato com o selvagem.",
      images: [chile, canada],
    },
    {
      image: canada,
      title: "Lago Moraine",
      location: "Banff, Canada",
      description:
        "O Lago Moraine, situado no coração das Montanhas Rochosas canadenses, é um espetáculo natural que parece ter saído de um cartão postal. Suas águas cristalinas, cercadas por picos cobertos de neve, refletem um azul vibrante graças aos minerais das rochas. Ideal para trilhas, caiaque ou simplesmente contemplar a beleza incomparável.",
      images: [canada, grecia],
    },
    {
      image: grecia,
      title: "Santori",
      location: "Santorini, Grécia",
      description:
        "Com suas casas brancas que brilham sob o sol mediterrâneo e cúpulas azuis que contrastam com o mar cristalino, Santorini é um dos destinos mais românticos do mundo. Conhecida por seus pores do sol mágicos e sua rica história, esta ilha grega é o cenário perfeito para criar memórias inesquecíveis.",
      images: [grecia, caribe],
    },
    {
      image: caribe,
      title: "Otrobanda",
      location: "Willemstad, Curaçao",
      description:
        "Otrobanda, uma das regiões mais vibrantes de Willemstad, em Curaçao, é um destino repleto de cores, cultura e história. Suas ruas estreitas e arquitetura colonial contam histórias de um passado rico, enquanto o charme caribenho moderno conquista os visitantes. Um lugar perfeito para quem busca um mergulho na autenticidade e na beleza tropical.",
      images: [caribe, colombia],
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">Destinos Populares</h1>
        <div className="h-1 w-16 bg-blue-500 mx-auto mt-2"></div>
      </div>
      <Slider {...sliderSettings} className="mt-8 mb-8">
        {destinations.map((dest, index) => (
          <div key={index} className="px-2">
            <div onClick={() => handleOpenModal(dest)}>
              <DestinyCard
                image={dest.image}
                title={dest.title}
                location={dest.location}
                description={dest.description}
                imageAlt={dest.title}
              />
            </div>
          </div>
        ))}
      </Slider>
      {selectedCard && (
        <Modal open={!!selectedCard} onClose={handleCloseModal}>
          <Fade in={!!selectedCard}>
            <Box
              sx={{
                width: { xs: "90%", md: "80%" },
                maxHeight: "90%",
                margin: "auto",
                marginTop: "10vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                borderRadius: "12px",
                color: "white",
                overflow: "hidden",
                boxShadow: 24,
              }}
            >
              <div className="flex justify-between p-4">
                <Typography level="h4" textColor="white" fontWeight="bold">
                  {selectedCard.title}
                </Typography>
                <Typography textColor="neutral.300">
                  {selectedCard.location}
                </Typography>
              </div>
              <Typography className="px-4 text-gray-300">
                {selectedCard.description}
              </Typography>
              <div className="flex overflow-x-scroll space-x-4 p-4 mt-4 justify-center">
                {selectedCard.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Slide ${idx}`}
                    className="rounded-lg w-48 h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                ))}
              </div>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default CardsBar;

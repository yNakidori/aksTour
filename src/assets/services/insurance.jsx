import React from "react";
import Slider from "react-slick";
import { Card, CardMedia } from "@mui/material";
import affinity from "../images/insurance/affinityseguro.png";
import assistcard from "../images/insurance/assistcard.jpg";
import coris from "../images/insurance/corisseguro.png";
import gta from "../images/insurance/gtaseguros.png";
import hero from "../images/insurance/heroseguros.png";
import nest from "../images/insurance/nestseguros.png";
import omint from "../images/insurance/omintseguro.png";
import ontime from "../images/insurance/ontimeseguros.png";
import sulamerica from "../images/insurance/sulamerica.png";
import universal from "../images/insurance/universalseguro.png";

const Insurance = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Companhias de Seguro
        </h1>
        <div className="h-1 w-16 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
      </div>
      <div className="carousel-container px-5">
        <Slider {...settings}>
          {[
            affinity,
            assistcard,
            coris,
            gta,
            hero,
            nest,
            omint,
            ontime,
            sulamerica,
            universal,
          ].map((image, index) => (
            <div key={index} className="p-4">
              <Card
                className="card-item transition-transform duration-300 hover:scale-105"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={`Logo ${index}`}
                  style={{
                    height: "150px",
                    objectFit: "contain",
                    borderRadius: "10px",
                  }}
                />
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Insurance;

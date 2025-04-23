import React from "react";
import Slider from "react-slick";
import { Card, CardMedia } from "@mui/material";
import gol from "../images/gol.png";
import azul from "../images/azul.png";
import latam from "../images/latam.png";
import airfrance from "../images/airfrance.png";
import alitalia from "../images/alitalia.png";
import american from "../images/american.png";
import emirates from "../images/emirates.png";

const Companys = () => {
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
        <h1 className="text-3xl font-bold text-gray-800">Companhias Aéreas</h1>
        <div className="h-1 w-16 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
      </div>
      <div className="carousel-container px-5">
        <Slider {...settings}>
          {[gol, azul, latam, airfrance, alitalia, american, emirates].map(
            (image, index) => (
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
            )
          )}
        </Slider>
      </div>
    </>
  );
};

export default Companys;

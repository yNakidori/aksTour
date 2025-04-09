import React from "react";
import BookingCard from "../generic/BookingCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EuroCards = () => {
  const bookings = [
    {
      mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      cardName: "Suíte Master",
      rating: 4.8,
      description:
        "Vista para o mar, ar-condicionado, Wi-Fi e café da manhã incluso.",
      price: "R$ 450 / noite",
      amenities: "Wi-Fi, Café da manhã",
      dorms: "2 camas de casal",
    },
    {
      mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      cardName: "Quarto Econômico",
      rating: 4.2,
      description: "Ideal para uma estadia rápida, com ótimo custo-benefício.",
      price: "R$ 220 / noite",
      amenities: "Wi-Fi, Ventilador",
      dorms: "1 cama de casal",
    },
    {
      mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      cardName: "Cabana Luxo",
      rating: 5.0,
      description:
        "Experiência rústica com jacuzzi e lareira, perfeita para casais.",
      price: "R$ 750 / noite",
      amenities: "Jacuzzi, Lareira",
      dorms: "1 cama king size",
    },
    // Adicione mais aqui se quiser
  ];

  const handleReserve = (cardName) => {
    alert(`Reserva realizada para: ${cardName}`);
  };

  return (
    <div className="text-center mt-14">
      <h1 className="text-4xl font-bold text-gray-800">Faça sua Reserva!</h1>
      <div className="h-1 w-16 bg-blue-400 mx-auto mt-2"></div>

      <div style={{ padding: "20px" }}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={13}
          slidesPerView={4} // ou 3, se quiser mais por slide
          navigation
          pagination={{ clickable: true }}
        >
          {bookings.map((booking, index) => (
            <SwiperSlide key={index}>
              <BookingCard
                {...booking}
                onReserve={() => handleReserve(booking.cardName)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EuroCards;

import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import backgroundHero from "./assets/images/events/e3.png";
import EventTicketCard from "./assets/events/EventTicketCard";

const Events = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2)), url(${backgroundHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Descubra Eventos Incríveis em 2025
          </Typography>
          <Typography variant="h6">
            Festivais, feiras, shows e experiências únicas por todo o Brasil
          </Typography>
        </Box>
      </Box>

      {/* Destaques */}
      <Container sx={{ mt: 6, mb: 2, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Eventos em Destaque
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Confira os eventos mais aguardados que estão chegando
        </Typography>
      </Container>

      {/* Carrossel de Eventos */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          px: 4,
          pb: 6,
          scrollSnapType: "x mandatory",
        }}
      >
        {/* O componente EventTicketCard já busca os eventos do Firebase */}
        <EventTicketCard />
      </Box>

      <Footer />
    </>
  );
};

export default Events;

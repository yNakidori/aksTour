import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
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
      <Container sx={{ mt: 10, mb: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
          Eventos em Destaque
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Confira os eventos mais aguardados que estão chegando
        </Typography>
      </Container>

      {/* Carrossel de Eventos */}
      <Box
        sx={{
          backgroundColor: "#f0f4f8",
          py: 6,
          px: 4,
          overflowX: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            scrollSnapType: "x mandatory",
          }}
        >
          <EventTicketCard />
        </Box>
      </Box>

      {/* Nova Seção - Benefícios de participar */}
      <Container sx={{ py: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          gutterBottom
          color="primary"
        >
          Por que Participar de um Evento com a Gente?
        </Typography>

        <Grid container spacing={4} mt={3}>
          {[
            {
              icon: "🎫",
              title: "Ingressos Garantidos",
              desc: "Tenha acesso facilitado aos eventos mais disputados sem enfrentar filas ou riscos de esgotamento.",
            },
            {
              icon: "🚌",
              title: "Transporte Incluso",
              desc: "Saídas organizadas com segurança, conforto e pontualidade, direto para o evento.",
            },
            {
              icon: "🛏️",
              title: "Hospedagem e Roteiros",
              desc: "Oferecemos pacotes com hospedagem e passeios para curtir o evento sem preocupações.",
            },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  height: "100%",
                }}
              >
                <Typography variant="h3" component="div">
                  {item.icon}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                  color="primary"
                >
                  {item.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" mt={1}>
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Events;

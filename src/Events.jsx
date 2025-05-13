import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import backgroundHero from "./assets/images/events/e4.png";

import eventSuggestions from "./assets/events/events";

const Events = () => {
  const [search, setSearch] = useState("");

  const filteredEvents = eventSuggestions.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Hero */}
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

      {/* Conteúdo */}
      <Container sx={{ py: 6 }}>
        {/* Busca */}
        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            variant="outlined"
            label="Buscar por nome do evento"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ maxWidth: 500 }}
          />
        </Box>

        {/* Eventos */}
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.02)" },
                }}
              >
                <CardMedia
                  component="img"
                  image={event.image}
                  alt={event.title}
                  height="200"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Button fullWidth variant="contained">
                    Ver detalhes
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Box mt={8} textAlign="center">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Quer viajar para um desses eventos?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Fale com a nossa equipe e monte seu pacote!
          </Typography>
          <Button variant="outlined" size="large">
            Fale conosco
          </Button>
        </Box>
      </Container>

      <Footer />
    </>
  );
};

export default Events;

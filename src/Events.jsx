import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Container,
  TextField,
  Grid,
} from "@mui/material";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";

import e4 from "./assets/images/events/e4.png";
import e6 from "./assets/images/events/6.png";
import e3 from "./assets/images/events/e3.png";
import loola from "./assets/images/events/lollapalooza.png";
import f1 from "./assets/images/events/f1.png";
import bgs from "./assets/images/events/bgs.png";
import bienal from "./assets/images/events/bienal.png";
import gramado from "./assets/images/events/gramado.png";
import rock from "./assets/images/events/rock.png";
import spfw from "./assets/images/events/spfw.png";

const eventSuggestions = [
  {
    id: 1,
    title: "Lollapalooza",
    image: loola,
    description: "28, 29 e 30 de Março - 2025. Autódromo de Interlagos.",
  },
  {
    id: 2,
    title: "F1 2025",
    image: f1,
    description: "Cronograma completo para o Grande Prêmio do Brasil.",
  },
  {
    id: 3,
    title: "BGS 2025",
    image: bgs,
    description: "Brasil Game Show 2025. De 8 a 12 de Outubro.",
  },
  {
    id: 4,
    title: "Rock in Rio 2025",
    image: rock,
    description:
      "18 a 22 de setembro - Rio de Janeiro. O maior festival de música do Brasil!",
  },
  {
    id: 5,
    title: "São Paulo Fashion Week",
    image: spfw,
    description: "Abril de 2025 - São Paulo. A maior semana de moda do país.",
  },
  {
    id: 6,
    title: "Festival de Cinema de Gramado",
    image: gramado,
    description:
      "De 15 a 23 de agosto - Gramado, RS. O mais tradicional festival de cinema do Brasil.",
  },
  {
    id: 7,
    title: "Bienal do Livro 2025",
    image: bienal,
    description:
      "Agosto de 2025 - Rio de Janeiro. O maior evento literário do Brasil.",
  },
];

const Events = () => {
  const [search, setSearch] = useState("");
  const filteredEvents = eventSuggestions.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Box>
        {/* Banner */}
        <Box>
          <Carousel
            showArrows={false}
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
          >
            {[e4, e6, e3].map((img, i) => (
              <Box key={i}>
                <img
                  src={img}
                  alt={`Banner ${i + 1}`}
                  className="w-full h-screen object-cover"
                />
              </Box>
            ))}
          </Carousel>
        </Box>

        {/* Conteúdo principal */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            Eventos Imperdíveis de 2025
          </Typography>

          <Box mb={4} display="flex" justifyContent="center">
            <TextField
              label="Buscar evento"
              variant="outlined"
              fullWidth
              sx={{ maxWidth: 500 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 4,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={event.image}
                    alt={event.title}
                    height="180"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, textAlign: "right" }}>
                    <Button variant="contained" size="small">
                      Ingressos
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Events;

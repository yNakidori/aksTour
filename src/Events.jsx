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
} from "@mui/material";
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
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";

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
    image: rock, // Insira a imagem do evento
    description:
      "18 a 22 de setembro - Rio de Janeiro. O maior festival de música do Brasil!",
  },
  {
    id: 5,
    title: "São Paulo Fashion Week",
    image: spfw, // Imagem do desfile
    description: "Abril de 2025 - São Paulo. A maior semana de moda do país.",
  },
  {
    id: 6,
    title: "Festival de Cinema de Gramado",
    image: gramado, // Imagem do evento
    description:
      "De 15 a 23 de agosto - Gramado, RS. O mais tradicional festival de cinema do Brasil.",
  },
  {
    id: 7,
    title: "Bienal do Livro 2025",
    image: bienal, // Imagem do evento literário
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
    <div>
      <Navbar />
      <div className="relative min-h-screen">
        <div className="absolute top-0 left-0 w-full h-screen -z-10">
          <Carousel
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            {[e4, e6, e3].map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-screen object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-black/50 text-white p-6">
          <h1 className="text-4xl font-bold mb-6 font-poppins">
            Eventos imperdiveis
          </h1>

          <div className="max-w-4xl w-full mb-6">
            {/* Barra de pesquisa removida */}
          </div>

          <div className="w-full overflow-auto max-h-[400px]">
            {" "}
            {/* Aqui criamos a área rolável */}
            <div className="flex flex-wrap justify-center gap-6">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  sx={{
                    display: "flex",
                    width: 380, // Mantivemos o mesmo tamanho dos cards
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: 3,
                    position: "relative", // Para posicionamento absoluto do botão
                    marginBottom: 3, // Adicionando um espaçamento entre os cards
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: 150,
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                      objectFit: "cover",
                    }}
                    image={event.image}
                    alt={event.title}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      padding: 2,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        component="div"
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                      >
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {event.description}
                      </Typography>
                    </CardContent>

                    {/* Botão fixado no canto inferior direito */}
                    <Button
                      variant="outlined"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                      }}
                    >
                      <a href="">Ingressos</a>
                    </Button>
                  </Box>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;

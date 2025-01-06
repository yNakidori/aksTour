import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import InstagramPost from "./assets/contact/instagramPost";
import { Box, Button, Input, Textarea, Typography, Grid } from "@mui/joy";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-4xl w-full bg-white p-8 shadow-lg rounded-lg">
          <Typography variant="h3" textAlign="center" mb={2}>
            Entre em Contato
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={6}
          >
            Tem dúvidas ou quer falar conosco? Preencha o formulário abaixo e
            responderemos o mais breve possível.
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Grid para Nome e E-mail lado a lado */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" mb={1}>
                  Nome
                </Typography>
                <Input
                  placeholder="Seu nome"
                  fullWidth
                  sx={{ borderColor: "gray", borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" mb={1}>
                  E-mail
                </Typography>
                <Input
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  fullWidth
                  sx={{ borderColor: "gray", borderRadius: 2 }}
                />
              </Grid>
            </Grid>

            {/* Campo de Mensagem */}
            <Box>
              <Typography variant="body1" mb={1}>
                Mensagem
              </Typography>
              <Textarea
                placeholder="Sua mensagem"
                rows={5}
                fullWidth
                sx={{ borderColor: "gray", borderRadius: 2 }}
              />
            </Box>

            {/* Botão de Envio */}
            <Box display="flex" justifyContent="center">
              <Button variant="solid" color="primary" size="lg">
                Enviar Mensagem
              </Button>
            </Box>
          </Box>
        </div>
        <InstagramPost />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

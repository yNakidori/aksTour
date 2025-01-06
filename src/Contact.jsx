import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import InstagramPost from "./assets/contact/instagramPost";
import { Box, Button, Input, Textarea, Typography, Grid } from "@mui/joy";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-400 via-purple-300 to-yellow-200">
        {/* Seção Principal */}
        <div className="max-w-7xl w-full flex flex-wrap p-8 gap-8">
          {/* Texto à esquerda */}
          <div className="flex-1">
            <Typography variant="h3" fontWeight="bold" mb={2}>
              Tem uma pergunta?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Estamos aqui para ajudar! Preencha o formulário ou entre em
              contato por e-mail ou telefone. Nosso atendimento funciona de
              segunda a sexta, das 9h às 17h.
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Email:</strong> hello@exemplo.com
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Telefone:</strong> 1234-567-890
            </Typography>
            <Typography variant="body1" mb={4}>
              <strong>Instagram:</strong> <InstagramPost />
            </Typography>
          </div>

          {/* Formulário à direita */}
          <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" mb={1}>
                    Primeiro Nome
                  </Typography>
                  <Input
                    placeholder="Seu primeiro nome"
                    fullWidth
                    sx={{ borderColor: "gray", borderRadius: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" mb={1}>
                    Sobrenome
                  </Typography>
                  <Input
                    placeholder="Seu sobrenome"
                    fullWidth
                    sx={{ borderColor: "gray", borderRadius: 2 }}
                  />
                </Grid>
              </Grid>

              <Typography variant="body1" mb={1}>
                Email
              </Typography>
              <Input
                type="email"
                placeholder="seuemail@exemplo.com"
                fullWidth
                sx={{ borderColor: "gray", borderRadius: 2 }}
              />

              <Typography variant="body1" mb={1}>
                Mensagem
              </Typography>
              <Textarea
                placeholder="Escreva sua mensagem aqui"
                rows={5}
                fullWidth
                sx={{ borderColor: "gray", borderRadius: 2 }}
              />

              <Box display="flex" justifyContent="center">
                <Button variant="solid" color="primary" size="lg">
                  Enviar Mensagem
                </Button>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

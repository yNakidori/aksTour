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
          <div
            className="flex-1 p-6 shadow-lg rounded-lg"
            style={{
              backgroundColor: "rgba(18, 230, 243, 0.06)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
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
          </div>

          {/* Formulário à direita */}
          <div className="flex-1 bg-white p-8 shadow-2xl rounded-2xl max-w-4xl mx-auto">
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Typography
                variant="h4"
                className="text-center font-bold text-gray-800 mb-6"
                sx={{
                  fontSize: "1.75rem",
                  color: "#262626",
                  fontFamily: "'Arial', sans-serif",
                }}
              >
                Formulário de Contato
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body1"
                    className="mb-2"
                    sx={{ fontWeight: 600, color: "#8e8e8e" }}
                  >
                    Primeiro Nome
                  </Typography>
                  <Input
                    placeholder="Seu primeiro nome"
                    fullWidth
                    sx={{
                      border: "1px solid #dbdbdb",
                      borderRadius: "10px",
                      padding: "12px 16px",
                      background: "#fafafa",
                      transition: "all 0.3s",
                      "&:focus-within": {
                        borderColor: "#3b82f6",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="body1"
                    className="mb-2"
                    sx={{ fontWeight: 600, color: "#8e8e8e" }}
                  >
                    Sobrenome
                  </Typography>
                  <Input
                    placeholder="Seu sobrenome"
                    fullWidth
                    sx={{
                      border: "1px solid #dbdbdb",
                      borderRadius: "10px",
                      padding: "12px 16px",
                      background: "#fafafa",
                      transition: "all 0.3s",
                      "&:focus-within": {
                        borderColor: "#3b82f6",
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Typography
                variant="body1"
                className="mb-2"
                sx={{ fontWeight: 600, color: "#8e8e8e" }}
              >
                Email
              </Typography>
              <Input
                type="email"
                placeholder="seuemail@exemplo.com"
                fullWidth
                sx={{
                  border: "1px solid #dbdbdb",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  background: "#fafafa",
                  transition: "all 0.3s",
                  "&:focus-within": {
                    borderColor: "#3b82f6",
                  },
                }}
              />

              <Typography
                variant="body1"
                className="mb-2"
                sx={{ fontWeight: 600, color: "#8e8e8e" }}
              >
                Mensagem
              </Typography>
              <Textarea
                placeholder="Escreva sua mensagem aqui"
                rows={5}
                fullWidth
                sx={{
                  border: "1px solid #dbdbdb",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  background: "#fafafa",
                  transition: "all 0.3s",
                  "&:focus-within": {
                    borderColor: "#3b82f6",
                  },
                }}
              />

              <Box className="flex justify-center mt-6">
                <Button
                  variant="solid"
                  size="large"
                  sx={{
                    backgroundColor: "#0095f6",
                    color: "#fff",
                    padding: "14px 28px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#007bb5",
                    },
                  }}
                >
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

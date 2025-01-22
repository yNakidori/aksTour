import React, { useState } from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import InstagramPost from "./assets/contact/instagramPost";
import { Box, Button, Input, Textarea, Typography, Grid } from "@mui/joy";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      email,
      message,
    };

    try {
      const response = await fetch("/src/api/sendEmail.jsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        // Limpar os campos após enviar
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Falha ao enviar a mensagem.");
      }
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      alert("Falha ao enviar a mensagem.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-400 via-purple-300 to-yellow-200">
        <div className="max-w-7xl w-full flex flex-wrap p-8 gap-8">
          <div
            className="flex-1 p-6 shadow-lg rounded-lg"
            style={{ backgroundColor: "rgba(18, 230, 243, 0.06)" }}
          >
            <div className="flex-1">
              <Typography variant="h3" fontWeight="bold" mb={2}>
                Tem uma pergunta?
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>
                Estamos aqui para ajudar! Preencha o formulário ou entre em
                contato por e-mail ou telefone.
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

          <div
            className="flex-1 p-8 shadow-2xl rounded-2xl max-w-4xl mx-auto"
            style={{ backgroundColor: "rgba(18, 230, 243, 0.06)" }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <Typography
                variant="h4"
                className="text-center font-bold text-gray-800 mb-6"
              >
                Formulário de Contato
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" className="mb-2">
                    Primeiro Nome
                  </Typography>
                  <Input
                    placeholder="Seu primeiro nome"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" className="mb-2">
                    Sobrenome
                  </Typography>
                  <Input
                    placeholder="Seu sobrenome"
                    fullWidth
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Typography variant="body1" className="mb-2">
                Email
              </Typography>
              <Input
                type="email"
                placeholder="seuemail@exemplo.com"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Typography variant="body1" className="mb-2">
                Mensagem
              </Typography>
              <Textarea
                placeholder="Escreva sua mensagem aqui"
                rows={5}
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Box className="flex justify-center mt-6">
                <Button variant="solid" size="large" type="submit">
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

import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import InstagramPost from "./assets/contact/instagramPost";
import {
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import Swal from "sweetalert2";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "f9b4cdf4-0581-4f62-bc77-4a8a1692e09c");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Sucesso!",
        text: "Sua mensagem foi enviada com sucesso.",
        icon: "success",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-300 to-yellow-200 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
          {/* Informações de Contato */}
          <Card className="flex-1 shadow-lg bg-white/80 rounded-lg">
            <CardContent className="p-6">
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                className="mb-4"
              >
                Tem uma pergunta?
              </Typography>
              <Typography variant="body1" className="mb-4 text-gray-600">
                Estamos aqui para ajudar! Preencha o formulário ou entre em
                contato por e-mail ou telefone.
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Email:</strong> contato@akstur.com.br
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Telefone:</strong> 1234-567-890
              </Typography>
              <Typography variant="body1">
                <strong>Instagram:</strong> <InstagramPost />
              </Typography>
            </CardContent>
          </Card>

          {/* Formulário */}
          <Card className="flex-1 shadow-xl bg-white/90 rounded-2xl">
            <CardContent className="p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight="bold"
                  className="mb-6"
                >
                  Envie sua mensagem
                </Typography>

                {/* Nome */}
                <TextField
                  label="Nome Completo"
                  name="name"
                  fullWidth
                  variant="outlined"
                  placeholder="Informe o seu nome"
                  required
                  className="bg-white"
                />

                {/* Email */}
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  placeholder="Informe o seu email"
                  required
                  className="bg-white"
                />

                {/* Mensagem */}
                <TextField
                  label="Mensagem"
                  name="message"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  placeholder="Digite a sua mensagem"
                  required
                  className="bg-white"
                />

                {/* Botão de Enviar */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  Enviar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

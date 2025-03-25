import React from "react";
import Navbar from "./assets/navbar";
import Footer from "./assets/footer";
import InstagramPost from "./assets/contact/instagramPost";
import {
  Typography,
  TextField,
  Button,
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-blue-200 to-purple-300">
      <Navbar />
      <div className="flex mt-12 flex-col items-center justify-center py-16 px-6">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Card de Informações */}
          <Card className="shadow-lg bg-white/90 rounded-2xl">
            <CardContent className="p-8">
              <Typography
                variant="h4"
                fontWeight="bold"
                className="mb-6 text-gray-800"
              >
                Entre em contato
              </Typography>
              <Typography variant="body1" className="mb-4 text-gray-600">
                Estamos aqui para ajudar! Preencha o formulário ou nos envie uma
                mensagem.
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Email:</strong> contato@akstur.com.br
              </Typography>
              <Typography variant="body1" className="mb-2">
                <strong>Telefone:</strong> (11) 95770-0305
              </Typography>
              <Typography variant="body1">
                <strong>Instagram:</strong> <InstagramPost />
              </Typography>
            </CardContent>
          </Card>

          {/* Formulário */}
          <Card className="shadow-xl bg-white rounded-2xl">
            <CardContent className="p-10">
              <form onSubmit={onSubmit} className="space-y-6">
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  className="mb-6 text-gray-800"
                >
                  Envie sua mensagem
                </Typography>

                <TextField
                  label="Nome Completo"
                  name="name"
                  fullWidth
                  variant="outlined"
                  required
                  className="bg-gray-100 rounded-md"
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  required
                  className="bg-gray-100 rounded-md"
                />

                <TextField
                  label="Mensagem"
                  name="message"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  required
                  className="bg-gray-100 rounded-md"
                />

                <Button
                  type="submit"
                  variant="contained"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold rounded-md shadow-md"
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

import * as React from "react";
import { Box, Typography, Card, Divider } from "@mui/joy";
import {
  DesignServices,
  SupportAgent,
  FlightTakeoff,
} from "@mui/icons-material";

const steps = [
  {
    title: "Planejamento Personalizado",
    icon: <DesignServices fontSize="large" color="primary" />,
    description:
      "Você nos conta seu destino e preferências. Criamos um pacote único, feito sob medida para você.",
  },
  {
    title: "Acompanhamento Próximo",
    icon: <SupportAgent fontSize="large" color="success" />,
    description:
      "Durante todo o processo, um atendente acompanha você de forma humana, rápida e dedicada.",
  },
  {
    title: "Viagem com Tranquilidade",
    icon: <FlightTakeoff fontSize="large" color="warning" />,
    description:
      "Receba todas as informações organizadas em um guia digital, e conte com nosso suporte 24/7.",
  },
];

export default function HowItWorks() {
  return (
    <Box className="flex flex-col items-center justify-center w-full px-6 py-12 bg-white">
      <Typography level="h2" className="text-3xl font-bold text-gray-800 mb-4">
        Como funciona nosso atendimento
      </Typography>
      <Typography className="text-gray-600 mb-10 text-center max-w-xl">
        A gente cuida de tudo com carinho e transparência, do primeiro contato
        até o seu retorno.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 3,
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        {steps.map((step, index) => (
          <Card
            key={index}
            variant="outlined"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 4,
              borderRadius: "lg",
              boxShadow: "md",
            }}
          >
            <Box sx={{ mb: 2 }}>{step.icon}</Box>
            <Typography level="title-lg" sx={{ mb: 1 }}>
              {step.title}
            </Typography>
            <Divider sx={{ width: "30%", my: 1 }} />
            <Typography level="body-md" sx={{ color: "text.secondary" }}>
              {step.description}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

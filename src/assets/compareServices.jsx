import * as React from "react";
import { Box, Typography, Button, Divider } from "@mui/joy";
import { Check, Close, HourglassEmpty } from "@mui/icons-material";

const items = [
  {
    title: "Outras Agências",
    color: "danger",
    variant: "outlined",
    icon: Close,
    points: [
      "Pacotes genéricos",
      "Atendimento automatizado",
      "Suporte limitado",
      "Taxas ocultas",
    ],
    footer: "Serviços limitados",
  },
  {
    title: "Nossa Agência",
    color: "success",
    variant: "solid",
    icon: Check,
    points: [
      "Pacotes personalizados",
      "Atendimento humano 24/7",
      "Suporte completo",
      "Preços transparentes",
    ],
    footer: "A melhor escolha para você",
    cta: true,
  },
  {
    title: "Em breve",
    color: "warning",
    variant: "outlined",
    icon: HourglassEmpty,
    points: [
      "Assistente virtual de planejamento",
      "Aplicativo de acompanhamento",
      "Pagamentos parcelados",
      "Destinos exclusivos",
    ],
    footer: "Estamos inovando",
  },
];

export default function CompareServices() {
  return (
    <Box className="flex flex-col items-center justify-center w-full px-6">
      <Typography level="h2" className="text-3xl font-bold text-gray-800 mb-2">
        Compare e escolha com confiança
      </Typography>
      <Typography className="text-gray-600 mb-10 text-center max-w-xl">
        Veja como nossos serviços se destacam frente ao mercado — e o que ainda
        estamos preparando.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 3,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              borderRadius: "16px",
              p: 3,
              border: item.variant === "outlined" ? "1px solid" : "none",
              borderColor: `${item.color}.300`,
              backgroundColor:
                item.variant === "solid" ? `${item.color}.600` : "white",
              color: item.variant === "solid" ? "white" : "neutral.900",
              boxShadow: "lg",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "360px",
            }}
          >
            <Typography level="title-md" sx={{ mb: 1 }}>
              {item.title}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box component="ul" sx={{ listStyle: "none", pl: 0, mb: 3 }}>
              {item.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2 mb-2">
                  <item.icon
                    color={item.variant === "solid" ? "inherit" : item.color}
                    fontSize="small"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography
              level="body-md"
              sx={{ mb: item.cta ? 2 : 0, fontWeight: 500 }}
            >
              {item.footer}
            </Typography>
            {item.cta && (
              <Button variant="soft" color={item.color} sx={{ mt: "auto" }}>
                Fale com um especialista
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

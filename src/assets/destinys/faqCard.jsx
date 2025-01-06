import * as React from "react";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Typography,
} from "@mui/joy";

const FaqCard = () => {
  return (
    <>
      <Card
        size="lg"
        variant="plain"
        orientation="horizontal"
        sx={{
          textAlign: "center",
          maxWidth: "100%",
          width: 500,

          overflow: "auto",
        }}
      >
        <CardOverflow
          variant="solid"
          color="primary"
          sx={{
            flex: "0 0 200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: "var(--Card-padding)",
          }}
        >
          <Typography
            textColor="#fff"
            sx={{ fontSize: "xl4", fontWeight: "xl" }}
          ></Typography>
          <Typography textColor="primary.200">
            Nós te ajudamos a encontrar a melhor opção para você!
          </Typography>
        </CardOverflow>
        <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
          <AspectRatio ratio="19/8" objectFit="contain" variant="plain">
            <img
              alt=""
              src="https://static.vecteezy.com/system/resources/previews/006/409/485/original/people-thinking-to-make-decision-problem-solving-and-find-creative-ideas-with-question-mark-in-flat-cartoon-background-for-poster-illustration-vector.jpg"
            />
          </AspectRatio>
          <CardContent>
            <Typography level="title-lg">Precisa de ajuda?</Typography>
            <Typography sx={{ fontSize: "sm", mt: 0.5 }}>
              lique aqui e veja as nossas opções de serviços.
            </Typography>
          </CardContent>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              "--variant-borderWidth": "2px",
              borderRadius: 40,
              borderColor: "primary.500",
              mx: "auto",
            }}
          >
            Ver mais
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default FaqCard;

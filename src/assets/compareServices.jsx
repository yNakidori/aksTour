import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import {
  Check,
  KeyboardArrowRight,
  HourglassEmpty,
  Close,
} from "@mui/icons-material";

export default function CompareServices() {
  return (
    <div className="items-center justify-center flex mb-8">
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: 2,
        }}
      >
        {/* Serviços de Outras Agências */}
        <Card size="lg" variant="outlined" sx={{ borderColor: "error.400" }}>
          <Chip size="sm" variant="outlined" color="danger">
            Outras Agências
          </Chip>
          <Typography level="h2">O que eles oferecem</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
            <ListItem>
              <ListItemDecorator>
                <Close color="error" />
              </ListItemDecorator>
              Pacotes genéricos
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Close color="error" />
              </ListItemDecorator>
              Atendimento automatizado
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Close color="error" />
              </ListItemDecorator>
              Suporte limitado
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Close color="error" />
              </ListItemDecorator>
              Taxas ocultas
            </ListItem>
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: "auto" }}>
              Serviços limitados
            </Typography>
          </CardActions>
        </Card>

        {/* Serviços da Nossa Agência */}
        <Card size="lg" variant="solid" color="neutral" invertedColors>
          <Chip size="sm" variant="outlined" color="success">
            Nossa Agência
          </Chip>
          <Typography level="h2">O que nós oferecemos</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
            <ListItem>
              <ListItemDecorator>
                <Check color="success" />
              </ListItemDecorator>
              Pacotes personalizados
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Check color="success" />
              </ListItemDecorator>
              Atendimento humano 24/7
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Check color="success" />
              </ListItemDecorator>
              Suporte completo
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <Check color="success" />
              </ListItemDecorator>
              Preços transparentes
            </ListItem>
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: "auto" }}>
              A melhor escolha para você
            </Typography>
            <Button
              variant="soft"
              color="success"
              endDecorator={<KeyboardArrowRight />}
            >
              Entre em contato
            </Button>
          </CardActions>
        </Card>

        {/* Serviços que vamos implementar */}
        <Card size="lg" variant="outlined" sx={{ borderColor: "warning.400" }}>
          <Chip size="sm" variant="outlined" color="warning">
            Planejamento
          </Chip>
          <Typography level="h2">Serviços que vamos implementar</Typography>
          <Divider inset="none" />
          <List size="sm" sx={{ mx: "calc(-1 * var(--ListItem-paddingX))" }}>
            <ListItem>
              <ListItemDecorator>
                <HourglassEmpty color="warning" />
              </ListItemDecorator>
              Assistente virtual de planejamento de viagens
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <HourglassEmpty color="warning" />
              </ListItemDecorator>
              Aplicativo móvel para acompanhamento
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <HourglassEmpty color="warning" />
              </ListItemDecorator>
              Opções de pagamentos parcelados
            </ListItem>
            <ListItem>
              <ListItemDecorator>
                <HourglassEmpty color="warning" />
              </ListItemDecorator>
              Novos destinos exclusivos
            </ListItem>
          </List>
          <Divider inset="none" />
          <CardActions>
            <Typography level="title-lg" sx={{ mr: "auto" }}>
              Em breve!
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}

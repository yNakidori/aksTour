import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Checkbox,
  Collapse,
  Button,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Flatware from "@mui/icons-material/Flatware";
import ChargingStation from "@mui/icons-material/ChargingStation";
import PoolIcon from "@mui/icons-material/Pool";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import KitchenIcon from "@mui/icons-material/Kitchen";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const amenitiesData = [
  {
    name: "Wi-Fi gratuito",
    icon: <WifiIcon />,
    description: "Internet de alta velocidade disponível em toda a hospedagem.",
  },
  {
    name: "Café da manhã",
    icon: <CoffeeIcon />,
    description: "Café da manhã incluído na diária.",
  },
  {
    name: "Restaurante",
    icon: <Flatware />,
    description: "Restaurante no local com opções variadas.",
  },
  {
    name: "Piscina",
    icon: <PoolIcon />,
    description: "Piscina externa aberta durante o verão.",
  },
  {
    name: "Carregador de celular e veículos elétricos",
    icon: <ChargingStation />,
    description:
      "Estação de carregamento para dispositivos e veículos elétricos.",
  },
  {
    name: "Estacionamento",
    icon: <LocalParkingIcon />,
    description: "Estacionamento gratuito no local.",
  },
  {
    name: "Cozinha equipada",
    icon: <KitchenIcon />,
    description: "Utensílios, fogão e geladeira disponíveis.",
  },
];

export default function AmenitiesSelector({ selected, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [selectedAmenities, setSelectedAmenities] = React.useState(
    selected || []
  );

  const toggleAmenity = (name) => {
    const newSelected = selectedAmenities.includes(name)
      ? selectedAmenities.filter((item) => item !== name)
      : [...selectedAmenities, name];

    setSelectedAmenities(newSelected);
    onChange && onChange(newSelected); // callback externo opcional
  };

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => setOpen((prev) => !prev)}
        sx={{ mb: 1 }}
      >
        {open ? "Ocultar amenidades" : "Selecionar amenidades"}{" "}
        {open ? <ExpandLess sx={{ ml: 1 }} /> : <ExpandMore sx={{ ml: 1 }} />}
      </Button>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
        >
          {amenitiesData.map((amenity, index) => (
            <React.Fragment key={amenity.name}>
              <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={selectedAmenities.includes(amenity.name)}
                    onChange={() => toggleAmenity(amenity.name)}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar>{amenity.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={amenity.name}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.secondary", display: "inline" }}
                    >
                      {amenity.description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < amenitiesData.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </div>
  );
}

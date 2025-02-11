import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import pastel from "../images/pastel.png";
import waffle from "../images/waffle.png";
import coqauvin from "../images/coqauvin.png";
import spaghetti from "../images/spaghetti.png";
import cochinita from "../images/cochinita.png";
import padthai from "../images/padthai.png";

const FoodCard = ({ title, subheader, image, description }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        boxShadow: "0px 4px 20px rgba(245, 148, 39, 0.4)", // Sombra inicial rosa
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 6px 25px rgba(245, 148, 39, 0.8)", // Sombra mais intensa no hover
          transform: "scale(1.03)", // Efeito de leve crescimento
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {title[0]} {/* Usa a primeira letra do título */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const RecipeList = () => {
  const recipes = [
    {
      title: "Pastel de Belém",
      subheader: "Lisboa, Portugal",
      image: pastel,
      description:
        "Um pastel tradicional português recheado com um creme de ovos rico. Pode ser encontrado nas lojas de pastelaria em Lisboa, especialmente no bairro de Belém.",
    },
    {
      title: "Waffles de Açúcar Belga",
      subheader: "Bruxelas, Bélgica",
      image: waffle,
      description:
        "Esses waffles belgas são crocantes por fora e macios por dentro, cobertos com açúcar de confeiteiro. São uma iguaria imperdível em Bruxelas.",
    },
    {
      title: "Coq au Vin",
      subheader: "França",
      image: coqauvin,
      description:
        "Um prato clássico francês feito com frango cozido lentamente em vinho tinto, cogumelos, cebolas e bacon. Popular na região da Borgonha, na França.",
    },
    {
      title: "Spaghetti alle Vongole",
      subheader: "Itália",
      image: spaghetti,
      description:
        "Um prato tradicional italiano de macarrão com molho feito de vongole (moluscos), alho, azeite e vinho branco. Uma especialidade da região costeira da Itália.",
    },
    {
      title: "Cochinita Pibil",
      subheader: "México",
      image: cochinita,
      description:
        "Um prato tradicional mexicano originário da Península de Yucatán. É feito de carne de porco marinada em suco de laranja-azeda e pasta de achiote, depois cozida lentamente em folhas de bananeira. É comumente servido com tortillas e cebolas roxas em conserva.",
    },
    {
      title: "Pad Thai",
      subheader: "Tailândia",
      image: padthai,
      description:
        "Um dos pratos mais famosos da Tailândia, o Pad Thai é feito de macarrão de arroz salteado com camarão ou frango, tofu, ovos, amendoim, brotos de feijão e temperos como tamarindo e limão. É uma explosão de sabores doces, ácidos e picantes.",
    },
  ];

  return (
    <>
      {recipes.map((recipe, index) => (
        <FoodCard
          key={index}
          title={recipe.title}
          subheader={recipe.subheader}
          image={recipe.image}
          description={recipe.description}
        />
      ))}
    </>
  );
};

export default RecipeList;

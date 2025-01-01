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

const FoodCard = ({ title, subheader, image, description }) => {
  return (
    <Card sx={{ maxWidth: 345, width: "100%" }}>
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

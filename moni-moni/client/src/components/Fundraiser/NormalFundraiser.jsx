import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function NormalFundraiser({ fundraiser }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => navigate(`/fundraisers/${fundraiser.slug}`)}
    >
      <CardMedia
        component="img"
        height="140"
        image={fundraiser.image}
        alt={fundraiser.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fundraiser.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {fundraiser.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

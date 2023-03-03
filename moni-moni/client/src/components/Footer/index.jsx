import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { List, ListItem, ListItemText, TextField } from "@mui/material";
import logo from "../../assets/svg/logo.png";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import axios from "axios";

const quickLink = [
  "Home",
  // "About Us",
  // "Contact Us",
  // "Discover",
  // "Start Fundraiser",
];

function Footer() {
  const [quote, setQuote] = React.useState("");
  React.useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        "https://api.quotable.io/random?maxLength=50"
      );
      setQuote(res.data.content);
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <Box component="footer" sx={{ bgcolor: "black", py: 6 }}>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <Grid
          container
          alignItems="center"
          direction="column"
          justifyContent="center"
        >
          <img src={logo} alt="logo" width={"10%"} />
        </Grid>
        <Grid item>
          {quickLink.map((page, key) => {
            return (
              <Button
                type="text"
                key={key}
                onClick={() =>
                  navigate(`/${page.toLowerCase().replaceAll(" ", "-")}`)
                }
                sx={{ my: 2, color: "white" }}
              >
                {page}
              </Button>
            );
          })}
          <Grid item sx={{ mb: 3 }}>
            <Typography variant="body2" color="white" align="center">
              {`"${quote}"`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="white" align="center">
              {"Copyright © "}
              <Link
                color="inherit"
                href="https://github.com/amal-thundiyil/moni-moni/blob/main/LICENSE"
              >
                Moni Moni
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Footer;

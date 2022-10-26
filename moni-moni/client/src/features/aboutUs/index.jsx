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

function AboutUs() {
  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        spacing={5}
        sx={{ padding: 10 }}
      >
        <Grid
          container
          alignItems="center"
          direction="column"
          justifyContent="center"
        >
          <img src={logo} alt="logo" width={"50%"} />
        </Grid>
        <Grid item>
          <Typography variant="h1">About Us</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            Our community. Tapping into our community starts with activating
            your own. Most successful projects build a snowball effect, winning
            over friends and early supporters who then share the idea with their
            networks, and signal their support to the wider Moni Moni
            community. The snowball can get pretty big. Over 21 million people,
            from every continent on earth, have helped fund Moni Moni
            projects. Our mission. Our mission is to help bring creative
            projects to life. We believe that art and creative expression are
            essential to a healthy and vibrant society, and the space to create
            requires protection. We don't want art world elites and
            entertainment executives to define our culture; we want creative
            people—even those who've never made anything before—to take the
            wheel. We help creators connect directly with their communities,
            putting power where it belongs. We are so committed to our mission,
            we wrote it into our business model. In 2015 we became a Public
            Benefit Corporation—a for-profit company that prioritizes positive
            outcomes for society as much as our shareholders. We updated our
            corporate charter to lay out specific goals and commitments to put
            our values into our operations, promote arts and culture, fight
            inequality, and help creative projects happen.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
export default AboutUs;

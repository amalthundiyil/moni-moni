import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import { userLoginAsync } from "./asyncActions";
import CustomizedSnackbars from "../../components/Snackbar";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const authObj = useSelector((state) => state.auth);
  const [notify, setNotify] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userLoginLoading, loginError } = authObj;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await dispatch(
      userLoginAsync(data.get("email"), data.get("password"))
    );
    setNotify(true);
  };

  if (authObj.isAuthenticated === true) {
    navigate("/home");
  }

  return (
    <ThemeProvider theme={theme}>
      {notify === true && authObj.loginStatus === "fulfilled" && (
        <CustomizedSnackbars
          message={"Successfully logged you in"}
          type={"success"}
        />
      )}
      {notify === true && authObj.loginStatus === "loading" && (
        <CustomizedSnackbars message={"Trying to log in"} type={"info"} />
      )}
      {notify === true && authObj.loginStatus === "rejected" && (
        <CustomizedSnackbars
          message={authObj.error || "Failed to log in"}
          type={"error"}
        />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href={"/checkout"} variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

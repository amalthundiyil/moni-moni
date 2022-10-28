import { Button, CardActionArea, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import banner from "../../assets/banner.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const User = (props) => {
  const authObj = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const [notification, setNotification] = React.useState({ notify: false });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    async function fetchData() {
      const res = await axios.get("/api/v1/users/user/");
      setData({
        ...res.data,
      });
    }
    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const res = await axios.put("/api/v1/users/user/", data);
    window.location.reload();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            About You
          </Typography>
        </Grid>
        <Grid container justifyContent="center">
          <Card
            variant="outlined"
            sx={{ boxShadow: "5px 10px 3px #808080", width: "70%" }}
          >
            <CardMedia component="img" height="140" image={banner} />
            <CardContent sx={{ m: 10 }}>
              <Typography variant="h3" gutterBottom>
                Enter/Edit details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First name"
                    autoComplete="on"
                    variant="standard"
                    value={data && data.first_name ? data.first_name : ""}
                    onChange={(e) =>
                      setData({ ...data, first_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    autoComplete="on"
                    variant="standard"
                    value={data && data.last_name ? data.last_name : ""}
                    onChange={(e) =>
                      setData({ ...data, last_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="userName"
                    name="userName"
                    label="User name"
                    autoComplete="on"
                    variant="standard"
                    value={data && data.user_name ? data.user_name : ""}
                    onChange={(e) =>
                      setData({ ...data, user_name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="about"
                    name="about"
                    label="About"
                    autoComplete="on"
                    variant="standard"
                    value={data && data.about ? data.about : ""}
                    onChange={(e) =>
                      setData({ ...data, about: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    autoComplete="on"
                    variant="standard"
                    value={data && data.phone_number ? data.phone_number : ""}
                    onChange={(e) =>
                      setData({ ...data, phone_number: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={data ? data.date_of_birth : null}
                      inputFormat={"YYYY-MM-DD"}
                      onChange={(newValue) =>
                        setData({
                          ...data,
                          date_of_birth: newValue,
                        })
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ m: 10 }}>
              <Button
                variant="contained"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default User;

import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "../../utils/axios";
import CustomizedSnackbars from "../../components/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";
import "./styles.css";

export default function AddressForm({ setAddressData }) {
  const authObj = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = React.useState(false);
  const [addresses, setAddresses] = React.useState([]);
  const [notification, setNotification] = React.useState({ notify: false });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    async function fetchData() {
      const res = await axios.get("/api/v1/users/address/");
      if (!res.data) {
        setNewAddress(true);
      }
      setAddresses(res.data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setAddressData({
      address: addresses.filter((address) => address.id == e.target.id)[0],
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>
      {notification.notify === true && (
        <CustomizedSnackbars {...notification} />
      )}
      <Grid container spacing={3}>
        <div className="card-div" onChange={(e) => handleChange(e)}>
          {addresses.map((address, key) => {
            const address_str = address.address_line_1.substring(0, 10);
            return (
              <div className="card" key={key}>
                <input type="radio" name="pricing" id={address.id} />
                <label htmlFor="card1">
                  <h5>
                    {address.full_name} - {address.town_city}, {address.country}
                  </h5>
                  <h2>{address_str}</h2>
                </label>
              </div>
            );
          })}
        </div>
      </Grid>
      {newAddress == true && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

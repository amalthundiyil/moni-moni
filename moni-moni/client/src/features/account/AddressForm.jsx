import { Button, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";
import countryList from "react-select-country-list";
import Select from "@mui/material/Select";

const AddressForm = (props) => {
  const authObj = useSelector((state) => state.auth);
  const [notification, setNotification] = React.useState({ notify: false });
  const countries = React.useMemo(() => countryList().getData(), []);
  const dispatch = useDispatch();

  console.log(props);
  const handleCreate = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const res = await axios.post("/api/v1/users/address/", props.data);
    props.handleOpen(false);
    window.location.reload();
  };
  const handleEdit = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const res = await axios.put("/api/v1/users/address/", props.data);
    props.handleOpen(false);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    if (props.operation == "add") {
      handleCreate(e);
    } else if (props.operation == "edit") {
      handleEdit(e);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
          required
          id="fullName"
          name="fullName"
          label="Full name"
          fullWidth
          autoComplete="on"
          variant="standard"
          defaultValue={
            props.data && props.data.full_name ? props.data.full_name : ""
          }
          onChange={(e) => props.handleData({ full_name: e.target.value })}
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
          defaultValue={
            props.data && props.data.address_line_1
              ? props.data.address_line_1
              : ""
          }
          onChange={(e) =>
            props.handleData({
              address_line_1: e.target.value,
            })
          }
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
          defaultValue={
            props.data && props.data.address_line_2
              ? props.data.address_line_2
              : ""
          }
          onChange={(e) =>
            props.handleData({
              address_line_2: e.target.value,
            })
          }
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
          defaultValue={
            props.data && props.data.town_city ? props.data.town_city : ""
          }
          onChange={(e) => props.handleData({ town_city: e.target.value })}
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
          defaultValue={
            props.data && props.data.postcode ? props.data.postcode : ""
          }
          onChange={(e) => props.handleData({ postcode: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          value={props.data && props.data.country ? props.data.country : "IN"}
          onChange={(e) => props.handleData({ country: e.target.value })}
        >
          {countries.map((country, key) => {
            return (
              <MenuItem key={key} value={country.value}>
                {country.label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddressForm;

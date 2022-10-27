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
import IconButton from "@mui/material/IconButton";
import Modal from "../../components/Modal";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddressForm from "./AddressForm";
import "./styles.css";

export default function Address(props) {
  const authObj = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [addresses, setAddresses] = React.useState([]);
  const [notification, setNotification] = React.useState({ notify: false });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    async function fetchData() {
      const res = await axios.get("/api/v1/users/address/");
      if (res.data.length <= 0) {
        setNewAddress(true);
      }
      setAddresses(res.data);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    props.handleData({
      address: addresses.filter((address) => address.id == e.target.id)[0],
    });
  };

  const handleCreate = (e) => {
    setOpen(true);
  };
  const handleEdit = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const res = await axios.get("/api/v1/users/address/");
    setOpen(true);
    setAddresses(res.data);
  };
  const handleDelete = (e) => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      {notification.notify === true && (
        <CustomizedSnackbars {...notification} />
      )}
      {open && <Modal {...{ open, setOpen, Component: <AddressForm /> }} />}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ m: 2 }}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h3" gutterBottom>
              Address
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="large" onClick={(e) => handleCreate(e)}>
              <AddIcon fontSize="large" />
            </IconButton>
            <IconButton size="large" onClick={(e) => handleEdit(e)}>
              <EditIcon fontsize="large" />
            </IconButton>
            <IconButton size="large" onClick={(e) => handleDelete(e)}>
              <DeleteIcon fontsize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <div className="card-div" onChange={(e) => handleChange(e)}>
            {addresses.map((address, key) => {
              const address_str = address.address_line_1.substring(0, 10);
              return (
                <div className="card" key={key}>
                  <input
                    type="radio"
                    name="pricing"
                    id={address.id}
                    defaultChecked={key === 0}
                  />
                  <label
                    htmlFor="card1"
                    style={{
                      position: "absolute",
                      margin: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <h5>
                      {address.full_name} - {address.town_city},{" "}
                      {address.country}
                    </h5>
                    <h2>{address_str}</h2>
                  </label>
                </div>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

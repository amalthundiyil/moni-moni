import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import CustomizedSnackbars from "../../components/Snackbar";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";
import AddressForm from "./AddressForm";
import "./styles.css";

export default function Address(props) {
  const authObj = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [operation, setOperation] = React.useState();
  const [addresses, setAddresses] = React.useState([]);
  const [data, setData] = React.useState({});
  const [notification, setNotification] = React.useState({ notify: false });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    async function fetchData() {
      const res = await axios.get("/api/v1/users/address/");
      setAddresses(res.data || []);
      setData({
        ...res.data[0],
      });
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({
      ...addresses.filter((address) => address.id == e.target.id)[0],
    });
  };

  const handleClick = (e, type) => {
    setOperation(type);
    setOpen(true);
  };

  const handleOpen = (o) => {
    setOpen(o);
  };

  const handleData = (newData) => {
    setData({ ...data, ...newData });
  };

  return (
    <React.Fragment>
      {notification.notify === true && (
        <CustomizedSnackbars {...notification} />
      )}
      {open && (
        <Modal
          {...{
            open,
            handleOpen,
            Component: (
              <AddressForm {...{ operation, data, handleData, handleOpen }} />
            ),
          }}
        />
      )}
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
            <IconButton size="large" onClick={(e) => handleClick(e, "add")}>
              <AddIcon fontSize="large" />
            </IconButton>
            <IconButton size="large" onClick={(e) => handleClick(e, "edit")}>
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton size="large" onClick={(e) => handleClick(e, "delete")}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <div className="card-div" onChange={(e) => handleChange(e)}>
            {addresses.map((address, key) => {
              const address_str = `${address.address_line_1.substring(
                0,
                20
              )}...`;
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

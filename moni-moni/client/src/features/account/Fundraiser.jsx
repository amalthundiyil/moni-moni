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
import FundraiserForm from "./FundraiserForm";
import "./styles.css";

export default function Fundraiser(props) {
  const authObj = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [operation, setOperation] = React.useState();
  const [fundraisers, setFundraisers] = React.useState([]);
  const [data, setData] = React.useState({});
  const [notification, setNotification] = React.useState({ notify: false });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    async function fetchData() {
      const res = await axios.get("/api/v1/catalogue/fundraisers/");
      setFundraisers(res.data || []);
      setData({
        ...res.data[0],
      });
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setData({
      ...fundraisers.filter((fundraiser) => fundraiser.id == e.target.id)[0],
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

  const handleDelete = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const res = await axios.delete(
      `/api/v1/catalogue/fundraisers/${data.slug}/`
    );
    handleOpen(false);
    window.location.reload();
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
              <FundraiserForm
                {...{ operation, data, handleData, handleOpen }}
              />
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
              Fundraisers
            </Typography>
          </Grid>
          <Grid item>
            <IconButton size="large" onClick={(e) => handleClick(e, "add")}>
              <AddIcon fontSize="large" />
            </IconButton>
            <IconButton size="large" onClick={(e) => handleClick(e, "edit")}>
              <EditIcon fontSize="large" />
            </IconButton>
            <IconButton size="large" onClick={(e) => handleDelete(e)}>
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <div className="card-div" onChange={(e) => handleChange(e)}>
            {fundraisers.map((fundraiser, key) => {
              const fundraiser_str = fundraiser.description.substring(0, 100);
              return (
                <div className="card" key={key}>
                  <input
                    type="radio"
                    name="pricing"
                    id={fundraiser.id}
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
                    <h2>{fundraiser.title}</h2>
                    <h5>{fundraiser_str}...</h5>
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

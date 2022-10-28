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
import FundingOptionsForm from "./FundingOptionsForm";
import "./styles.css";

export default function FundingOptions(props) {
  console.log(props);
  const authObj = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [operation, setOperation] = React.useState();
  const [fundingOptions, setFundingOptions] = React.useState([]);
  const [notification, setNotification] = React.useState({ notify: false });
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    async function fetchData() {
      const res = await axios.get(
        `/api/v1/checkout/funding-options/${props.data.slug}/`
      );
      setFundingOptions(res.data);
      props.handleData({
        ...props.data,
        ...res.data[0],
      });
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    props.handleData({
      ...fundingOptions.filter((fo) => fo.id == e.target.id)[0],
    });
  };

  const handleClick = (e, type) => {
    setOperation(type);
    setOpen(true);
  };

  const handleOpen = (o) => {
    setOpen(o);
  };

  const handleDelete = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    const res = await axios.delete(
      `/api/v1/checkout/funding-options/${props.data.slug}/`
    );
    handleOpen(false);
    window.location.reload();
  };

  const handleNotification = (data) => {
    setNotification({ ...data });
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
              <FundingOptionsForm
                {...{
                  operation,
                  ...props,
                  handleOpen,
                  handleNotification,
                }}
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
              Funding Options
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
            {fundingOptions.map((fundingOption, key) => {
              const fundraiser_str = fundingOption.description.substring(
                0,
                100
              );
              return (
                <div className="card" key={key}>
                  <input
                    type="radio"
                    name="pricing"
                    id={fundingOption.id}
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
                    <h2>{fundingOption.title}</h2>
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

import { Button, MenuItem, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";
import { v4 as uuidv4 } from "uuid";
import CustomizedSnackbars from "../../components/Snackbar";

const FundraiserForm = (props) => {
  const authObj = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCreate = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    try {
      const res = await axios.post(
        "/api/v1/checkout/funding-options/",
        props.data
      );
      props.handleOpen(false);
      window.location.reload();
    } catch (err) {
      props.handleNotification({
        notify: true,
        message: JSON.stringify(err.response.data) || err.message,
        type: "error",
      });
    }
  };

  const handleEdit = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    try {
      const res = await axios.put(
        "/api/v1/checkout/funding-options/",
        props.data
      );
      props.handleOpen(false);
      window.location.reload();
    } catch (err) {
      props.handleNotification({
        notify: true,
        message: JSON.stringify(err.response.data) || err.message,
        type: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.operation == "add") {
      handleCreate(e);
    } else if (props.operation == "edit") {
      handleEdit(e);
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="title"
            name="title"
            label="Title"
            fullWidth
            autoComplete="on"
            variant="standard"
            value={props.data ? props.data.title : ""}
            onChange={(e) =>
              props.handleData({
                ...props.data,
                title: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="subHeader"
            name="subHeader"
            label="SubHeader"
            fullWidth
            autoComplete="on"
            variant="standard"
            value={props.data ? props.data.sub_header : ""}
            onChange={(e) =>
              props.handleData({
                ...props.data,
                sub_header: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="totalAmount"
            name="totalAmount"
            label="Total Amount"
            fullWidth
            autoComplete="on"
            variant="standard"
            value={props.data ? props.data.price : ""}
            onChange={(e) =>
              props.handleData({
                ...props.data,
                price: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete="on"
            variant="standard"
            value={props.data ? props.data.description : ""}
            onChange={(e) =>
              props.handleData({
                ...props.data,
                description: e.target.value,
              })
            }
          />
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          sx={{ ml: 3, mr: 3, mt: 3 }}
        >
          <Grid item>
            <Button
              variant="contained"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FundraiserForm;

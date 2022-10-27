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

const FundingOptionsForm = ({ props, fundingOption }) => {
  const key = uuidv4();
  return (
    <React.Fragment key={key}>
      <Grid item xs={12} sm={6} key={key}>
        <TextField
          id="fundingOptionTitle"
          name="fundingOptionTitle"
          label="Funding Option Title"
          fullWidth
          autoComplete="on"
          variant="standard"
          value={fundingOption ? fundingOption.title : ""}
          onChange={(e) =>
            props.handleData({
              total_amount: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="fundingOptionSubHeader"
          name="fundingOptionSubHeader"
          label="Funding Option SubHeader"
          fullWidth
          autoComplete="on"
          variant="standard"
          value={fundingOption ? fundingOption.sub_header : ""}
          onChange={(e) =>
            props.handleData({
              total_amount: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="fundingOptionPrice"
          name="fundingOptionPrice"
          label="Funding Option Price"
          fullWidth
          autoComplete="on"
          variant="standard"
          value={fundingOption ? fundingOption.price : ""}
          onChange={(e) =>
            props.handleData({
              total_amount: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          id="fundingOptionDescription"
          name="fundingOptionDescription"
          label="Funding Option Description"
          fullWidth
          autoComplete="on"
          variant="standard"
          value={fundingOption ? fundingOption.description : ""}
          onChange={(e) =>
            props.handleData({
              description: e.target.value,
            })
          }
        />
      </Grid>
    </React.Fragment>
  );
};

const FundraiserForm = (props) => {
  const authObj = useSelector((state) => state.auth);
  const [notification, setNotification] = React.useState({ notify: false });
  const [categories, setCategories] = React.useState([]);
  const [addFundingOption, setAddFundingOption] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    async function fetchData() {
      const cres = await axios.get("/api/v1/catalogue/category/");
      setCategories(cres.data);
      const fores = await axios.get(
        `/api/v1/checkout/funding-options/${props.data.slug}/`
      );
      handleData({fundingOptions: fores});
      props.handleData({ category: "others" });
    }
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    var formData = new FormData();
    for (var key in props.data) {
      formData.append(key, props.data[key]);
    }
    let res = await axios.post("/api/v1/catalogue/fundraisers/", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    var formData = new FormData();
    for (var key in props.data.fundingOption) {
      formData.append(key, props.data.fundingOption[key]);
    }
    res = await axios.post("/api/v1/checkout/funding-options/", formData);
    props.handleOpen(false);
    window.location.reload();
  };
  const handleEdit = async (e) => {
    dispatch(verifyTokenAsync());
    setAuthToken(authObj.token);
    var formData = new FormData();
    for (var key in props.data) {
      formData.append(key, props.data[key]);
    }
    let res = await axios.put("/api/v1/catalogue/fundraisers/", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
    var formData = new FormData();
    for (var key in props.data.fundingOption) {
      formData.append(key, props.data.fundingOption[key]);
    }
    res = await axios.put("/api/v1/checkout/funding-options/", formData);
    console.log(res);
    props.handleOpen(false);
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.operation == "add") {
      handleCreate(e);
    } else if (props.operation == "edit") {
      handleEdit(e);
    }
  };

  const handleAddFundingOption = async (e) => {
    let arr = fundingOptions;
    arr.push({ fundraiser: props.data.slug });
    setAddFundingOption(true);
  };

  console.log(fundingOptions);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <TextField
          required
          id="title"
          name="title"
          label="Title"
          fullWidth
          autoComplete="on"
          variant="standard"
          defaultValue={props.data && props.data.title ? props.data.title : ""}
          onChange={(e) => props.handleData({ title: e.target.value })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="description"
          name="description"
          label="Description"
          fullWidth
          autoComplete="on"
          variant="standard"
          defaultValue={
            props.data && props.data.description ? props.data.description : ""
          }
          onChange={(e) =>
            props.handleData({
              description: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="totalAmount"
          name="totalAmount"
          label="Total Amount"
          fullWidth
          autoComplete="on"
          variant="standard"
          defaultValue={
            props.data && props.data.total_amount ? props.data.total_amount : ""
          }
          onChange={(e) =>
            props.handleData({
              total_amount: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Select
          required
          id="category"
          name="category"
          label="category"
          fullWidth
          value={
            props.data && props.data.category ? props.data.category : "others"
          }
          onChange={(e) => props.handleData({ category: e.target.value })}
        >
          {categories.map((category, key) => {
            return (
              <MenuItem key={key} value={category.name}>
                {category.name}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button variant="contained" component="label">
          Upload File
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.value)}
          />
        </Button>
        <Typography>{image && `${image.substring(0, 10)}...`}</Typography>
      </Grid>
      {fundingOptions.map((fundingOption, key) => {
        <FundingOptionsForm {...{ props, fundingOption }} />;
      })}
      {addFundingOption && (
        <FundingOptionsForm {...{ props, fundingOption: fundingOptions[0] }} />
      )}
      <Grid
        container
        justifyContent="space-between"
        sx={{ ml: 3, mr: 3, mt: 3 }}
      >
        <Grid item>
          <Button variant="outlined" onClick={(e) => handleAddFundingOption(e)}>
            Add Funding Option
          </Button>
        </Grid>
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
  );
};

export default FundraiserForm;

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Pricing from "./Pricing";
import { createNextState } from "@reduxjs/toolkit";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const steps = ["Funding Choice", "Shipping address", "Payment details"];

function getStepContent(props) {
  switch (props.activeStep) {
    case 0:
      return <Pricing {...props} />;
    case 1:
      return <AddressForm {...props} />;
    case 2:
      return <PaymentForm {...props} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout({ fundraiser }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState({ fundraiser });
  const navigate = useNavigate();

  const handleData = (new_data) => {
    setData({ ...data, ...new_data });
  };

  const handleNext = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };

  if (!fundraiser) {
    return <Spinner open={true} />;
  }

  if (activeStep === 0) {
    return getStepContent({
      activeStep,
      data,
      handleData,
      handleNext,
    });
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                You have contributed ${data.pricing.price} to{" "}
                {data.fundraiser.title} and made the world a better place {":)"}
                .<Button onClick={() => navigate("/")}>Go to Home</Button>
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent({
                activeStep,
                data,
                handleData,
                handleNext,
              })}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
}

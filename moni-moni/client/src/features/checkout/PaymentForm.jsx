import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose your Payment method
      </Typography>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "INR",
                    value: props.data.pricing.price,
                  },
                },
              ],
            })
            .then((orderId) => {
              console.log(orderId);
              // Your code here after create the order
              return orderId;
            });
        }}
      />
    </React.Fragment>
  );
}

import Typography from "@mui/material/Typography";
import { PayPalButtons } from "@paypal/react-paypal-js";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizedSnackbars from "../../components/Snackbar";
import axios from "../../utils/axios";
import { verifyTokenAsync } from "../auth/asyncActions";
import { setAuthToken } from "../auth/services";

export default function PaymentForm(props) {
  const dispatch = useDispatch();
  const authObj = useSelector((state) => state.auth);
  const [notification, setNotification] = React.useState({ notify: false });

  return (
    <React.Fragment>
      {notification.notify === true && (
        <CustomizedSnackbars {...notification} />
      )}
      <Typography variant="h6" gutterBottom>
        Choose your Payment method
      </Typography>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `Added funds to ${props.data.fundraiser.title}`,
                amount: {
                  value: props.data.pricing.price,
                  currency_code: "USD",
                },
              },
            ],
          });
          // .catch((e) =>
          // );
        }}
        onError={async (data, actions) => {
          const order = await actions.order.capture();
          setNotification({
            notify: true,
            message: "Payment failed",
            type: "error",
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          setNotification({
            notify: true,
            message: "Payment added successfully",
            type: "success",
          });
          dispatch(verifyTokenAsync());
          setAuthToken(authObj.token);
          const payload = {
            id: order.id,
            status: order.status,
            created_at: order.create_time,
            updated_at: order.update_time,
            payer_id: order.payer.payer_id,
            payer_email: order.payer.email_address,
            payee_email: order.purchase_units[0].payee.email_address,
            payee_id: order.purchase_units[0].payee.merchant_id,
            currency_code: order.purchase_units[0].amount.currency_code,
            value: order.purchase_units[0].amount.value,
            fundraiser: props.data.fundraiser.id,
          };
          const res = await axios.post(`/api/v1/checkout/payments/`, payload);
          if (res.status >= 200 && res.status < 300) {
            props.handleNext();
          } else {
            setNotification({
              notify: true,
              message: JSON.stringify(res.data),
              type: "error",
            });
          }
        }}
      />
    </React.Fragment>
  );
}

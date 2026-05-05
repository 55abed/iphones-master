import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalPayment() {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // price
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Payment successful by " + details.payer.name.given_name);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;
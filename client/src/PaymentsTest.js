import React from "react";
import ReactDOM from "react-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./PaymentsTest.css";

toast.configure();

function PaymentsTest() {
  const [product] = React.useState({
    name: "Carro chido",
    price: 64998.67,
    description: "Carrito"
  });

  async function handleToken(token, addresses) {
    console.log(addresses)
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Todo salio piola! No lo rompas", { type: "success" });
    } else {
      toast("Algo anda mal", { type: "error" });
    }
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>A la venta · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_bdfSjCaZaFmllllTsgqBBLYn00pzIjcm72"
        token={handleToken}
        amount={product.price * 100}
        name="Tesla Roadster"
        billingAddress
        shippingAddress
      />
    </div>
  );
}

export default PaymentsTest;
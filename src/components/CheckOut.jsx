import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";

function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0,
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }
  function handleSubmitOrder(event) {
    event.preventDefault();
    // Here you would typically send the order data to your server
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order: { customer: customerData, items: cartCtx.items },
      }),
    });
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleSubmitOrder}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input lable="Full Name" id="name" type="text" />
        <Input lable="E-mail" id="email" type="email" />
        <Input lable="Street" id="street" type="text" />
        <div className="control-row">
          <Input lable="Postal Code" id="postal-code" type="text" />
          <Input lable="City" id="city" type="text" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default CheckOut;

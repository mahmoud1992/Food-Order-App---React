import React, { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0,
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinishCheckout() {
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());
    await sendRequest(
      JSON.stringify({
        order: { items: cartCtx.items, customer: customerData },
      }),
    );
  }
  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null,
  );
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinishCheckout}
      >
        <h2>Order submitted successfully!</h2>
        <p>Your order has been submitted</p>
        <p className="modal-actions">
          <Button onClick={handleCloseCheckout}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input lable="Full Name" id="name" type="text" />
        <Input lable="E-mail" id="email" type="email" />
        <Input lable="Street" id="street" type="text" />
        <div className="control-row">
          <Input lable="Postal Code" id="postal-code" type="text" />
          <Input lable="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to Submit Order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default CheckOut;

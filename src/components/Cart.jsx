import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0,
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleCheckout() {
    userProgressCtx.showCheckout();
  }
  function handleIncreaseItemQuantity(item) {
    cartCtx.addItem(item);
  }
  function handleDecreaseItemQuantity(item) {
    cartCtx.removeItem(item.id);
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>My Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => handleIncreaseItemQuantity(item)}
            onDecrease={() => handleDecreaseItemQuantity(item)}
          />
        ))}
      </ul>
      <p className="cart-total"> {currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCheckout}>Checkout</Button>
      </p>
    </Modal>
  );
}

export default Cart;

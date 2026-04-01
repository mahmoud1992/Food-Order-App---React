import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { use } from "react";
import CartContext from "../store/CartContext";

function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);
  function addToCartHandler() {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
          <p className="meal-item-actions">
            <Button onClick={addToCartHandler}>Add to Cart</Button>
          </p>
        </div>
      </article>
    </li>
  );
}

export default MealItem;

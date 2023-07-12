import FormatPrice from "../helpers/FormatPrice";
import CartQuantityToggle from "./CartQuantityToggle";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ id, name, image, color, price, quantity }) => {
  const setDecrease = () => {
    // quantity > 1 ? setAmount(quantity - 1) : setAmount(1);
  };

  const setIncrease = () => {
    // quantity < stock ? setAmount(quantity + 1) : setAmount(stock);
  };

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartQuantityToggle
        quantity={quantity}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * quantity} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" />
      </div>
    </div>
  );
};

export default CartItem;

import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "./cart.css";

function Cart() {
  const { cartItems, increaseQuantity, removeFromCart } =
    useContext(CartContext);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  // style={{ marginTop: "150px" }}

  return (
    <div className="checkout">
      <div className="ordersummary">
        <h1>Order Summary</h1>
        <div className="items">
          {cartItems.length === 0 ? (
            <p>Your Cart is empty.</p>
          ) : (
            cartItems.map((item, ind) => (
              <div className="item_cart" key={ind}>
                <div className="image_name">
                  <div className="img_item">
                    <img src={item.images[0]} alt={item.title} />
                  </div>
                  <div className="content">
                    <h4>{item.title}</h4>
                    <p className="price_item">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="quantity_control">
                      <button onClick={() => increaseQuantity(item.id, "-")}>
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id, "+")}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="delete_item"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="bottom_summary">
          <div className="shop_table">
            <p>Total:</p>
            <span className="total_checkout">$ {total.toFixed(2)}</span>
          </div>
          <div className="button_div">
            <button type="submit">Placr Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

import "./cart.css";
import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import PageTransition from "../../components/PageTransition";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFormCart } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <PageTransition>
      <div className="checkout">
        <div className="ordersummary">
          <h1>Order Summary</h1>

          <div className="items">
            {cartItems.length === 0 ? (
              <p>Your Cart is empty</p>
            ) : (
              cartItems.map((item, index) => (
                <div className="item_cart" key={index}>
                  <div className="image_name">
                    <img src={item.thumbnail} alt="" />
                    <div className="content">
                      <h4>{item.title}</h4>
                      <p className="price_item">$ {item.price}</p>
                      <div className="quantity_control">
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="delete_item"
                    onClick={() => removeFormCart(item.id)}
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
              <button type="submit">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;

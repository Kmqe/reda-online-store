import React, { useContext } from "react";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const Product = ({ item }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    addToFavorites,
    favorites,
    removeFromFavorites,
  } = useContext(CartContext);

  const isInCart = cartItems.some((i) => i.id === item.id);

  const handleAddToCart = () => {
    addToCart(item);
    console.log(item);
    toast.success(
      <div className="toast-wrapper">
        <img src={item.thumbnail} alt="" className="toast-img" />

        <div className="toast-content">
          <strong>{item.title}</strong>
          added to Cart
          <div>
            <button className="btn" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          </div>
        </div>
      </div>,
      { duration: 3500 }
    );
  };

  // favorites
  const isInFav = favorites.some((i) => i.id === item.id);

  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFavorites(item.id);
      toast.error(`${item.title} remove from favorites`);
    } else {
      addToFavorites(item);
      toast.success(`${item.title} added to favorites`);
    }
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        <span className="status_cart">
          <FaCheck /> in cart
        </span>

        <div className="img_product">
          <img src={item.thumbnail} alt={item.title} />
        </div>

        <p className="name_product">{item.title}</p>

        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>

        <p className="price">
          {" "}
          <span>$ {item.price}</span>
        </p>
      </Link>

      <div className="icons">
        <span className="btn_cart" onClick={handleAddToCart}>
          <FaCartArrowDown />
        </span>
        <span
          onClick={handleAddToFav}
          className={`${isInFav ? "in-fav" : " "}`}
        >
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
};

export default Product;

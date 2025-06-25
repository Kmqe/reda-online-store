import {
  FaStar,
  FaRegStarHalfStroke,
  FaCartArrowDown,
  FaShare,
  FaRegHeart,
} from "react-icons/fa6";
import { TiShoppingBag, TiShoppingCart } from "react-icons/ti";
import { CartContext } from "../../components/context/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    addToCart,
    addToFavorites,
    favorites,
    removeFromFavorites,
  } = useContext(CartContext);
  const isInCart = cartItems.some((i) => i.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(
      <div className="toast-wrapper">
        <img src={product.thumbnail} alt="" className="toast-img" />

        <div className="toast-content">
          <strong>{product.title}</strong>
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

  const isInFav = favorites.some((i) => i.id === product.id);

  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFavorites(product.id);
      toast.error(`${product.title} remove from favorites`);
    } else {
      addToFavorites(product);
      toast.success(`${product.title} added to favorites`);
    }
  };

  return (
    <div className="details_item">
      <h1 className="name">{product.title}</h1>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      <p className="price">$ {product.price}</p>

      <h5>
        Availability: <span>{product.availabilityStatus}</span>
      </h5>
      <h5>
        Brand: <span>{product.brand}</span>
      </h5>
      <p className="desc">{product.description}</p>
      <h5 className="stock">
        Hurry Up! Only <span>{product.stock}</span> products left in stock.
      </h5>

      <button
        onClick={handleAddToCart}
        className={`btn ${isInCart ? "in-cart" : ""}`}
      >
        {isInCart ? "Item In Cart" : "Add To Cart"} <TiShoppingCart />
      </button>

      <div className="icons">
        <span className={`${isInFav ? "in-fav" : ""}`} onClick={handleAddToFav}>
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;

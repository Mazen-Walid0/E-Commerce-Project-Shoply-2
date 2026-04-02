import { TiShoppingCart } from "react-icons/ti";
import {
  FaStar,
  FaRegStarHalfStroke,
  FaRegHeart,
  FaShare,
} from "react-icons/fa6";
import { useContext } from "react";
import { CartContext } from "../../components/context/CartContext";

function ProductInfo({ product }) {
  const {
    RemoveFromFavorite,
    AddToFavorite,
    favorites,
    handleAddToCart,
    cartItems,
  } = useContext(CartContext);
  const isInCart = cartItems.some((i) => i.id === product.id);

  const isInFavorites = favorites.some((i) => i.id === product.id);
  const handleAddToFavorite = () => {
    isInFavorites ? RemoveFromFavorite(product) : AddToFavorite(product);
  };
  return (
    <div className="details_item">
      <h1 className="name">{product.title}</h1>
      <div className="stars">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaRegStarHalfStroke />
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
        <span>Hurry Up! Only {product.stock} products left in stock.</span>
      </h5>
      <button
        onClick={() => handleAddToCart(product)}
        className={`btn ${isInCart ? "in-cart" : ""}`}
      >
        {isInCart ? "Item in cart" : "Add to cart"} <TiShoppingCart />
      </button>
      <div className="icons">
        <span
          onClick={handleAddToFavorite}
          className={`${isInFavorites ? "in-fav" : ""}`}
        >
          <FaRegHeart />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;

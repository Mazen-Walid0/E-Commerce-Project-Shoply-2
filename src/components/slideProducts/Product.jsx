import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";

function Product({ item }) {
  const {
    cartItems,
    handleAddToCart,
    favorites,
    AddToFavorite,
    RemoveFromFavorite,
  } = useContext(CartContext);

  const isInCart = cartItems.some((i) => i.id === item.id);

  // Favorites
  const isInFavorites = favorites.some((i) => i.id === item.id);
  const handleAddToFavorite = () => {
    isInFavorites ? RemoveFromFavorite(item) : AddToFavorite(item);
  };

  return (
    <div className={`product ${isInCart ? "in-cart" : ""}`}>
      <Link to={`/products/${item.id}`}>
        {isInCart && (
          <span className="status_cart">
            <FaCheck /> In Cart
          </span>
        )}
        <div className="img_product">
          <img src={item.images[0]} alt="" />
        </div>
        <p className="name_product">{item.title}</p>
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
        <p className="price">
          <span>$ {item.price}</span>
        </p>
      </Link>
      <div className="icons">
        <span className="btn_addtocart" onClick={() => handleAddToCart(item)}>
          <FaCartArrowDown />
        </span>
        <span
          className={`${isInFavorites ? "in-fav" : ""}`}
          onClick={handleAddToFavorite}
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

export default Product;

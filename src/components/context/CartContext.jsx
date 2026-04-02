import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    const savedFav = localStorage.getItem("favoritesItems");
    return savedFav ? JSON.parse(savedFav) : [];
  });

  const AddToFavorite = (item) => {
    setFavorites((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, item],
    );
    toast.success(
      <div className="toast-wrapper">
        <img className="toast-img" src={item.images[0]} alt={item.title} />
        <div className="toast-content">
          <strong>{item.title}</strong>
          added to Favorite
          <div>
            <button className="btn" onClick={() => navigate("/favorites")}>
              View Cart
            </button>
          </div>
        </div>
      </div>,
      { duration: 3500 },
    );
  };

  const RemoveFromFavorite = (item) => {
    setFavorites((prev) => prev.filter((i) => i.id !== item.id));
    toast.error(
      <div className="toast-wrapper">
        <img className="toast-img" src={item.images[0]} alt={item.title} />
        <div className="toast-content">
          <strong>{item.title}</strong>
          Remove From Favorite
          <div></div>
        </div>
      </div>,
      { duration: 3500 },
    );
  };

  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    addToCart(item);

    toast.success(
      <div className="toast-wrapper">
        <img className="toast-img" src={item.images[0]} alt={item.title} />
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
      { duration: 3500 },
    );
  };

  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites]);

  // increaseQuantity

  const increaseQuantity = (id, process) => {
    if (process === "+") {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  const addToCartFavorite = (item) => {
    setCartItems((prev) => [...prev, { ...item, favorite: 1 }]);
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        handleAddToCart,
        removeFromCart,
        AddToFavorite,
        favorites,
        RemoveFromFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

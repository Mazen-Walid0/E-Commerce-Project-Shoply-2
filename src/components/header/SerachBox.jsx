import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SerachBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTerm.trim() &&
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}`,
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error("Search Error: ", error);
        setSuggestions([]);
      }
    };

    const debonuce = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    console.log(suggestions);

    return () => clearTimeout(debonuce);
  }, [searchTerm]);

  useEffect(() => {
    setSuggestions([]);
    setSearchTerm("");
  }, [pathname]);

  return (
    <div className="SerachBox_Container">
      <form onSubmit={handleSubmit} className="search_box">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
      <ul
        className={
          searchTerm.trim() ? "active suggestions" : "suggestions notactive"
        }
      >
        {suggestions.length > 0 && searchTerm.trim() ? (
          suggestions.map((item) => (
            <Link to={`/products/${item.id}`}>
              <li key={item.id}>
                <img src={item.images[0]} alt="" /> <span>{item.title}</span>
              </li>
            </Link>
          ))
        ) : (
          <li>{"No Results Found."}</li>
        )}
      </ul>
    </div>
  );
}

export default SerachBox;

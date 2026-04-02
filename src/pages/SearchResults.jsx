import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { Atom } from "react-loading-indicators";
import Product from "../components/slideProducts/Product";

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <PageTransition key={query}>
      <div className="category_products" style={{ margin: "150px" }}>
        <div className="container">
          {loading ? (
            <div
              style={{
                marginTop: "300px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="loading"
            >
              <Atom color="#0090f0" size="large" text="" textColor="" />
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="top_slide">
                <h2>Results for: {query}</h2>
                <p>
                  lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, voluptates?
                </p>
              </div>
              <div className="products">
                {results.map((item, ind) => (
                  <Product item={item} key={ind} />
                ))}
              </div>
            </>
          ) : (
            <div
              className="notfound"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "200px",
                flexDirection: "column",
              }}
            >
              <p style={{ fontSize: "50px", color: "red" }}>
                No Results Found.
              </p>
              <Link
                className="btn"
                to={"/"}
                style={{
                  marginTop: "30px",
                  padding: "20px 30px",
                  fontSize: "20px",
                }}
              >
                Return to the homepage
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default SearchResults;

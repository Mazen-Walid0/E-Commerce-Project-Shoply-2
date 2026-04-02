import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import "./categorypage.css";
import { Atom } from "react-loading-indicators";
import PageTransition from "../../components/PageTransition";

function CategoryPage() {
  const { category } = useParams();
  const [loading, setLoading] = useState(true);

  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data.products);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <PageTransition key={category}>
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
          ) : (
            <>
              <div className="top_slide">
                <h2>
                  {category}: {categoryProducts.length}
                </h2>
                <p>
                  lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Molestias, voluptates?
                </p>
              </div>
              <div className="products">
                {categoryProducts.map((item, ind) => (
                  <Product item={item} key={ind} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default CategoryPage;

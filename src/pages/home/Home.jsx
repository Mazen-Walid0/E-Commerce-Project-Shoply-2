import { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import { Atom } from "react-loading-indicators";
import PageTransition from "../../components/PageTransition";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];
function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`,
            );
            const data = await res.json();
            return { [category]: data.products };
          }),
        );
        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Erorr Fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <PageTransition>
      <div>
        <HeroSlider />
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="loading"
          >
            <Atom color="#0090f0" size="large" text="" textColor="" />
          </div>
        ) : (
          categories.map((category) => (
            <SlideProduct
              key={category}
              data={products[category]}
              title={category.replace("-", " ")}
            />
          ))
        )}
      </div>
    </PageTransition>
  );
}

export default Home;

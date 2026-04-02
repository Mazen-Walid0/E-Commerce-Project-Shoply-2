import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Atom } from "react-loading-indicators";
import "./productDetails.css";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingrelatedProducts, setLoadingRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetching Error", error);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.products);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingRelatedProducts(false));
  }, [product?.category]);

  return (
    <PageTransition key={productId}>
      <div>
        {loading ? (
          <div
            style={{
              height: "100vh",
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
          <div className="item_details">
            <div className="container">
              <ProductImages product={product} />
              <ProductInfo product={product} />
            </div>
          </div>
        )}
        {loadingrelatedProducts ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="loading"
          >
            <Atom color="#0090f0" size="large" text="" textColor="" />
          </div>
        ) : (
          <SlideProduct
            key={product.category}
            data={relatedProducts}
            title={product.category.replace("-", " ")}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default ProductDetails;

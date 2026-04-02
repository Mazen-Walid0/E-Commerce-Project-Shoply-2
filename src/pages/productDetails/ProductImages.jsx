function ProductImages({ product }) {
  return (
    <div className="imgs_item">
      <div className="big_img">
        <img id="big_img" src={product.images[0]} alt={product.title} />
      </div>
      <div className="sm_img">
        {product.images.map((img, ind) => (
          <img
            key={ind}
            src={img}
            alt=""
            onClick={() => (document.getElementById("big_img").src = img)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImages;

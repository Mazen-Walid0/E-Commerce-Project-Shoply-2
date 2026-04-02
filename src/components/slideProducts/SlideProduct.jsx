import Product from "./Product";
import "./slideProduct.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function SlideProduct({ title, data }) {
  return (
    <div className="slide_products slide">
      <div className="container">
        <div className="top_slide">
          <h2>{title}</h2>
          <p>
            lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            voluptates?
          </p>
        </div>
        <Swiper
          loop={data.length > 3 ? true : false}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          slidesPerView={data.length > 3 ? 4.5 : 3}
          spaceBetween={100}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          className="mySwiper"
        >
          {data.map((item) => (
            <SwiperSlide>
              <Product key={item.id} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SlideProduct;

import "./slideProduct.css";
import Product from "./Product";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

const SlideProduct = ({ data, title }) => {
  return (
    <div className="slide_products slide">
      <div className="container">
        <div className="top_slide">
          <h2>{title.replace("-", " ")}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            aliquid.
          </p>
        </div>

        <Swiper
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={5}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {data.map((item) => {
            return (
              <SwiperSlide>
                <Product item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SlideProduct;

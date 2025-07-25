import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Style from "./Carrousel.module.css";

const images = [
  "/img/parth/Aramex.png",
  "/img/parth/CMA.png",
  "/img/parth/DHL-Emblem.png",
  "/img/parth/fedex.png",
  
];

export default function CarouselSwiper() {
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      // ici on précise que c’est un HTMLElement pour accéder à style
      const paginationEl = swiperRef.current.el.querySelector(".swiper-pagination") as HTMLElement | null;
      if (paginationEl) {
        paginationEl.style.marginTop = "70px";
      }
    }
  }, []);

  return (
    <section className={Style.section}>
      <div className={Style.carousel_container}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          navigation={false}
          pagination={{ clickable: false }}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className={Style.image_wrapper}>
                <img src={src} alt={`Brand ${index}`} className={Style.brand_image} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

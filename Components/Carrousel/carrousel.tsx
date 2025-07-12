import Style from "./Carrousel.module.css";

const images = [
  "/img/parth/Aramex.png",
  "/img/parth/CMA.png",
  "/img/parth/DHL-Emblem.png",
  "/img/parth/fedex.png",
];

export default function Carousel() {
  return (
    <div className={Style.section}>
      <div className={Style.carousel_container}>
        <div className={Style.carousel}>
          {[...images].map((src, i) => (
            <div className={Style.image_wrapper} key={i}>
              <img src={src} alt={`Slide ${i}`} className={Style.carousel_image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

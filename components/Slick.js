import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const slickData = Array(4).fill("Lorem Ipsum");

const Slick = () => {
    return (
        <div>
            <Slider
            dots
            infinite
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={5000}
          >
            {slickData.map((v, i) => (
              <div key={i} className="w-full h-[500px] p-4 bg-cyan-400">
                <h3 className="text-white text-center font-bold text-4xl">{v} {i+1}</h3>
              </div>
            ))}
          </Slider>
        </div>
    );
}

export default Slick;
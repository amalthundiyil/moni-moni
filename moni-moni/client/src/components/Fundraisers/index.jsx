import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import NormalFundraiser from "../Fundraiser/NormalFundraiser";
import Spinner from "../Spinner";
import { v4 as uuidv4 } from "uuid";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Fundraiser from "../Fundraiser";

export default function Fundraisers({ fundraiser }) {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        sx={{ m: 10 }}
        className="swiper"
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          "@1.50": {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        {fundraiser.map((fundraiser) => (
          <SwiperSlide key={uuidv4()}>
            <Fundraiser type="normal" key={uuidv4()} fundraiser={fundraiser} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

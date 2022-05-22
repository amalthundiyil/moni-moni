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

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App({ fundraiser }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {fundraiser.map((fundraiser) => (
          <SwiperSlide>
            <NormalFundraiser key={uuidv4()} {...fundraiser} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

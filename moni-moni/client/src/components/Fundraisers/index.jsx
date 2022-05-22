import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import NormalFundraiser from "../Fundraiser/NormalFundraiser";
import Spinner from "../Spinner";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper";

function Fundraisers({ fundraiser }) {
  if (!fundraiser) {
    return <Spinner open={true} />;
  }

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={4}
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
  );
}

export default Fundraisers;

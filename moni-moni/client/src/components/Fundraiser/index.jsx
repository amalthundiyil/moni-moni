import React from "react";
import NormalFundraiser from "./NormalFundraiser";
import FeaturedFundraiser from "./FeaturedFundraiser";
import MainFeaturedFundraiser from "./MainFeaturedFundraiser";
import Spinner from "../../components/Spinner";

const Fundraiser = ({ ...props }) => {
  console.log(props);
  if (!props.fundraiser) {
    return <Spinner open={true} />;
  }
  if (props.type === "main") {
    return <MainFeaturedFundraiser {...props} />;
  }
  if (props.type === "featured") {
    return <FeaturedFundraiser {...props} />;
  }
  return <NormalFundraiser {...props} />;
};

export default Fundraiser;

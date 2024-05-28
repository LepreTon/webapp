import React from "react";
import { PropagateLoader } from 'react-spinners';

import Logo from "../assets/images/logo.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Loader = () => {
  return (
    <>
      {/* <LazyLoadImage
        src={Logo}
        alt="logo"
        style={{
          width: "200px",
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      /> */}
      <PropagateLoader
        color="green"
        loading={true}
        cssOverride={{ position: "absolute", left: "50%", top: "55%" }}
      />
    </>
  );
};

export default Loader;
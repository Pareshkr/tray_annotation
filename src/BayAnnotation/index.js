import React from "react";
import PropTypes from "prop-types";

// material-ui

// project import
import DialogPopUp from "./DialogPopUp";

// assets
import IMG from "../assets/floor_layout.png";

function BayAnnotation() {
  const bayData = {
    number: 1,
    name: "Flormar",
    image: { IMG },
  };
  return (
    <div className="w-full h-[100dvh] flex justify-center place-items-center bg-gray-100">
      <DialogPopUp
        bayNumber={bayData.number}
        brandName={bayData.name}
        imgSrc={bayData.image.IMG}
      />
    </div>
  );
}

BayAnnotation.propTypes = {};

export default BayAnnotation;

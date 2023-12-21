import React, { useState } from "react";
import PropTypes from "prop-types";

// material-ui
import { Dialog, DialogContent } from "@mui/material";

// react-icons
import { FaMapMarkedAlt } from "react-icons/fa";

// project import
import HeaderComp from "../HeaderComp";
import MainComp from "../MainComp";

//assets

function DialogPopUp({
  bayNumber,
  brandName,
  imgSrc
}) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDisableToggle = () => {
    setIsDisabled(!isDisabled);
  };

  const handlePopupToggle = () => {
    setPopupOpen(!popupOpen);
  };

  const handleClickSave = () => {
    console.log("Clicked Save");
  };

  return (
    <>
      <button className="text-3xl text-emerald-500" onClick={handlePopupToggle}>
        <FaMapMarkedAlt />
      </button>

      <Dialog
        fullScreen
        open={popupOpen}
        onClose={handlePopupToggle}
        PaperProps={{
          sx: {
            boxShadow: "none",
          },
        }}
      >
        <DialogContent
          className="overflow-y-auto scrollbar"
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <div className="w-full h-full flex flex-col">
            <HeaderComp
              bayNumber={bayNumber}
              brandName={brandName}
              onUndo={handleDisableToggle}
              onSave={handleClickSave}
              onClose={handlePopupToggle}
              disable={isDisabled}
            />
            <MainComp 
            imgSrc={imgSrc} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

DialogPopUp.propTypes = {
  bayNumber: PropTypes.number,
  brandName: PropTypes.string,
  imgSrc: PropTypes.string,
};

export default DialogPopUp;
